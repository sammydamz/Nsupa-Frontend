import React, { useState } from 'react';
import { ShoppingBag, MapPin, CheckCircle2, ArrowRight, Minus, Plus, Info, RotateCcw, Layers } from 'lucide-react';
import { CustomerScreenId, Order } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface OrderWaterScreenProps {
  onOrderPlaced: (order: Order) => void;
  onNavigate: (screen: CustomerScreenId) => void;
}

export const OrderWaterScreen: React.FC<OrderWaterScreenProps> = ({ onOrderPlaced, onNavigate }) => {
  const [accountCategory, setAccountCategory] = useState<'individual' | 'office' | 'school'>('individual');
  const [selectedType, setSelectedType] = useState<'15L Shell' | '5L Pouch'>('15L Shell');
  const [quantity, setQuantity] = useState<number>(2);
  const [hasEmptyToSwap, setHasEmptyToSwap] = useState<boolean>(true);
  const [purchaseType, setPurchaseType] = useState<'one_time' | 'subscription'>('subscription');
  const [region, setRegion] = useState<string>('East Legon, Accra');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('House 14, Boundary Road, East Legon, Accra');
  const [scheduledDate, setScheduledDate] = useState<string>('2026-07-23');
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM - 12:00 PM');
  const [paymentMethod, setPaymentMethod] = useState<'mtn_momo' | 'telecel_cash' | 'at_money' | 'card' | 'wallet'>('mtn_momo');
  const [loading, setLoading] = useState<boolean>(false);

  // Diagram Pricing Logic:
  const contentPricePerUnitGHS = selectedType === '15L Shell' ? 15 : 8;
  const surchargePerUnitGHS = hasEmptyToSwap ? 0 : (selectedType === '15L Shell' ? 10 : 4);
  
  const subtotalWaterGHS = quantity * contentPricePerUnitGHS;
  const subtotalSurchargeGHS = quantity * surchargePerUnitGHS;
  const discountGHS = purchaseType === 'subscription' ? Math.round(subtotalWaterGHS * 0.1) : 0;
  const totalAmountGHS = subtotalWaterGHS + subtotalSurchargeGHS - discountGHS;

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const newOrder: Order = {
        id: `ORD-2026-${Math.floor(100 + Math.random() * 900)}`,
        orderNumber: `NS-${Math.floor(90000 + Math.random() * 9000)}`,
        customerName: 'Ama Mensah',
        customerPhone: '+233 24 412 3456',
        deliveryAddress,
        region,
        items: [
          {
            bottleType: selectedType === '15L Shell' ? '15L Factory-Sealed Reusable Shell' : '5L Reusable Eco Pouch',
            quantity,
            unitPriceGHS: contentPricePerUnitGHS,
            surchargePerBottleGHS: surchargePerUnitGHS,
            hasEmptyToSwap,
          }
        ],
        totalPriceGHS: totalAmountGHS,
        surchargeTotalGHS: subtotalSurchargeGHS,
        paymentMethod,
        paymentStatus: 'paid',
        deliveryStatus: 'order_placed',
        scheduledDate,
        scheduledTimeSlot: timeSlot,
        emptyBottlesToCollect: hasEmptyToSwap ? quantity : 0,
        emptyBottlesSwapped: hasEmptyToSwap ? quantity : 0,
        createdAt: new Date().toLocaleString(),
      };

      onOrderPlaced(newOrder);
      onNavigate('tracking');
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Page Title */}
      <Card className="rounded-3xl border-blue-50 shadow-sm">
        <CardContent className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-primary rounded-2xl flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 leading-tight">Order Water Refills</h1>
              <p className="text-xs text-slate-500">Ghana 1:1 Shell Swap Exchange Model</p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-primary hover:bg-blue-100 font-bold uppercase rounded-full">
            1:1 Swap Model
          </Badge>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Selection Form Steps (lg:col-span-2) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Select Account Category / Use Case */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">1. Select Target Account Type</label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAccountCategory('individual')}
                className={`h-auto flex-col items-center justify-center p-3 rounded-2xl transition-all ${
                  accountCategory === 'individual' ? 'border-primary bg-[#F3FAFF] ring-2 ring-blue-200' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold text-slate-900 block">Individual</span>
                <span className="text-[10px] text-slate-500 font-normal">Household & Personal</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setAccountCategory('office')}
                className={`h-auto flex-col items-center justify-center p-3 rounded-2xl transition-all ${
                  accountCategory === 'office' ? 'border-primary bg-[#F3FAFF] ring-2 ring-blue-200' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold text-slate-900 block">Office</span>
                <span className="text-[10px] text-slate-500 font-normal">Corporate Dispenser</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setAccountCategory('school')}
                className={`h-auto flex-col items-center justify-center p-3 rounded-2xl transition-all ${
                  accountCategory === 'school' ? 'border-primary bg-[#F3FAFF] ring-2 ring-blue-200' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold text-slate-900 block">School</span>
                <span className="text-[10px] text-slate-500 font-normal">Bulk & Canteen</span>
              </Button>
            </div>
          </div>

          {/* Select Water Container Format */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">2. Select Water Format</label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => setSelectedType('15L Shell')}
                className={`h-auto flex-col items-start p-4 rounded-3xl transition-all relative w-full ${
                  selectedType === '15L Shell'
                    ? 'border-primary bg-[#F3FAFF] ring-2 ring-blue-200'
                    : 'border-slate-200 bg-white hover:border-blue-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1 w-full">
                  <span className="text-xs font-extrabold text-slate-900">15L Dispenser Bottle</span>
                  {selectedType === '15L Shell' && <CheckCircle2 className="w-4 h-4 text-primary" />}
                </div>
                <p className="text-[11px] text-slate-500 font-normal leading-tight mb-2 whitespace-normal text-left">Factory-sealed reusable 15L bottle.</p>
                <span className="text-xs font-extrabold text-primary">GH₵ 15.00 / water content</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => setSelectedType('5L Pouch')}
                className={`h-auto flex-col items-start p-4 rounded-3xl transition-all relative w-full ${
                  selectedType === '5L Pouch'
                    ? 'border-primary bg-[#F3FAFF] ring-2 ring-blue-200'
                    : 'border-slate-200 bg-white hover:border-blue-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1 w-full">
                  <span className="text-xs font-extrabold text-slate-900">5L Reusable Pouch</span>
                  {selectedType === '5L Pouch' && <CheckCircle2 className="w-4 h-4 text-primary" />}
                </div>
                <p className="text-[11px] text-slate-500 font-normal leading-tight mb-2 whitespace-normal text-left">Portable spout pouch for small households.</p>
                <span className="text-xs font-extrabold text-primary">GH₵ 8.00 / water content</span>
              </Button>
            </div>
          </div>

          {/* Select Quantity */}
          <Card className="rounded-3xl border-blue-50 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Number of Refills</span>
                <span className="text-[11px] text-slate-500 block">Total Volume: {quantity * (selectedType === '15L Shell' ? 15 : 5)} Litres</span>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-white shadow-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-extrabold text-slate-900 text-sm w-6 text-center">{quantity}</span>
                <Button
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl bg-primary text-white shadow-xs font-bold hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Point of Restock Swap Logic Options */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                3. Point of Restock Shell Trade
              </label>
              <span className="text-[10px] text-slate-500 font-medium">Hawker • Office • Home</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Branch 1: Brings back empty shell */}
              <Button
                variant="outline"
                onClick={() => setHasEmptyToSwap(true)}
                className={`h-auto flex-col items-stretch p-4 rounded-3xl transition-all relative space-y-2 w-full ${
                  hasEmptyToSwap
                    ? 'border-emerald-500 bg-emerald-50/90 ring-2 ring-emerald-300'
                    : 'border-slate-200 bg-white hover:border-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-xl ${hasEmptyToSwap ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <RotateCcw className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-emerald-950">Brings back empty shell</span>
                  </div>
                  {hasEmptyToSwap && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </div>

                <p className="text-[11px] font-normal text-emerald-900 leading-snug whitespace-normal text-left">
                  Pays water content price only with 1:1 container exchange.
                </p>

                <div className="pt-2 mt-2 border-t border-emerald-200/60 flex items-baseline justify-between">
                  <span className="text-[10px] uppercase font-bold text-emerald-800">Price per unit:</span>
                  <span className="text-sm font-black text-emerald-700">GH₵ {contentPricePerUnitGHS.toFixed(2)}</span>
                </div>
              </Button>

              {/* Branch 2: No empty shell to trade */}
              <Button
                variant="outline"
                onClick={() => setHasEmptyToSwap(false)}
                className={`h-auto flex-col items-stretch p-4 rounded-3xl transition-all relative space-y-2 w-full ${
                  !hasEmptyToSwap
                    ? 'border-amber-500 bg-amber-50/90 ring-2 ring-amber-300'
                    : 'border-slate-200 bg-white hover:border-amber-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-xl ${!hasEmptyToSwap ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <Layers className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-amber-950">No empty shell to trade</span>
                  </div>
                  {!hasEmptyToSwap && <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />}
                </div>

                <p className="text-[11px] font-normal text-amber-900 leading-snug whitespace-normal text-left">
                  Pays content + shell surcharge (e.g., GH₵15 + GH₵10).
                </p>

                <div className="pt-2 mt-2 border-t border-amber-200/60 flex items-baseline justify-between">
                  <span className="text-[10px] uppercase font-bold text-amber-800">Price per unit:</span>
                  <span className="text-sm font-black text-amber-800">
                    GH₵ {(contentPricePerUnitGHS + surchargePerUnitGHS).toFixed(2)}
                  </span>
                </div>
              </Button>
            </div>

            {/* Informational Callout Box */}
            <Card className="bg-[#F3FAFF] border-blue-100 mt-3 rounded-2xl shadow-none">
              <CardContent className="p-3.5 flex items-start gap-3">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1 text-[11px]">
                  <p className="font-bold text-slate-800">
                    Driver scans empty out, scans full in — simple 1:1 exchange
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Returning an empty container ensures you pay only the lower water content price every time, making refills easy and affordable.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Delivery Schedule Type */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">4. Schedule & Frequency</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => setPurchaseType('subscription')}
                className={`h-auto flex-col items-start p-3.5 rounded-2xl transition-all w-full ${
                  purchaseType === 'subscription'
                    ? 'border-primary bg-[#F3FAFF] ring-2 ring-blue-200'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1 w-full">
                  <span className="text-xs font-bold text-slate-900">Auto Refill Plan</span>
                  <Badge variant="outline" className="text-[10px] bg-green-100 text-green-800 border-none px-1.5 py-0.5 font-bold rounded-full">10% OFF</Badge>
                </div>
                <p className="text-[10px] font-normal text-slate-500 text-left whitespace-normal">Delivered on your custom schedule automatically.</p>
              </Button>

              <Button
                variant="outline"
                onClick={() => setPurchaseType('one_time')}
                className={`h-auto flex-col items-start p-3.5 rounded-2xl transition-all w-full ${
                  purchaseType === 'one_time'
                    ? 'border-primary bg-[#F3FAFF] ring-2 ring-blue-200'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold text-slate-900 block mb-1">One-Time Order</span>
                <p className="text-[10px] font-normal text-slate-500 text-left whitespace-normal">Single delivery order as needed.</p>
              </Button>
            </div>
          </div>

          {/* Address & Date Selection */}
          <Card className="rounded-3xl border-blue-50 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Address (Accra / Kumasi)</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <Input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="pl-10 h-10 rounded-2xl bg-slate-50 border-slate-200 text-xs font-medium focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Delivery Date</label>
                  <Input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="h-10 rounded-2xl bg-slate-50 border-slate-200 font-medium focus-visible:ring-primary"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Time Window</label>
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger className="h-10 rounded-2xl bg-slate-50 border-slate-200 font-medium focus:ring-primary">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</SelectItem>
                      <SelectItem value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</SelectItem>
                      <SelectItem value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">5. Select Ghana Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                onClick={() => setPaymentMethod('mtn_momo')}
                className={`h-auto flex-col items-center justify-center p-3 rounded-2xl transition-all w-full ${
                  paymentMethod === 'mtn_momo' ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <span className="text-[11px] font-bold text-slate-900 block">MTN MoMo</span>
                <span className="text-[9px] font-normal text-amber-700 font-semibold">*170# Prompt</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => setPaymentMethod('telecel_cash')}
                className={`h-auto flex-col items-center justify-center p-3 rounded-2xl transition-all w-full ${
                  paymentMethod === 'telecel_cash' ? 'border-red-500 bg-red-50 ring-2 ring-red-200' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <span className="text-[11px] font-bold text-slate-900 block">Telecel Cash</span>
                <span className="text-[9px] font-normal text-red-700 font-semibold">*110# Prompt</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => setPaymentMethod('wallet')}
                className={`h-auto flex-col items-center justify-center p-3 rounded-2xl transition-all w-full ${
                  paymentMethod === 'wallet' ? 'border-primary bg-blue-50 ring-2 ring-blue-200' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <span className="text-[11px] font-bold text-slate-900 block">Nsupa Wallet</span>
                <span className="text-[9px] font-normal text-primary font-semibold">Instant Pay</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Card (lg:col-span-1 lg:sticky lg:top-24) */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
          <Card className="bg-slate-900 text-white rounded-3xl border-none shadow-lg">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase text-[#4FC3F7] tracking-wider">Restock Order Summary</span>
                <span className="text-[10px] text-slate-400 font-mono">1:1 Exchange</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Water Content ({quantity}x {selectedType}):</span>
                  <span className="font-semibold text-white">GH₵ {subtotalWaterGHS.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shell Trade Status:</span>
                  <span className="font-bold text-emerald-400">
                    {hasEmptyToSwap ? `1:1 Shell Swap (${quantity} empty returned)` : `Shell Surcharge (+GH₵ ${subtotalSurchargeGHS.toFixed(2)})`}
                  </span>
                </div>

                {!hasEmptyToSwap && (
                  <div className="flex justify-between text-amber-300">
                    <span>Shell Surcharge ({quantity}x GH₵ {surchargePerUnitGHS}):</span>
                    <span className="font-semibold">+ GH₵ {subtotalSurchargeGHS.toFixed(2)}</span>
                  </div>
                )}

                {discountGHS > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Subscription Member Discount:</span>
                    <span className="font-semibold">- GH₵ {discountGHS.toFixed(2)}</span>
                  </div>
                )}

                <Separator className="bg-slate-800 my-2" />

                <div className="flex justify-between text-sm font-black text-white pt-1">
                  <span>Total Payable:</span>
                  <span className="text-[#4FC3F7] text-lg">GH₵ {totalAmountGHS.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full sm:w-auto h-14 bg-primary hover:bg-primary/90 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                {loading ? (
                  <span>Initiating MoMo Payment Prompt...</span>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Pay GH₵ {totalAmountGHS.toFixed(2)} & Confirm Swap</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

