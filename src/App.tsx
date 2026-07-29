import React, { useState } from 'react';
import { UserRole, ScreenId, CustomerScreenId, Bottle, Order, Subscription, WalletTransaction, EnvironmentalStats, NotificationItem } from './types';
import { initialBottles, initialOrders, initialSubscriptions, initialTransactions, initialNotifications, initialEnvironmentalStats } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { AuthScreens } from './components/screens/AuthScreens';
import { HomeScreen } from './components/screens/HomeScreen';
import { OrderWaterScreen } from './components/screens/OrderWaterScreen';
import { SubscriptionScreen } from './components/screens/SubscriptionScreen';
import { ContainerRewardsScreen } from './components/screens/ContainerRewardsScreen';
import { DeliveryTrackingScreen } from './components/screens/DeliveryTrackingScreen';
import { QRScannerScreen } from './components/screens/QRScannerScreen';
import { WalletScreen } from './components/screens/WalletScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { EnvironmentalImpactScreen } from './components/screens/EnvironmentalImpactScreen';
import { ProfileSettingsScreen } from './components/screens/ProfileSettingsScreen';
import { DriverDashboardScreen } from './components/screens/DriverDashboardScreen';
import { DepotDashboardScreen } from './components/screens/DepotDashboardScreen';
import { AdminDashboardScreen } from './components/screens/AdminDashboardScreen';

