import React, { useState } from 'react';
import { RotateCcw, QrCode, ArrowRight, CheckCircle2, Award, Gift, Sparkles, ShoppingBag, Shield, Layers, RefreshCw, Check } from 'lucide-react';
import { CustomerScreenId, Bottle } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ContainerRewardsScreenProps {
  bottles: Bottle[];
  completedSwapsCount?: number;
  onNavigate: (screen: CustomerScreenId) => void;
}

export const ContainerRewardsScreen: React.FC<ContainerRewardsScreenProps> = ({
  bottles,
  completedSwapsCount = 7,
  onNavigate,
}) => {
  const [selectedBottle, setSelectedBottle] = useState<Bottle | null>(null);

  const totalSwapsForReward = 10;
  const currentSwaps = completedSwapsCount % totalSwapsForReward;
  const swapsNeeded = totalSwapsForReward - currentSwaps;
  const progressPercent = (currentSwaps / totalSwapsForReward) * 100;
  const rewardsUnlockedCount = Math.floor(completedSwapsCount / totalSwapsForReward) + 1; // e.g. 1 unlocked already

  return (
    <div className="space-y-6 pb-24">
      {/* Top Header */}
      <Card className="rounded-3xl border-blue-50 shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-primary rounded-2xl flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 leading-tight">Containers & Swap Rewards</h1>
              <p className="text-xs text-slate-500">Track containers & earn every 10th swap free</p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-primary hover:bg-blue-100 font-extrabold px-2.5 py-1 rounded-full uppercase">
            No Deposits
          </Badge>
        </CardContent>
      </Card>

      {/* Prominent Milestone Reward Card */}
      <Card className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl text-white shadow-lg shadow-primary/10 border-none relative overflow-hidden">
        <CardContent className="p-6 space-y-5">
          {/* Background Decorative Graphic */}
          <div className="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
            <Gift className="w-48 h-48 text-white" />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] uppercase font-bold text-blue-200 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Nsupa Milestone Swap Reward
              </span>
              <h2 className="text-2xl font-black text-white">
                {currentSwaps} / {totalSwapsForReward} Completed Swaps
              </h2>
              <p className="text-xs text-blue-100">
                Only <strong className="text-amber-300 font-extrabold">{swapsNeeded} more swap{swapsNeeded > 1 ? 's' : ''}</strong> to unlock your 11th Refill FREE!
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-center shrink-0">
              <Gift className="w-6 h-6 text-amber-300 mx-auto" />
              <span className="text-[10px] text-blue-100 font-bold block mt-1">Free Rewards</span>
              <span className="text-xs font-black text-white">{rewardsUnlockedCount} Earned</span>
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div className="relative z-10 space-y-2">
            <Progress value={progressPercent} className="h-3 bg-black/20 p-0.5 border border-white/20 [&>div]:bg-gradient-to-r [&>div]:from-amber-300 [&>div]:to-amber-400" />
            
            {/* 10 Milestone Badges Row */}
            <div className="grid grid-cols-10 gap-1 pt-1">
              {Array.from({ length: 10 }).map((_, idx) => {
                const swapNum = idx + 1;
                const isDone = swapNum <= currentSwaps;
                const isReward = swapNum === 10;

                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center h-6 rounded-xl text-center text-[10px] font-bold ${
                      isDone
                        ? 'bg-amber-300 text-slate-900'
                        : isReward
                        ? 'bg-amber-400/90 text-slate-900 border-2 border-amber-200 animate-pulse'
                        : 'bg-white/10 text-blue-200 border border-white/10'
                    }`}
                  >
                    {isDone ? (
                      <Check className="w-3 h-3 stroke-[3]" />
                    ) : isReward ? (
                      <Gift className="w-3 h-3 text-slate-900" />
                    ) : (
                      <span>{swapNum}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 pt-2 border-t border-white/15 flex items-center justify-between text-xs text-blue-100">
            <span>Every 10 completed container swaps earns a free pouch or refill.</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigate('order')}
              className="bg-white text-primary hover:text-primary font-extrabold rounded-xl text-xs hover:bg-blue-50 transition-colors shrink-0 shadow-sm"
            >
              Swap Water Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Model Rule Banner */}
      <Card className="bg-[#F3FAFF] border-blue-100 rounded-3xl shadow-none">
        <CardContent className="p-4 space-y-1 text-slate-700">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs font-extrabold text-slate-900">How Container Swapping Works</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            The container is <strong>yours to keep</strong> — there is no deposit or return obligation. Whenever your container is empty, hand it to a driver or kiosk to swap for a full one and pay only the lower refill price (e.g., GH₵ 15.00 instead of GH₵ 35.00 for a new unit)!
          </p>
        </CardContent>
      </Card>

      {/* Reusable Containers Currently Held */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase text-slate-800 tracking-wider">Containers Currently Held ({bottles.length})</h2>
          <span className="text-[11px] text-primary font-bold">100% Owned by You</span>
        </div>

        <div className="space-y-3">
          {bottles.map((bottle) => (
            <Card key={bottle.id} className="rounded-3xl border-blue-50 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">{bottle.id}</span>
                    <span className="text-[11px] text-slate-500 block">{bottle.type} ({bottle.sizeLitres}L)</span>
                  </div>

                  <Badge variant="outline" className={`border-none px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    bottle.linerState === 'empty_ready_return'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {bottle.linerState === 'empty_ready_return' ? 'Empty (Ready to Swap)' : 'In Active Use'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Total Refill Swaps</span>
                    <span className="font-bold text-slate-800">{bottle.refillCount} Cycles Done</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">Refill Price</span>
                    <span className="font-extrabold text-emerald-700">GH₵ {bottle.sizeLitres === 15 ? '15.00' : '8.00'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Button
                    variant="outline"
                    onClick={() => onNavigate('qr_scanner')}
                    className="flex-1 h-10 bg-blue-50 text-primary font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 hover:bg-blue-100 hover:text-primary border border-blue-100"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Scan QR Code</span>
                  </Button>

                  <Button
                    onClick={() => onNavigate('order')}
                    className="flex-1 h-10 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Order Refill Swap</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Swap History Log */}
      <Card className="rounded-3xl border-blue-50 shadow-sm">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold uppercase text-slate-800 tracking-wider">Recent Swap History</h3>
            <span className="text-[11px] text-slate-400">Scan verified</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start justify-between text-xs pb-3 border-b border-slate-100">
              <div className="flex gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">1:1 Container Swap (2x 15L Shells)</span>
                  <span className="text-[11px] text-slate-400 block">Jul 20, 2026 • Driver Kwame Osei</span>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">+2 Milestone Swaps Credited</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-slate-900 block">GH₵ 30.00</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Saved GH₵ 40</span>
              </div>
            </div>

            <div className="flex items-start justify-between text-xs">
              <div className="flex gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">1:1 Container Swap (2x 15L Shells)</span>
                  <span className="text-[11px] text-slate-400 block">Jul 15, 2026 • Driver Kwame Osei</span>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">+2 Milestone Swaps Credited</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-slate-900 block">GH₵ 30.00</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Saved GH₵ 40</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
