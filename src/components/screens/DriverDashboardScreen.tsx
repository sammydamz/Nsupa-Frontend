import React, { useState } from 'react';
import { Truck, MapPin, QrCode, Phone, CheckCircle2, RotateCcw, Navigation, DollarSign, WifiOff, Wifi, RefreshCw, Check, Layers } from 'lucide-react';
import { Order } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardHeader, MetricCard } from '../shared';

interface DriverDashboardScreenProps {
  orders: Order[];
  onCompleteDelivery: (orderId: string) => void;
}

export const DriverDashboardScreen: React.FC<DriverDashboardScreenProps> = ({ orders, onCompleteDelivery }) => {
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [scannerOpen, setScannerOpen] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<'scan_empty_out' | 'scan_full_in' | 'completed'>('scan_empty_out');

  const handleStartScan = () => {
    setScanStep('scan_empty_out');
    setScannerOpen(true);
  };

  const handleNextStep = () => {
    if (scanStep === 'scan_empty_out') {
      setScanStep('scan_full_in');
    } else if (scanStep === 'scan_full_in') {
      setScanStep('completed');
    } else {
      setScannerOpen(false);
    }
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Driver Header */}
      <DashboardHeader 
        title="Kwame Osei (Rider #12)"
        subtitle="East Legon & Boundary Rd Route"
        icon={Truck}
        badgeText={isOffline ? 'Offline' : 'Online'}
        badgeVariant="default"
        badgeClassName={isOffline ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}
      />

      {/* Driver Daily Metrics */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <MetricCard 
          title="Today's Earnings"
          value="GH₵ 185.00"
        />
        <MetricCard 
          title="Swaps Completed"
          value="14 Swaps"
          valueClassName="text-primary"
        />
        <MetricCard 
          title="Empties Collected"
          value="26 Shells"
          valueClassName="text-emerald-600"
        />
      </div>

      {/* Assigned Delivery Task Card */}
      {selectedOrder && (
        <Card className="rounded-3xl border-2 border-blue-200 shadow-md">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-blue-50 pb-3">
              <div>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">1:1 Shell Swap Delivery Job</span>
                <h2 className="text-sm font-black text-slate-900">Order #{selectedOrder.orderNumber}</h2>
              </div>

              <Badge className="bg-amber-100 hover:bg-amber-100 text-amber-900 border-none text-xs font-bold rounded-full">
                Out for Delivery
              </Badge>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 bg-[#F3FAFF] p-3 rounded-2xl text-slate-800">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900">{selectedOrder.customerName}</span>
                  <p className="text-[11px] text-slate-600">{selectedOrder.deliveryAddress}</p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl">
                <span className="text-slate-600">Customer Phone:</span>
                <a href={`tel:${selectedOrder.customerPhone}`} className="font-bold text-primary underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {selectedOrder.customerPhone}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-2xl">
                  <span className="text-[10px] text-emerald-800 block font-semibold">1. Scan Collected Container</span>
                  <span className="font-extrabold text-emerald-950">2x Swapped Empties</span>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-2.5 rounded-2xl">
                  <span className="text-[10px] text-blue-800 block font-semibold">2. Scan Handed Container</span>
                  <span className="font-extrabold text-blue-950">2x Fresh Water Refills</span>
                </div>
              </div>
            </div>

            {/* Delivery Confirmation & Dual Scan Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <Button
                onClick={handleStartScan}
                className="w-full sm:w-auto h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <QrCode className="w-4 h-4" />
                <span>Driver Scan Workflow (Empty OUT + Full IN)</span>
              </Button>

              <Button
                onClick={() => onCompleteDelivery(selectedOrder.id)}
                className="w-full sm:w-auto h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm 1:1 Swap Complete (Zero Deposit Held)</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Driver QR Scan Modal */}
      {scannerOpen && (
        <div className="fixed inset-0 z-50 bg-primary/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl border-blue-100">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-sm font-extrabold text-slate-900">Driver Dual-Scan Exchange Scanner</h3>
              <Badge variant="outline" className="text-[10px] font-mono bg-blue-100 text-primary border-none rounded-full font-bold">
                {scanStep === 'scan_empty_out' ? 'Step 1/2' : scanStep === 'scan_full_in' ? 'Step 2/2' : 'Done'}
              </Badge>
            </div>

            {scanStep === 'scan_empty_out' && (
              <div className="space-y-3">
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs">
                  <span className="font-extrabold block">1. Scan Swapped Container</span>
                  <p className="text-[11px] text-amber-800">Scan QR code on the returned container to log depot return & refill cycle tracking.</p>
                </div>

                <div className="p-4 bg-primary rounded-2xl text-center text-white space-y-2">
                  <QrCode className="w-16 h-16 text-amber-400 mx-auto animate-pulse" />
                  <p className="text-xs font-mono text-amber-300">SCANNED: Nsupa-15L-BTL-8822</p>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 justify-center"><CheckCircle2 className="w-3 h-3" /> Container Return Logged for Depot Refill</span>
                </div>

                <Button
                  onClick={handleNextStep}
                  className="w-full sm:w-auto h-11 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Proceed to Scan Delivered Container</span>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            )}

            {scanStep === 'scan_full_in' && (
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-blue-900 text-xs">
                  <span className="font-extrabold block">2. Scan Delivered Water Container</span>
                  <p className="text-[11px] text-blue-800">Scan QR code on fresh container delivered to customer to record route handoff.</p>
                </div>

                <div className="p-4 bg-primary rounded-2xl text-center text-white space-y-2">
                  <QrCode className="w-16 h-16 text-sky-400 mx-auto animate-pulse" />
                  <p className="text-xs font-mono text-primary-foreground/80">SCANNED: Nsupa-15L-BTL-9003</p>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 justify-center"><CheckCircle2 className="w-3 h-3" /> Delivery Handoff Logged</span>
                </div>

                <Button
                  onClick={handleNextStep}
                  className="w-full sm:w-auto h-11 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Verify Delivery Handoff</span>
                  <Check className="w-4 h-4" />
                </Button>
              </div>
            )}

            {scanStep === 'completed' && (
              <div className="space-y-3 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">1:1 Shell Swap Verified!</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    No cash deposit held or refunded by anyone. Customer paid content price only!
                  </p>
                </div>

                <Button
                  onClick={() => setScannerOpen(false)}
                  className="w-full sm:w-auto h-11 bg-primary hover:bg-slate-800 text-white font-bold rounded-xl text-xs"
                >
                  Close & Continue Route
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