export default function App() {
  // App Role State
  const [role, setRole] = useState<UserRole>('customer');
  const [screen, setScreen] = useState<ScreenId>('home');
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [isAIPredictorOpen, setIsAIPredictorOpen] = useState<boolean>(false);

  // User State
  const [userName, setUserName] = useState<string>('Ama Mensah');
  const [userPhone, setUserPhone] = useState<string>('+233 24 412 3456');
  const [userAddress, setUserAddress] = useState<string>('House 14, Boundary Road, East Legon, Accra');

  // Shared Data State
  const [bottles, setBottles] = useState<Bottle[]>(initialBottles);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(initialTransactions);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [environmentalStats, setEnvironmentalStats] = useState<EnvironmentalStats>(initialEnvironmentalStats);

  // Financial Balances
  const [walletBalanceGHS, setWalletBalanceGHS] = useState<number>(125.00);
  const depositBalanceGHS = bottles
    .filter((b) => b.status === 'with_customer')
    .reduce((acc, b) => acc + b.depositAmountGHS, 0);

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'customer') {
      setScreen('home');
    } else {
      setScreen(`${newRole}_dashboard` as ScreenId);
    }
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    setWalletBalanceGHS((prev) => Math.max(0, prev - newOrder.totalPriceGHS));

    // Add transaction
    const newTx: WalletTransaction = {
      id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
      type: 'water_purchase',
      amountGHS: newOrder.totalPriceGHS,
      description: `Payment for ${newOrder.items[0]?.quantity || 2}x 15L Refills (Order #${newOrder.orderNumber})`,
      date: new Date().toLocaleString(),
      status: 'completed',
      reference: `MOMO-PAY-${Math.floor(100000 + Math.random() * 900000)}`,
      paymentChannel: newOrder.paymentMethod === 'mtn_momo' ? 'MTN MoMo' : 'Nsupa Wallet',
    };
    setTransactions([newTx, ...transactions]);

    // Update environmental stats
    const sachetsAdded = (newOrder.items[0]?.quantity || 2) * 30;
    setEnvironmentalStats((prev) => ({
      ...prev,
      sachetsSaved: prev.sachetsSaved + sachetsAdded,
      litresDelivered: prev.litresDelivered + (newOrder.items[0]?.quantity || 2) * 15,
      reusableCyclesCompleted: prev.reusableCyclesCompleted + 1,
    }));
  };

  const handleTopUpWallet = (amount: number, channel: string) => {
    setWalletBalanceGHS((prev) => prev + amount);
    const newTx: WalletTransaction = {
      id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
      type: 'top_up',
      amountGHS: amount,
      description: `Nsupa Wallet Top-Up via ${channel}`,
      date: new Date().toLocaleString(),
      status: 'completed',
      reference: `TOPUP-${Math.floor(100000 + Math.random() * 900000)}`,
      paymentChannel: channel,
    };
    setTransactions([newTx, ...transactions]);
  };

  const handleCompleteDriverDelivery = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, deliveryStatus: 'delivered' } : o))
    );
    // Add deposit refund
    setWalletBalanceGHS((prev) => prev + 25.00);
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen onStart={() => setScreen('onboarding')} />;

      case 'onboarding':
        return <OnboardingScreen onComplete={() => setScreen('login')} />;

      case 'login':
      case 'signup':
      case 'otp':
        return (
          <AuthScreens
            initialMode={screen as 'login' | 'signup' | 'otp'}
            onAuthSuccess={() => setScreen('home')}
            onNavigate={(s) => setScreen(s)}
          />
        );

      case 'home':
        return (
          <HomeScreen
            userName={userName}
            userAddress={userAddress}
            activeOrder={orders.find((o) => o.deliveryStatus !== 'delivered')}
            subscription={subscriptions[0]}
            environmentalStats={environmentalStats}
            walletBalanceGHS={walletBalanceGHS}
            depositBalanceGHS={depositBalanceGHS}
            onNavigate={(s) => setScreen(s)}
            onOpenAIPredictor={() => setIsAIPredictorOpen(true)}
          />
        );

      case 'order':
        return (
          <OrderWaterScreen
            onOrderPlaced={handleOrderPlaced}
            onNavigate={(s) => setScreen(s)}
          />
        );

      case 'subscription':
        return (
          <SubscriptionScreen
            subscription={subscriptions[0]}
            onUpdateSubscription={(updated) => setSubscriptions([updated])}
          />
        );

      case 'deposits':
      case 'bottle_details':
        return (
          <ContainerRewardsScreen
            bottles={bottles}
            completedSwapsCount={7}
            onNavigate={(s) => setScreen(s)}
          />
        );

      case 'tracking':
        return (
          <DeliveryTrackingScreen
            order={orders[0] || initialOrders[0]}
          />
        );

      case 'qr_scanner':
        return (
          <QRScannerScreen
            bottles={bottles}
            onNavigate={(s) => setScreen(s)}
          />
        );

      case 'wallet':
        return (
          <WalletScreen
            walletBalanceGHS={walletBalanceGHS}
            depositBalanceGHS={depositBalanceGHS}
            transactions={transactions}
            onTopUp={handleTopUpWallet}
          />
        );

      case 'notifications':
        return (
          <NotificationsScreen
            notifications={notifications}
            onMarkRead={(id) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))}
            onNavigate={(s) => setScreen(s)}
          />
        );

      case 'impact':
        return <EnvironmentalImpactScreen stats={environmentalStats} />;

      case 'profile':
      case 'settings':
        return (
          <ProfileSettingsScreen
            userName={userName}
            userPhone={userPhone}
            userAddress={userAddress}
            onLogout={() => setScreen('login')}
            onNavigate={(s) => setScreen(s)}
          />
        );

      case 'driver_dashboard':
        return (
          <DriverDashboardScreen
            orders={orders}
            onCompleteDelivery={handleCompleteDriverDelivery}
          />
        );

      case 'depot_dashboard':
        return <DepotDashboardScreen bottles={bottles} />;

      case 'admin_dashboard':
        return <AdminDashboardScreen />;

      default:
        return (
          <HomeScreen
            userName={userName}
            userAddress={userAddress}
            environmentalStats={environmentalStats}
            walletBalanceGHS={walletBalanceGHS}
            depositBalanceGHS={depositBalanceGHS}
            onNavigate={(s) => setScreen(s)}
            onOpenAIPredictor={() => setIsAIPredictorOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F3FAFF] text-slate-800 font-sans antialiased selection:bg-blue-200">
      {/* Top Universal App Bar */}
      <Header
        role={role}
        onRoleChange={handleRoleChange}
        currentScreen={screen}
        onNavigate={(s) => setScreen(s)}
        unreadCount={unreadNotifCount}
        isMobileView={isMobileView}
        onToggleMobileView={() => setIsMobileView(!isMobileView)}
        onOpenAIPredictor={() => setIsAIPredictorOpen(true)}
      />

      {/* Main Container: Mobile phone mockup vs full layout */}
      <main className={`mx-auto transition-all duration-300 ${isMobileView ? 'max-w-md py-4 px-3' : 'max-w-7xl py-6 px-4 sm:px-6 lg:px-8'}`}>
        <div className={isMobileView ? 'bg-[#F3FAFF] rounded-[2.5rem] shadow-xl border-4 border-white p-4 min-h-[840px] relative overflow-hidden' : 'w-full'}>
          {renderScreen()}
        </div>
      </main>

      {/* Customer Bottom Navigation Bar */}
      {role === 'customer' && !['splash', 'onboarding', 'login', 'signup', 'otp'].includes(screen) && (
        <BottomNav
          currentScreen={screen as CustomerScreenId}
          onNavigate={(s) => setScreen(s)}
        />
      )}
    </div>
  );
}
