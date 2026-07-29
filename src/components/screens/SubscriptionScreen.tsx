import React, { useState } from 'react';
import { Calendar, Sparkles, PauseCircle, PlayCircle } from 'lucide-react';
import { Subscription } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface SubscriptionScreenProps {
  subscription?: Subscription;
  onUpdateSubscription: (sub: Subscription) => void;
}

export const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({
  subscription,
  onUpdateSubscription,
}) => {
  const [subState, setSubState] = useState<Subscription>(
    subscription || {
      id: 'SUB-881',
      planName: 'Family Clean Water Pack',
      frequency: 'bi_weekly',
      bottleQuantity: 2,
      bottleType: '15L Rigid Shell + Collapsing Liner',
      nextDeliveryDate: '2026-07-29',
      deliveryAddress: 'House 14, Boundary Road, East Legon, Accra',
      paymentMethod: 'MTN Mobile Money (*170# Auto-Debit)',
      status: 'active',
      discountPercent: 12,
      autoRefillAiEnabled: true,
    }
  );

  const toggleStatus = () => {
    const newStatus = subState.status === 'active' ? 'paused' : 'active';
    const updated = { ...subState, status: newStatus as any };
    setSubState(updated);
    onUpdateSubscription(updated);
  };

  const toggleAi = () => {
    const updated = { ...subState, autoRefillAiEnabled: !subState.autoRefillAiEnabled };
    setSubState(updated);
    onUpdateSubscription(updated);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Header */}
      <Card className="rounded-2xl border-sky-100 shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-sky-100 text-sky-700 rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 leading-tight">Water Subscriptions</h1>
              <p className="text-xs text-slate-500">Automated Doorstep Refills in Ghana</p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`border-none px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
              subState.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}
          >
            {subState.status}
          </Badge>
        </CardContent>
      </Card>

      {/* Main Plan Card */}
      <Card className="bg-gradient-to-br from-sky-600 to-sky-700 rounded-3xl text-white shadow-md border-none">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-sky-400/40 pb-3">
            <div>
              <span className="text-[10px] text-sky-200 font-bold uppercase tracking-wider">Active Plan</span>
              <h2 className="text-lg font-black">{subState.planName}</h2>
            </div>
            <Badge variant="outline" className="border-none bg-white/20 backdrop-blur-sm text-white text-xs font-extrabold rounded-full px-2.5 py-1 hover:bg-white/20">
              {subState.discountPercent}% Member Discount
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-sky-800/50 p-2.5 rounded-2xl border border-sky-400/30">
              <span className="text-[10px] text-sky-200 block">Frequency</span>
              <span className="font-extrabold capitalize text-white">{subState.frequency.replace('_', ' ')}</span>
            </div>

            <div className="bg-sky-800/50 p-2.5 rounded-2xl border border-sky-400/30">
              <span className="text-[10px] text-sky-200 block">Volume per Delivery</span>
              <span className="font-extrabold text-white">{subState.bottleQuantity}x 15L Shells (30L)</span>
            </div>

            <div className="bg-sky-800/50 p-2.5 rounded-2xl border border-sky-400/30">
              <span className="text-[10px] text-sky-200 block">Next Scheduled Arrival</span>
              <span className="font-extrabold text-white">{subState.nextDeliveryDate}</span>
            </div>

            <div className="bg-sky-800/50 p-2.5 rounded-2xl border border-sky-400/30">
              <span className="text-[10px] text-sky-200 block">Payment Method</span>
              <span className="font-extrabold text-white text-[11px] truncate block">{subState.paymentMethod}</span>
            </div>
          </div>

          {/* AI Smart Auto-Dispatch Toggle */}
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-200 shrink-0" />
              <div>
                <span className="text-xs font-bold block text-white">AI Consumption Auto-Refill</span>
                <span className="text-[10px] text-sky-200 block">Adjusts dispatch if water runs out early</span>
              </div>
            </div>
            <Switch
              checked={subState.autoRefillAiEnabled}
              onCheckedChange={toggleAi}
              className="data-[state=checked]:bg-emerald-400 data-[state=unchecked]:bg-slate-500"
            />
          </div>

          {/* Controls */}
          <div className="flex gap-2 pt-1">
            <Button
              variant="secondary"
              onClick={toggleStatus}
              className="w-full h-10 bg-white text-sky-800 hover:text-sky-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm hover:bg-sky-50 transition-colors"
            >
              {subState.status === 'active' ? (
                <>
                  <PauseCircle className="w-4 h-4 text-amber-600" />
                  <span>Pause Subscription</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4 text-emerald-600" />
                  <span>Resume Subscription</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Plans Selection */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase text-slate-800 tracking-wider">Available Subscription Options</h3>

        <div className="space-y-2">
          <Card className="rounded-2xl border-sky-200 shadow-sm">
            <CardContent className="p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">Weekly 1-Bottle (15L)</span>
                <span className="text-[11px] text-slate-500">Best for small offices & individuals</span>
              </div>
              <span className="text-xs font-extrabold text-sky-700">GHS 20.00 / week</span>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-2 border-sky-500 shadow-sm bg-sky-50">
            <CardContent className="p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-sky-900 block flex items-center gap-1.5">
                  Bi-Weekly Family Pack (2x 15L)
                  <Badge className="bg-sky-600 hover:bg-sky-600 text-white text-[9px] px-1.5 py-0 rounded-full font-bold">POPULAR</Badge>
                </span>
                <span className="text-[11px] text-sky-700">Most popular for Accra households</span>
              </div>
              <span className="text-xs font-extrabold text-sky-800">GHS 39.00 / 2 wks</span>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-sky-200 shadow-sm">
            <CardContent className="p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">Monthly Bulk Office Pack (8x 15L)</span>
                <span className="text-[11px] text-slate-500">Schools, restaurants & corporate offices</span>
              </div>
              <span className="text-xs font-extrabold text-sky-700">GHS 150.00 / mo</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

