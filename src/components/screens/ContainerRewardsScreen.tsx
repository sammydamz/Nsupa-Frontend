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
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-primary rounded-2xl flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 leading-tight">Swap Rewards</h1>
              <p className="text-base text-slate-500 mt-1">11th Refill is FREE</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prominent Milestone Reward Card */}
      <Card className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl text-white shadow-lg shadow-primary/10 border-none relative overflow-hidden">
        <CardContent className="p-6 space-y-5">
          {/* Background Decorative Graphic */}
          <div className="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
            <Gift className="w-48 h-48 text-white" />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-3">
              <span className="text-sm uppercase font-bold text-blue-200 tracking-wider flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                Milestone Reward
              </span>
              <h2 className="text-xl font-black text-white">
                {currentSwaps} / {totalSwapsForReward} Swaps
              </h2>
              <p className="text-base text-blue-100">
                <strong className="text-amber-300 font-extrabold">{swapsNeeded} more</strong> to unlock FREE Refill
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md p-4 rounded-3xl border border-white/20 text-center shrink-0">
              <Gift className="w-8 h-8 text-amber-300 mx-auto" />
              <span className="text-sm text-blue-100 font-bold block mt-2">Earned</span>
              <span className="text-lg font-black text-white">{rewardsUnlockedCount}</span>
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div className="relative z-10 space-y-2">
            <Progress value={progressPercent} className="h-3 bg-black/20 p-0.5 border border-white/20 [&>div]:bg-gradient-to-r [&>div]:from-amber-300 [&>div]:to-amber-400" />
            
            {/* 10 Milestone Badges Row */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 pt-1">
              {Array.from({ length: 10 }).map((_, idx) => {
                const swapNum = idx + 1;
                const isDone = swapNum <= currentSwaps;
                const isReward = swapNum === 10;

                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center h-10 rounded-2xl text-center text-sm font-bold ${
                      isDone
                        ? 'bg-amber-300 text-slate-900'
                        : isReward
                        ? 'bg-amber-400/90 text-slate-900 border-2 border-amber-200 animate-pulse'
                        : 'bg-white/10 text-blue-200 border border-white/10'
                    }`}
                  >
                    {isDone ? (
                      <Check className="w-5 h-5 stroke-[3]" />
                    ) : isReward ? (
                      <Gift className="w-5 h-5 text-slate-900" />
                    ) : (
                      <span>{swapNum}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 pt-5 border-t border-white/15 flex items-center justify-end text-sm text-blue-100">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('order')}
              className="bg-white text-primary hover:text-primary font-extrabold rounded-2xl text-base h-12 px-6 hover:bg-blue-50 transition-colors shadow-sm"
            >
              Swap Water Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reusable Containers Currently Held */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold uppercase text-slate-800 tracking-wider">Containers Held ({bottles.length})</h2>
        </div>

        <div className="space-y-4">
          {bottles.map((bottle) => (
            <Card key={bottle.id} className="rounded-3xl border-blue-50 shadow-sm">
              <CardContent className="p-5 sm:p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-slate-900 block">{bottle.id}</span>
                    <span className="text-sm text-slate-500 block mt-1">{bottle.type} ({bottle.sizeLitres}L)</span>
                  </div>

                  <Badge variant="outline" className={`border-none px-4 py-2 rounded-full text-sm font-bold uppercase ${
                    bottle.linerState === 'empty_ready_return'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {bottle.linerState === 'empty_ready_return' ? 'Empty' : 'Active'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-base bg-slate-50 p-4 rounded-3xl border border-slate-100">
                  <div>
                    <span className="text-sm text-slate-500 block mb-1">Total Swaps</span>
                    <span className="font-bold text-slate-900">{bottle.refillCount} Cycles</span>
                  </div>

                  <div>
                    <span className="text-sm text-slate-500 block mb-1">Refill Price</span>
                    <span className="font-extrabold text-emerald-700">GH₵ {bottle.sizeLitres === 15 ? '12.00' : '8.00'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">


                  <Button
                    onClick={() => onNavigate('order')}
                    className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-sm"
                  >
                    <RefreshCw className="w-5 h-5" />
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
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold uppercase text-slate-800 tracking-wider">Recent Swap History</h3>
            <span className="text-sm text-slate-400">Scan verified</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between text-sm pb-4 border-b border-slate-100">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">1:1 Container Swap (2x 15L Shells)</span>
                  <span className="text-sm text-slate-500 block mt-0.5">Jul 20, 2026 • Rider Kwame Osei</span>
                  <span className="text-sm text-emerald-700 font-bold block mt-1">+2 Milestone Swaps Credited</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-slate-900 block text-sm">GH₵ 30.00</span>
                <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold mt-1 inline-block">Saved GH₵ 40</span>
              </div>
            </div>

            <div className="flex items-start justify-between text-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">1:1 Container Swap (2x 15L Shells)</span>
                  <span className="text-sm text-slate-500 block mt-0.5">Jul 15, 2026 • Rider Kwame Osei</span>
                  <span className="text-sm text-emerald-700 font-bold block mt-1">+2 Milestone Swaps Credited</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-slate-900 block text-sm">GH₵ 30.00</span>
                <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold mt-1 inline-block">Saved GH₵ 40</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
