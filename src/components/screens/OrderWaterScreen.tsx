import React, { useState } from 'react';
import { ShoppingBag, MapPin, CheckCircle2, ArrowRight, Minus, Plus, Info, RotateCcw, Layers } from 'lucide-react';
import { CustomerScreenId, Order } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'moolre'>('paystack');
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
              <h1 className="text-xl font-extrabold text-slate-900 leading-tight">Order Water Refills</h1>
              <p className="text-sm text-slate-500">1:1 Shell Swap Exchange</p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-primary hover:bg-blue-100 font-bold uppercase rounded-full px-3 py-1 text-xs">
            1:1 Swap
          </Badge>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Selection Form Steps (lg:col-span-2) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Select Account Category / Use Case */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider">1. Select Target Account Type</label>
            <Tabs 
              value={accountCategory} 
              onValueChange={(val) => setAccountCategory(val as 'individual' | 'office' | 'school')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 bg-slate-100/70 p-1.5 rounded-2xl !h-auto gap-1 border border-slate-200/60">
                <TabsTrigger value="individual" className="flex flex-col items-center p-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">
                  <span className="text-sm font-bold block">Individual</span>
                  <span className="text-xs text-muted-foreground font-medium">Household</span>
                </TabsTrigger>
                <TabsTrigger value="office" className="flex flex-col items-center p-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">
                  <span className="text-sm font-bold block">Office</span>
                  <span className="text-xs text-muted-foreground font-medium">Dispenser</span>
                </TabsTrigger>
                <TabsTrigger value="school" className="flex flex-col items-center p-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">
                  <span className="text-sm font-bold block">School</span>
                  <span className="text-xs text-muted-foreground font-medium">Canteen</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Select Water Container Format */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider">2. Select Water Format</label>
            <RadioGroup 
              value={selectedType} 
              onValueChange={(val) => setSelectedType(val as '15L Shell' | '5L Pouch')}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <div>
                <RadioGroupItem value="15L Shell" id="15l-shell" className="peer sr-only" />
                <Label
                  htmlFor="15l-shell"
                  className="flex flex-col items-start p-4 rounded-3xl border-2 border-slate-200 bg-white hover:border-blue-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-blue-50/50 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-blue-200 cursor-pointer transition-all h-full"
                >
                  <div className="flex items-center justify-between mb-1 w-full">
                    <span className="text-sm font-extrabold text-slate-900">15L Dispenser Bottle</span>
                    {selectedType === '15L Shell' && <CheckCircle2 className="w-5 h-5 text-primary" />}
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-tight mb-3 text-left">Reusable 15L bottle</p>
                  <span className="text-sm font-extrabold text-primary mt-auto">GH₵ 15.00</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="5L Pouch" id="5l-pouch" className="peer sr-only" />
                <Label
                  htmlFor="5l-pouch"
                  className="flex flex-col items-start p-4 rounded-3xl border-2 border-slate-200 bg-white hover:border-blue-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-blue-50/50 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-blue-200 cursor-pointer transition-all h-full"
                >
                  <div className="flex items-center justify-between mb-1 w-full">
                    <span className="text-sm font-extrabold text-slate-900">5L Reusable Pouch</span>
                    {selectedType === '5L Pouch' && <CheckCircle2 className="w-5 h-5 text-primary" />}
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-tight mb-3 text-left">Portable spout pouch</p>
                  <span className="text-sm font-extrabold text-primary mt-auto">GH₵ 8.00</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Select Quantity */}
          <Card className="rounded-3xl border-blue-50 shadow-sm">
            <CardContent className="p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-sm font-bold text-slate-800 block">Number of Refills</span>
                <span className="text-xs text-slate-500 font-medium block mt-1">Total Volume: {quantity * (selectedType === '15L Shell' ? 15 : 5)} Litres</span>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-white shadow-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  <Minus className="w-5 h-5" />
                </Button>
                <span className="font-extrabold text-slate-900 text-lg w-8 text-center">{quantity}</span>
                <Button
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl bg-primary text-white shadow-xs font-bold hover:bg-primary/90"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Point of Restock Swap Logic Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider">
                3. Point of Restock Shell Trade
              </label>
              <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full hidden sm:inline-block">Hawker • Office • Home</span>
            </div>

            <RadioGroup
              value={hasEmptyToSwap ? 'yes' : 'no'}
              onValueChange={(val) => setHasEmptyToSwap(val === 'yes')}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {/* Branch 1: Brings back empty shell */}
              <div>
                <RadioGroupItem value="yes" id="trade-yes" className="peer sr-only" />
                <Label
                  htmlFor="trade-yes"
                  className="flex flex-col items-stretch p-5 rounded-3xl border-2 border-slate-200 bg-white hover:border-emerald-200 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50/90 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-emerald-300 cursor-pointer transition-all h-full space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${hasEmptyToSwap ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <RotateCcw className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-emerald-950">Exchange empty container</span>
                    </div>
                    {hasEmptyToSwap && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                  </div>

                  <div className="pt-3 mt-auto border-t border-emerald-200/60 flex items-baseline justify-between">
                    <span className="text-xs uppercase font-bold text-emerald-800">Unit Cost:</span>
                    <span className="text-lg font-black text-emerald-700">GH₵ {contentPricePerUnitGHS.toFixed(2)}</span>
                  </div>
                </Label>
              </div>

              {/* Branch 2: No empty shell to trade */}
              <div>
                <RadioGroupItem value="no" id="trade-no" className="peer sr-only" />
                <Label
                  htmlFor="trade-no"
                  className="flex flex-col items-stretch p-5 rounded-3xl border-2 border-slate-200 bg-white hover:border-amber-200 peer-data-[state=checked]:border-amber-500 peer-data-[state=checked]:bg-amber-50/90 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-amber-300 cursor-pointer transition-all h-full space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${!hasEmptyToSwap ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-amber-950">No empty container</span>
                    </div>
                    {!hasEmptyToSwap && <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />}
                  </div>

                  <div className="pt-3 mt-auto border-t border-amber-200/60 flex items-baseline justify-between">
                    <span className="text-xs uppercase font-bold text-amber-800">Unit Cost:</span>
                    <span className="text-lg font-black text-amber-800">
                      GH₵ {(contentPricePerUnitGHS + surchargePerUnitGHS).toFixed(2)}
                    </span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Delivery Schedule Type */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider">4. Schedule & Frequency</label>
            <Tabs 
              value={purchaseType} 
              onValueChange={(val) => setPurchaseType(val as 'one_time' | 'subscription')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-slate-100/70 p-1.5 rounded-2xl !h-auto gap-1 border border-slate-200/60">
                <TabsTrigger value="subscription" className="flex flex-col items-center justify-center p-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-sm font-bold">Auto Refill Plan</span>
                    <Badge variant="outline" className="text-[10px] bg-green-100 text-green-800 border-none px-2 py-0.5 font-bold rounded-full h-5">10% OFF</Badge>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Custom schedule</span>
                </TabsTrigger>

                <TabsTrigger value="one_time" className="flex flex-col items-center justify-center p-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">
                  <span className="text-sm font-bold block mb-1">One-Time Order</span>
                  <span className="text-xs font-medium text-muted-foreground">Single delivery</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Address & Date Selection */}
          <Card className="rounded-3xl border-blue-50 shadow-sm">
            <CardContent className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Delivery Address</label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
                  <Input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="pl-10 h-12 rounded-2xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
                  <Input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="h-12 rounded-2xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Time Window</label>
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger className="h-12 rounded-2xl bg-slate-50 border-slate-200 text-sm font-medium focus:ring-primary">
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
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider">5. Select Payment Gateway</label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(val) => setPaymentMethod(val as any)}
              className="grid grid-cols-2 gap-3"
            >
              <div>
                <RadioGroupItem value="paystack" id="paystack" className="peer sr-only" />
                <Label
                  htmlFor="paystack"
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-sky-200 peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-sky-50 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-sky-200 cursor-pointer transition-all text-center h-full group"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Paystack_Logo.png" alt="Paystack" className="h-6 object-contain transition-transform group-hover:scale-105" />
                </Label>
              </div>

              <div>
                <RadioGroupItem value="moolre" id="moolre" className="peer sr-only" />
                <Label
                  htmlFor="moolre"
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-indigo-200 peer-data-[state=checked]:border-indigo-500 peer-data-[state=checked]:bg-indigo-50 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-indigo-200 cursor-pointer transition-all text-center h-full group"
                >
                  <img 
                    src="https://cdn.brandfetch.io/idta8X0gYt/w/820/h/226/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1741146048947" 
                    alt="Moolre" 
                    className="h-6 object-contain transition-transform group-hover:scale-105" 
                  />
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Right Column: Order Summary Card (lg:col-span-1 lg:sticky lg:top-24) */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
          <Card className="bg-white rounded-3xl border-2 border-blue-50 shadow-xl shadow-blue-900/5">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-sm font-bold uppercase text-primary tracking-wider">Restock Order Summary</span>
                <span className="text-xs text-slate-500 font-mono bg-slate-50 px-3 py-1 rounded-md hidden sm:inline-block">1:1 Exchange</span>
              </div>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex justify-between flex-wrap gap-1">
                  <span>Water Content ({quantity}x {selectedType}):</span>
                  <span className="font-bold text-slate-900">GH₵ {subtotalWaterGHS.toFixed(2)}</span>
                </div>

                <div className="flex justify-between flex-wrap gap-1">
                  <span>Shell Trade Status:</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                    {hasEmptyToSwap ? `1:1 Swap (${quantity} returned)` : `Surcharge (+GH₵ ${subtotalSurchargeGHS.toFixed(2)})`}
                  </span>
                </div>

                {!hasEmptyToSwap && (
                  <div className="flex justify-between flex-wrap gap-1 text-amber-700">
                    <span>Shell Surcharge ({quantity}x GH₵ {surchargePerUnitGHS}):</span>
                    <span className="font-bold">+ GH₵ {subtotalSurchargeGHS.toFixed(2)}</span>
                  </div>
                )}

                {discountGHS > 0 && (
                  <div className="flex justify-between flex-wrap gap-1 text-green-600">
                    <span>Auto-Refill Discount:</span>
                    <span className="font-bold">- GH₵ {discountGHS.toFixed(2)}</span>
                  </div>
                )}

                <Separator className="bg-slate-100 my-4" />

                <div className="flex justify-between flex-wrap gap-1 items-end text-base font-black text-slate-900 pt-1">
                  <span>Total Payable:</span>
                  <span className="text-primary text-2xl">GH₵ {totalAmountGHS.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full sm:w-auto h-14 bg-primary hover:bg-primary/90 text-white font-extrabold rounded-2xl text-sm shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Pay GH₵ {totalAmountGHS.toFixed(2)}</span>
                    <ArrowRight className="w-5 h-5" />
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

