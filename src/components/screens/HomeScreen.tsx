import React from 'react';
import { ShoppingBag, Truck, Calendar, MapPin, Leaf, ArrowRight, QrCode, RefreshCw, Award } from 'lucide-react';
import { CustomerScreenId, Order, Subscription, EnvironmentalStats } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface HomeScreenProps {
  userName: string;
  userAddress: string;
  activeOrder?: Order;
  subscription?: Subscription;
  environmentalStats: EnvironmentalStats;
  walletBalanceGHS: number;
  depositBalanceGHS: number;
  onNavigate: (screen: CustomerScreenId) => void;
  onOpenAIPredictor: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName,
  userAddress,
  activeOrder,
  subscription,
  environmentalStats,
  walletBalanceGHS,
  onNavigate,
}) => {
  return (
    <div className="space-y-6 pb-20">
      {/* Top Greeting & Location Banner / Freshness Hero */}
      <Card className="bg-gradient-to-br from-[#0288D1] to-[#4FC3F7] rounded-3xl text-white relative overflow-hidden shadow-xl shadow-blue-100 border-none">
        {/* Subtle background water drop graphic */}
        <div className="absolute right-[-30px] bottom-[-30px] opacity-20 pointer-events-none">
          <RefreshCw className="w-52 h-52 text-white" />
        </div>

        <CardContent className="relative z-10 space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-blue-100 font-medium">Akwaaba 👋</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">{userName}</h1>
            </div>

            <Button
              variant="secondary"
              className="bg-white/20 backdrop-blur-md px-4 py-6 rounded-2xl border border-white/25 text-left sm:text-right hover:bg-white/30 transition-all shadow-sm self-start sm:self-auto flex flex-col items-start sm:items-end justify-center text-white"
              onClick={() => onNavigate('wallet')}
            >
              <span className="text-[10px] text-blue-100 font-medium block h-auto">Nsupa Wallet</span>
              <span className="text-base font-bold">GH₵ {walletBalanceGHS.toFixed(2)}</span>
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs text-blue-50 bg-black/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 w-fit">
            <MapPin className="w-3.5 h-3.5 text-blue-200 shrink-0" />
            <span className="truncate max-w-[280px] font-medium">{userAddress}</span>
          </div>

          {/* Eco Metrics Summary Row inside Hero */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-center">
              <span className="block text-xl sm:text-2xl font-bold">{environmentalStats.sachetsSaved}</span>
              <span className="text-[10px] opacity-80 uppercase font-medium">Sachets Saved</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-center">
              <span className="block text-xl sm:text-2xl font-bold">{environmentalStats.plasticWasteKgSaved}kg</span>
              <span className="text-[10px] opacity-80 uppercase font-medium">Plastic Kept Away</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-center">
              <span className="block text-xl sm:text-2xl font-bold">{environmentalStats.reusableCyclesCompleted}</span>
              <span className="text-[10px] opacity-80 uppercase font-medium">Bottle Cycles</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid for Desktop View (2 columns on lg screens) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left / Primary Column (lg:col-span-2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Delivery Status Card */}
          {activeOrder && (
            <Card className="rounded-3xl border-blue-50 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-700 text-sm">Upcoming Delivery</h3>
                    <p className="text-xs text-slate-400">Order #{activeOrder.orderNumber}</p>
                  </div>
                  <Badge className="bg-blue-100 text-[#0288D1] hover:bg-blue-100 font-bold uppercase rounded-full">
                    In Transit
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0288D1] shrink-0 font-bold">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{activeOrder.driverName}</p>
                    <p className="text-xs text-slate-500">Arriving in ~12 mins</p>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="ml-auto bg-[#0288D1] text-white rounded-xl text-xs font-bold shadow-sm hover:bg-[#0277BD]"
                  >
                    <a href={`tel:${activeOrder.driverPhone}`}>Call Rider</a>
                  </Button>
                </div>

                <div className="space-y-1.5">
                  <Progress value={75} className="h-2 bg-slate-100 [&>div]:bg-[#0288D1]" />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Depot Dispatched</span>
                    <span className="font-bold text-[#0288D1]">3 stops away</span>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  onClick={() => onNavigate('tracking')}
                  className="w-full h-12 bg-[#F3FAFF] text-[#0288D1] hover:text-[#0288D1] font-bold text-xs rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Live Delivery Tracking</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Prominent Swap Milestone Rewards Progress Card */}
          <Card className="bg-gradient-to-br from-[#0288D1] to-[#0277BD] rounded-3xl text-white shadow-lg shadow-blue-200 border-none relative overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-amber-300 font-black">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-200 tracking-wider block">Nsupa Rewards Tracker</span>
                    <h3 className="font-extrabold text-white text-base">7 / 10 Completed Swaps</h3>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onNavigate('deposits')}
                  className="bg-white text-[#0288D1] hover:text-[#0288D1] text-xs font-extrabold rounded-full hover:bg-blue-50 shadow-sm"
                >
                  View Tracker
                </Button>
              </div>

              <p className="text-xs text-blue-100 leading-relaxed">
                You are <strong className="text-amber-300 font-extrabold">3 swaps away</strong> from unlocking your <strong>11th Refill FREE</strong>! Every 10 container swaps earns a free reward automatically.
              </p>

              <div className="space-y-1.5">
                <Progress value={70} className="h-3 bg-black/20 p-0.5 border border-white/20 [&>div]:bg-gradient-to-r [&>div]:from-amber-300 [&>div]:to-amber-400" />
                <div className="flex justify-between text-[11px] text-blue-100">
                  <span>7 Swaps Done</span>
                  <span className="font-bold text-amber-300">10th FREE Reward Goal</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 1:1 Shell Swap Model Banner */}
          <Card className="bg-[#0288D1] rounded-3xl text-white shadow-lg shadow-blue-100 border-none">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-xs opacity-80 uppercase font-bold tracking-wider mb-1">1:1 Container Swap System</p>
                <p className="text-lg font-black leading-tight">GH₵ 15.00 Water Refill</p>
                <p className="text-xs text-blue-100">Simple 1:1 empty-for-full container exchange model</p>
              </div>

              <Button
                variant="outline"
                onClick={() => onNavigate('deposits')}
                className="bg-white/20 hover:bg-white/30 text-white hover:text-white font-bold h-10 px-4 rounded-2xl text-xs border-white/30 transition-all shrink-0"
              >
                View Exchange
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar Column (lg:col-span-1) */}
        <div className="space-y-6">
          {/* Quick Action Buttons Grid */}
          <Card className="rounded-3xl shadow-sm border-blue-50">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-bold text-slate-700 text-sm">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onNavigate('order')}
                  className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors group text-center"
                >
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShoppingBag className="w-5 h-5 text-[#0288D1]" />
                  </div>
                  <span className="text-xs font-bold text-[#0288D1]">Order Water</span>
                </button>

                <button
                  onClick={() => onNavigate('qr_scanner')}
                  className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors group text-center"
                >
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <QrCode className="w-5 h-5 text-[#0288D1]" />
                  </div>
                  <span className="text-xs font-bold text-[#0288D1]">Scan QR</span>
                </button>

                <button
                  onClick={() => onNavigate('deposits')}
                  className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors group text-center"
                >
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <RefreshCw className="w-5 h-5 text-[#0288D1]" />
                  </div>
                  <span className="text-xs font-bold text-[#0288D1]">Container Swap</span>
                </button>

                <button
                  onClick={() => onNavigate('subscription')}
                  className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors group text-center"
                >
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar className="w-5 h-5 text-[#0288D1]" />
                  </div>
                  <span className="text-xs font-bold text-[#0288D1]">Sub Plan</span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Active Subscription Card */}
          {subscription && (
            <Card className="rounded-3xl shadow-sm border-blue-50">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-700 text-sm">Active Subscription</h3>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-none text-xs font-bold rounded-full uppercase">
                    ACTIVE
                  </Badge>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0288D1] shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{subscription.planName}</p>
                    <p className="text-xs text-slate-400">Next Delivery: {subscription.nextDeliveryDate}</p>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  onClick={() => onNavigate('subscription')}
                  className="w-full h-12 bg-[#F3FAFF] text-[#0288D1] hover:text-[#0288D1] font-bold text-xs rounded-xl hover:bg-blue-100 transition-colors"
                >
                  Manage Schedule
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Environmental Impact & Eco-Tip Card */}
          <Card className="rounded-3xl shadow-sm border-blue-50">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Your Eco Record</p>
                    <p className="text-xs text-slate-400">Ghana Circular Water</p>
                  </div>
                </div>

                <Button
                  variant="link"
                  size="sm"
                  onClick={() => onNavigate('impact')}
                  className="text-xs text-[#0288D1] font-bold px-0 h-auto"
                >
                  View Dashboard
                </Button>
              </div>

              <div className="bg-[#F3FAFF] border border-dashed border-blue-200 rounded-2xl p-4 flex items-center gap-3">
                <div className="text-[#0288D1] shrink-0">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">Ghana Eco-Tip</p>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Returning intact 15L containers enables 100+ refill cycles, eliminating sachet plastic dumping in city stormwater drains!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

