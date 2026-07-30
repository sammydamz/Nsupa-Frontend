import React, { useState, useEffect } from 'react';
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
import { AIPredictorModal } from './components/AIPredictorModal';

export default function App() {
  // App Role State
  const [role, setRole] = useState<UserRole>('customer');
  const [screen, setScreen] = useState<ScreenId>('login');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
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

  // --- Backend Data Fetching ---
  const fetchData = async () => {
    try {
      const [meRes, bottlesRes] = await Promise.all([
        fetch('/api/me'),
        fetch('/api/bottles')
      ]);
      
      if (meRes.ok && meRes.headers.get('content-type')?.includes('json')) {
        const { user, transactions: txs } = await meRes.json();
        setWalletBalanceGHS(user.wallet_balance_ghs);
        setTransactions(txs.map((tx: any) => ({
          id: tx.id,
          type: tx.type,
          amountGHS: tx.amount_ghs,
          description: tx.reference,
          date: new Date(tx.date).toLocaleString(),
          status: 'completed',
          reference: tx.id,
          paymentChannel: tx.type === 'top_up' ? 'Top-Up' : 'Nsupa Wallet'
        })));
      }
      
      if (bottlesRes.ok && bottlesRes.headers.get('content-type')?.includes('json')) {
        const data = await bottlesRes.json();
        if (data && data.length > 0 && data[0].id) {
          setBottles(data.map((b: any) => ({
            id: b.id,
            type: b.type,
            sizeLitres: b.size_litres,
            refillCount: b.refill_count,
            status: b.liner_state === 'empty_ready_return' ? 'empty_at_home' : 'with_customer',
            linerState: b.liner_state,
            purchaseDate: b.last_scanned_at || new Date().toISOString(),
            depositAmountGHS: 25.00
          })));
        }
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAuthenticated]);

  const handleLogin = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'customer') {
      setScreen('home');
    } else {
      setScreen(`${newRole}_dashboard` as ScreenId);
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setScreen('login');
  };

  const handleOrderPlaced = async (newOrder: Order) => {
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalAmountGHS: newOrder.totalPriceGHS })
      });
      if (res.ok) {
        await fetchData(); // Refresh wallet & txs from backend
      }
      // Always process the order locally (mock data fallback)
      setOrders([newOrder, ...orders]);
      
      // Update environmental stats
      const sachetsAdded = (newOrder.items[0]?.quantity || 2) * 30;
      setEnvironmentalStats((prev) => ({
        ...prev,
        sachetsSaved: prev.sachetsSaved + sachetsAdded,
        litresDelivered: prev.litresDelivered + (newOrder.items[0]?.quantity || 2) * 15,
        reusableCyclesCompleted: prev.reusableCyclesCompleted + 1,
      }));
    } catch (err) {
      console.error("Order error", err);
    }
  };

  const handleTopUpWallet = async (amount: number, channel: string) => {
    try {
      const res = await fetch('/api/wallet/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountGHS: amount, channel })
      });
      if (res.ok) {
        await fetchData();
      }
      // Always update wallet locally (mock data fallback)
      setWalletBalanceGHS((prev) => prev + amount);
    } catch (err) {
      console.error("Topup error", err);
    }
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
            onAuthSuccess={handleLogin}
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
            onLogout={handleLogout}
            onNavigate={(s) => setScreen(s)}
          />
        );

      case 'driver_dashboard':
        return (
          <DriverDashboardScreen
            orders={orders}
            bottles={bottles}
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
            activeOrder={orders.find((o) => o.deliveryStatus !== 'delivered')}
            subscription={subscriptions[0]}
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
      {isAuthenticated && (
        <Header
          role={role}
          currentScreen={screen}
          onNavigate={(s) => setScreen(s)}
          unreadCount={unreadNotifCount}
          onOpenAIPredictor={() => setIsAIPredictorOpen(true)}
          onLogout={handleLogout}
        />
      )}

      {/* Main Container */}
      <main className="mx-auto transition-all duration-300 max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          {renderScreen()}
        </div>
      </main>

      {/* Customer Bottom Navigation Bar */}
      {isAuthenticated && role === 'customer' && !['splash', 'onboarding', 'login', 'signup', 'otp'].includes(screen) && (
        <BottomNav
          currentScreen={screen as CustomerScreenId}
          onNavigate={(s) => setScreen(s)}
        />
      )}

      {/* AI Predictor Modal — rendered globally so it opens from any screen */}
      <AIPredictorModal
        isOpen={isAIPredictorOpen}
        onClose={() => setIsAIPredictorOpen(false)}
        onApplyPlan={(plan) => {
          setScreen('subscription');
          setIsAIPredictorOpen(false);
        }}
      />
    </div>
  );
}
