import React from 'react';
import { ShoppingBag, Truck, Calendar, MapPin, Leaf, ArrowRight, QrCode, RefreshCw, Award, Hand, Sparkles } from 'lucide-react';
import { CustomerScreenId, Order, Subscription, EnvironmentalStats } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ActionCard } from '../shared';

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
  onOpenAIPredictor,
}) => {
  return (
    <div className="space-y-6 pb-20">
      {/* Top Greeting & Location Banner / Freshness Hero */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl text-white relative overflow-hidden shadow-lg shadow-primary/10 border-none">
        {/* Subtle background water drop graphic */}
        <div className="absolute right-[-30px] bottom-[-30px] opacity-20 pointer-events-none">
          <RefreshCw className="w-52 h-52 text-white" />
        </div>

        <CardContent className="relative z-10 space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-sm text-blue-100 font-medium flex items-center gap-1">Akwaaba <Hand className="w-4 h-4" /></span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">{userName}</h1>
            </div>

            <Button
              variant="secondary"
              className="bg-white/20 backdrop-blur-md px-4 py-6 rounded-2xl border border-white/25 text-left sm:text-right hover:bg-white/30 transition-all shadow-sm self-start sm:self-auto flex flex-col items-start sm:items-end justify-center text-white"
              onClick={() => onNavigate('wallet')}
            >
              <span className="text-xs text-blue-100 font-medium block h-auto">Nsupa Wallet</span>
              <span className="text-base font-bold">GH₵ {walletBalanceGHS.toFixed(2)}</span>
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-blue-50 bg-black/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 w-fit">
            <MapPin className="w-4 h-4 text-blue-200 shrink-0" />
            <span className="truncate max-w-[160px] sm:max-w-[280px] font-medium">{userAddress}</span>
          </div>

          {/* Eco Metrics Summary Row inside Hero */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-center">
              <span className="block text-xl sm:text-2xl font-bold">{environmentalStats.sachetsSaved}</span>
              <span className="text-xs opacity-80 uppercase font-medium">Sachets Saved</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-center">
              <span className="block text-xl sm:text-2xl font-bold">{environmentalStats.plasticWasteKgSaved}kg</span>
              <span className="text-xs opacity-80 uppercase font-medium">Plastic Kept Away</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-center">
              <span className="block text-xl sm:text-2xl font-bold">{environmentalStats.reusableCyclesCompleted}</span>
              <span className="text-xs opacity-80 uppercase font-medium">Bottle Cycles</span>
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
                    <p className="text-sm text-slate-400">Order #{activeOrder.orderNumber}</p>
                  </div>
                  <Badge className="bg-blue-100 text-primary hover:bg-blue-100 font-bold uppercase rounded-full">
                    In Transit
                  </Badge>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0 font-bold">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{activeOrder.riderName}</p>
                    <p className="text-sm text-slate-500">Arriving in ~12 mins</p>
                  </div>
                  <a
                    href={`tel:${activeOrder.riderPhone}`}
                    className="ml-auto inline-flex items-center justify-center h-8 px-4 bg-primary text-white rounded-xl text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors"
                  >
                    Call Rider
                  </a>
                </div>

                <div className="space-y-1.5">
                  <Progress value={75} className="h-2 bg-slate-100 [&>div]:bg-primary" />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Depot Dispatched</span>
                    <span className="font-bold text-primary">3 stops away</span>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  onClick={() => onNavigate('tracking')}
                  className="w-full sm:w-auto h-12 bg-[#F3FAFF] text-primary hover:text-primary font-bold text-sm rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Live Delivery Tracking</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Prominent Swap Milestone Rewards Progress Card */}
          <Card className="bg-gradient-to-br from-primary to-primary/90 rounded-3xl text-white shadow-lg shadow-primary/10 border-none relative overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-amber-300 font-black shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-blue-200 tracking-wider block">Nsupa Rewards Tracker</span>
                    <h3 className="font-extrabold text-white text-base">7 / 10 Completed Swaps</h3>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onNavigate('deposits')}
                  className="bg-white text-primary hover:text-primary text-sm font-extrabold rounded-full hover:bg-blue-50 shadow-sm w-full sm:w-auto"
                >
                  View Tracker
                </Button>
              </div>

              <p className="text-sm text-blue-100 leading-relaxed">
                You are <strong className="text-amber-300 font-extrabold">3 swaps away</strong> from unlocking your <strong>11th Refill FREE</strong>! Every 10 container swaps earns a free reward automatically.
              </p>

              <div className="space-y-1.5">
                <Progress value={70} className="h-3 bg-black/20 p-0.5 border border-white/20 [&>div]:bg-gradient-to-r [&>div]:from-amber-300 [&>div]:to-amber-400" />
                <div className="flex justify-between text-xs text-blue-100">
                  <span>7 Swaps Done</span>
                  <span className="font-bold text-amber-300">10th FREE Reward Goal</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 1:1 Shell Swap Model Banner */}
          <Card className="bg-primary rounded-3xl text-white shadow-lg shadow-primary/10 border-none">
            <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <p className="text-sm opacity-80 uppercase font-bold tracking-wider mb-1">1:1 Container Swap System</p>
                <p className="text-lg font-black leading-tight">GH₵ 12.00 Water Refill</p>
                <p className="text-sm text-blue-100">Simple 1:1 empty-for-full container exchange model</p>
              </div>

              <Button
                variant="outline"
                onClick={() => onNavigate('deposits')}
                className="bg-white/20 hover:bg-white/30 text-white hover:text-white font-bold h-10 px-4 rounded-2xl text-sm border-white/30 transition-all shrink-0 w-full sm:w-auto"
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
                <ActionCard 
                  title="Order Water"
                  icon={ShoppingBag}
                  onClick={() => onNavigate('order')}
                />
                <ActionCard 
                  title="Scan QR"
                  icon={QrCode}
                  onClick={() => onNavigate('qr_scanner')}
                />
                <ActionCard 
                  title="Container Swap"
                  icon={RefreshCw}
                  onClick={() => onNavigate('deposits')}
                />
                <ActionCard 
                  title="Sub Plan"
                  icon={Calendar}
                  onClick={() => onNavigate('subscription')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Active Subscription Card */}
          {subscription && (
            <Card className="rounded-3xl shadow-sm border-blue-50">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-700 text-sm">Active Subscription</h3>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-none text-sm font-bold rounded-full uppercase">
                    ACTIVE
                  </Badge>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{subscription.planName}</p>
                    <p className="text-sm text-slate-400">Next Delivery: {subscription.nextDeliveryDate}</p>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  onClick={() => onNavigate('subscription')}
                  className="w-full sm:w-auto h-12 bg-[#F3FAFF] text-primary hover:text-primary font-bold text-sm rounded-xl hover:bg-blue-100 transition-colors"
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
                    <p className="text-sm text-slate-400">Ghana Circular Water</p>
                  </div>
                </div>

                <Button
                  variant="link"
                  size="sm"
                  onClick={() => onNavigate('impact')}
                  className="text-sm text-primary font-bold px-0 h-auto"
                >
                  View Dashboard
                </Button>
              </div>

              <div className="bg-[#F3FAFF] border border-dashed border-blue-200 rounded-2xl p-4 flex items-center gap-3">
                <div className="text-primary shrink-0">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Ghana Eco-Tip</p>
                  <p className="text-sm text-slate-500 leading-snug">
                    Returning intact 15L containers enables 100+ refill cycles, eliminating sachet plastic dumping in city stormwater drains!
                  </p>
                </div>
              </div>

              <Button
                onClick={onOpenAIPredictor}
                className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 text-white font-extrabold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                <span>AI Smart Refill Predictor</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

