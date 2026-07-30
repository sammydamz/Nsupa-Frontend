import React, { useState } from 'react';
import { Calendar, Sparkles, PauseCircle, PlayCircle } from 'lucide-react';
import { Subscription } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface SubscriptionScreenProps {
  subscription?: Subscription;
  onUpdateSubscription: (sub: Subscription) => void;
}

export const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({
  subscription,
  onUpdateSubscription,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('bi_weekly');
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
      <Card className="rounded-2xl border-blue-50 shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-blue-50 text-primary rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 leading-tight">Water Subscriptions</h1>
              <p className="text-sm text-slate-500">Automated Doorstep Refills in Ghana</p>
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
      <Card className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl text-white shadow-md border-none">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-sky-400/40 pb-4">
            <div>
              <span className="text-xs text-blue-100 font-bold uppercase tracking-wider">Active Plan</span>
              <h2 className="text-xl font-black mt-1">{subState.planName}</h2>
            </div>
            <Badge variant="outline" className="border-none bg-white/20 backdrop-blur-sm text-white text-sm font-extrabold rounded-full px-3 py-1.5 hover:bg-white/20">
              {subState.discountPercent}% Member Discount
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
              <span className="text-xs text-blue-100 block mb-1">Frequency</span>
              <span className="font-extrabold capitalize text-white">{subState.frequency.replace('_', ' ')}</span>
            </div>

            <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
              <span className="text-xs text-blue-100 block mb-1">Volume per Delivery</span>
              <span className="font-extrabold text-white">{subState.bottleQuantity}x 15L Shells (30L)</span>
            </div>

            <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
              <span className="text-xs text-blue-100 block mb-1">Next Scheduled Arrival</span>
              <span className="font-extrabold text-white">{subState.nextDeliveryDate}</span>
            </div>

            <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
              <span className="text-xs text-blue-100 block mb-1">Payment Method</span>
              <span className="font-extrabold text-white text-xs truncate block">{subState.paymentMethod}</span>
            </div>
          </div>

          {/* AI Smart Auto-Dispatch Toggle */}
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-100 shrink-0" />
              <div>
                <span className="text-sm font-bold block text-white mb-0.5">AI Consumption Auto-Refill</span>
                <span className="text-xs text-blue-100 block">Adjusts dispatch if water runs out early</span>
              </div>
            </div>
            <Switch
              checked={subState.autoRefillAiEnabled}
              onCheckedChange={toggleAi}
              className="data-[state=checked]:bg-emerald-400 data-[state=unchecked]:bg-slate-500"
            />
          </div>

          {/* Controls */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={toggleStatus}
              className="w-full sm:w-auto h-12 bg-white text-primary hover:text-primary font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-blue-50 transition-colors"
            >
              {subState.status === 'active' ? (
                <>
                  <PauseCircle className="w-5 h-5 text-amber-600" />
                  <span>Pause Subscription</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-5 h-5 text-emerald-600" />
                  <span>Resume Subscription</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Plans Selection */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase text-slate-800 tracking-wider">Available Subscription Options</h3>

        <RadioGroup
          value={selectedPlan}
          onValueChange={setSelectedPlan}
          className="space-y-3"
        >
          <div>
            <RadioGroupItem value="weekly" id="plan-weekly" className="peer sr-only" />
            <Label
              htmlFor="plan-weekly"
              className="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-sky-200 peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-sky-50 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-sky-200 cursor-pointer transition-all"
            >
              <div>
                <span className="text-sm font-extrabold text-slate-900 block mb-1">Weekly 1-Bottle (15L)</span>
                <span className="text-xs text-slate-500 font-normal">Best for small offices & individuals</span>
              </div>
              <span className="text-sm font-extrabold text-sky-700">GHS 20.00 / week</span>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="bi_weekly" id="plan-biweekly" className="peer sr-only" />
            <Label
              htmlFor="plan-biweekly"
              className="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-sky-200 peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-sky-50 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-sky-200 cursor-pointer transition-all"
            >
              <div>
                <span className="text-sm font-extrabold text-slate-900 flex items-center gap-2 mb-1">
                  Bi-Weekly Family Pack (2x 15L)
                  <Badge className="bg-sky-600 hover:bg-sky-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">POPULAR</Badge>
                </span>
                <span className="text-xs text-slate-500 font-normal">Most popular for Accra households</span>
              </div>
              <span className="text-sm font-extrabold text-sky-700">GHS 39.00 / 2 wks</span>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="monthly" id="plan-monthly" className="peer sr-only" />
            <Label
              htmlFor="plan-monthly"
              className="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-sky-200 peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-sky-50 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-sky-200 cursor-pointer transition-all"
            >
              <div>
                <span className="text-sm font-extrabold text-slate-900 block mb-1">Monthly Bulk Office Pack (8x 15L)</span>
                <span className="text-xs text-slate-500 font-normal">Schools, restaurants & corporate offices</span>
              </div>
              <span className="text-sm font-extrabold text-sky-700">GHS 150.00 / mo</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

