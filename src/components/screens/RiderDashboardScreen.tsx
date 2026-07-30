import React, { useState, useEffect } from 'react';
import { Truck, MapPin, QrCode, Phone, CheckCircle2, RotateCcw, RefreshCw, Check, DollarSign, Award, X } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { Order } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardHeader, MetricCard } from '../shared';

interface RiderDashboardScreenProps {
  orders: Order[];
  onCompleteDelivery: (orderId: string) => void;
}

const CameraView: React.FC<{ elementId: string; onScan: (text: string) => void }> = ({ elementId, onScan }) => {
  useEffect(() => {
    const el = document.getElementById(elementId);
    if (el) el.innerHTML = '';
    const scanner = new Html5Qrcode(elementId);
    let started = false;
    scanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (text) => {
        started = false;
        onScan(text);
        scanner.stop().then(() => scanner.clear()).catch(() => {});
      },
      () => {}
    ).then(() => {
      started = true;
    }).catch(() => {});

    return () => {
      if (started) {
        scanner.stop().then(() => scanner.clear()).catch(() => {});
      }
    };
  }, [elementId, onScan]);
  return null;
};

export const RiderDashboardScreen: React.FC<RiderDashboardScreenProps> = ({ orders, bottles, onCompleteDelivery }) => {
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [scannerOpen, setScannerOpen] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<'scan_empty_out' | 'scan_full_in' | 'completed'>('scan_empty_out');
  const [scanCompleted, setScanCompleted] = useState<boolean>(false);

  const [scannedEmptyQR, setScannedEmptyQR] = useState<string | null>(null);
  const [scannedFullQR, setScannedFullQR] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const [deliveryConfirmed, setDeliveryConfirmed] = useState<boolean>(false);
  const [completedToday, setCompletedToday] = useState<number>(14);
  const [earningsToday, setEarningsToday] = useState<number>(185);
  const [emptiesCollected, setEmptiesCollected] = useState<number>(26);

  // Sync selectedOrder with the first undelivered order
  useEffect(() => {
    const active = orders.find((o) => o.deliveryStatus !== 'delivered');
    if (active) {
      setSelectedOrder(active);
    }
  }, [orders]);

  const handleStartScan = () => {
    setScanStep('scan_empty_out');
    setScannedEmptyQR(null);
    setScannedFullQR(null);
    setScanError(null);
    setScannerOpen(true);
  };

  const handleEmptyScan = (text: string) => {
    const b = bottles.find((b) => b.id === text || b.qrCode === text || (b.qrCode && b.qrCode.endsWith(text)));
    if (b) {
      if (b.linerState !== 'empty_ready_return') {
        setScanError(`Invalid Scan: Container is marked as '${b.linerState}', not empty.`);
      } else {
        setScanError(null);
        setScannedEmptyQR(b.qrCode);
        setTimeout(handleNextStep, 800);
      }
    } else {
      setScanError(`Unrecognized QR Code`);
    }
  };

  const handleFullScan = (text: string) => {
    const b = bottles.find((b) => b.id === text || b.qrCode === text || (b.qrCode && b.qrCode.endsWith(text)));
    if (b) {
      if (b.linerState !== 'freshly_filled') {
        setScanError(`Invalid Scan: Container is marked as '${b.linerState}', not fresh.`);
      } else {
        setScanError(null);
        setScannedFullQR(b.qrCode);
        setTimeout(handleNextStep, 800);
      }
    } else {
      setScanError(`Unrecognized QR Code`);
    }
  };

  const handleNextStep = () => {
    setScanError(null);
    if (scanStep === 'scan_empty_out') {
      setScanStep('scan_full_in');
    } else if (scanStep === 'scan_full_in') {
      setScanStep('completed');
    } else {
      setScanCompleted(true);
      setScannerOpen(false);
    }
  };

  const handleConfirmDelivery = () => {
    if (!selectedOrder) return;
    onCompleteDelivery(selectedOrder.id);
    setDeliveryConfirmed(true);
    setCompletedToday((prev) => prev + 1);
    setEarningsToday((prev) => prev + 30);
    setEmptiesCollected((prev) => prev + selectedOrder.emptyBottlesToCollect);
  };

  const handleCloseScanner = () => {
    setScannerOpen(false);
    setScanStep('scan_empty_out');
    setScanError(null);
  };

  const activeDelivery = !deliveryConfirmed && selectedOrder;

  // Pick real bottles from mock data for the scan workflow
  const emptyBottles = bottles.filter((b) => b.linerState === 'empty_ready_return');
  const freshBottles = bottles.filter((b) => b.linerState === 'freshly_filled');
  const scannedEmpty = emptyBottles[0] || null;
  const scannedFresh = freshBottles[0] || null;  return (
    <div className="space-y-5 pb-24">
      {/* Rider Header */}
      <DashboardHeader 
        title="Kwame Osei (Rider #12)"
        subtitle="East Legon & Boundary Rd Route"
        icon={Truck}
        badgeText={isOffline ? 'Offline' : 'Online'}
        badgeVariant="default"
        badgeClassName={isOffline ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}
      />

      {/* Rider Daily Metrics — now dynamic */}
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <MetricCard 
          title="Today's Earnings"
          value={`GH₵ ${earningsToday.toFixed(2)}`}
          valueClassName="text-emerald-600"
        />
        <MetricCard 
          title="Swaps Completed"
          value={`${completedToday} Swaps`}
          valueClassName="text-primary"
        />
        <MetricCard 
          title="Empties Collected"
          value={`${emptiesCollected} Shells`}
          valueClassName="text-emerald-600"
        />
      </div>

      {/* Success Banner — shown after delivery is confirmed */}
      {deliveryConfirmed && (
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl border-2 border-emerald-200 shadow-md">
          <CardContent className="p-6 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-lg font-black text-emerald-900">1:1 Swap Complete! ✅</h2>
              <p className="text-sm text-emerald-700 mt-1">
                Order #{selectedOrder?.orderNumber} — {selectedOrder?.customerName}
              </p>
              <p className="text-sm text-emerald-600 font-medium mt-1">
                GH₵ 25.00 deposit refund credited to customer • Zero cash handled
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto pt-2">
              <div className="bg-white rounded-2xl p-3 shadow-sm">
                <span className="text-xs text-slate-500 block">Empties Collected</span>
                <span className="text-lg font-black text-emerald-700">{selectedOrder?.emptyBottlesToCollect || 2}x</span>
              </div>
              <div className="bg-white rounded-2xl p-3 shadow-sm">
                <span className="text-xs text-slate-500 block">Fresh Delivered</span>
                <span className="text-lg font-black text-primary">{selectedOrder?.items[0]?.quantity || 2}x</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assigned Delivery Task Card — hidden after confirmation */}
      {activeDelivery && (
        <Card className="rounded-3xl border-2 border-blue-200 shadow-md">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-blue-50 pb-3">
              <div>
                <span className="text-xs text-primary font-bold uppercase tracking-wider block">1:1 Shell Swap Delivery Job</span>
                <h2 className="text-sm font-black text-slate-900">Order #{selectedOrder.orderNumber}</h2>
              </div>

              <Badge className="bg-amber-100 hover:bg-amber-100 text-amber-900 border-none text-sm font-bold rounded-full">
                Out for Delivery
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 bg-[#F3FAFF] p-3 rounded-2xl text-slate-800">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900">{selectedOrder.customerName}</span>
                  <p className="text-sm text-slate-600">{selectedOrder.deliveryAddress}</p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl">
                <span className="text-slate-600">Customer Phone:</span>
                <a href={`tel:${selectedOrder.customerPhone}`} className="font-bold text-primary underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {selectedOrder.customerPhone}
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-2xl">
                  <span className="text-sm text-emerald-800 block font-semibold">1. Scan Collected Container</span>
                  <span className="font-extrabold text-emerald-950">{selectedOrder.emptyBottlesToCollect}x Swapped Empties</span>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-2.5 rounded-2xl">
                  <span className="text-sm text-blue-800 block font-semibold">2. Scan Handed Container</span>
                  <span className="font-extrabold text-blue-950">{selectedOrder.items[0]?.quantity || 2}x Fresh Water Refills</span>
                </div>
              </div>
            </div>

            {/* Delivery Confirmation & Dual Scan Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <Button
                onClick={handleStartScan}
                className="w-full sm:w-auto h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <QrCode className="w-4 h-4" />
                <span>
                  {scanCompleted ? '✅ Scan Complete' : 'Rider Scan Workflow (Empty OUT + Full IN)'}
                </span>
              </Button>

              <Button
                onClick={handleConfirmDelivery}
                disabled={!scanCompleted}
                className={`w-full sm:w-auto h-12 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  scanCompleted
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm 1:1 Swap Complete</span>
              </Button>
              {!scanCompleted && (
                <p className="text-xs text-slate-400 text-center">Use the Scan Workflow above first to log the swap</p>
              )}
              {scanCompleted && !deliveryConfirmed && (
                <p className="text-xs text-emerald-600 font-bold text-center animate-pulse">✓ Scan logged — now confirm the swap to complete</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rider QR Scan Modal */}
      {scannerOpen && (
        <div className="fixed inset-0 z-50 bg-primary/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl border-blue-100">
            <div className="flex items-center justify-between border-b border-blue-100 pb-2">
              <h3 className="text-sm font-extrabold text-slate-900">Rider Dual-Scan Exchange Scanner</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm font-mono bg-blue-100 text-primary border-none rounded-full font-bold">
                  {scanStep === 'scan_empty_out' ? 'Step 1/2' : scanStep === 'scan_full_in' ? 'Step 2/2' : 'Done'}
                </Badge>
                <button
                  onClick={handleCloseScanner}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {scanStep === 'scan_empty_out' && (
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-blue-900 text-sm">
                  <span className="font-extrabold block">1. Scan Empty Container Return</span>
                  <p className="text-sm text-blue-800 mt-1">Scan QR on the returned container to log the depot return & refill cycle.</p>
                </div>

                {!scannedEmptyQR ? (
                  <div className="rounded-2xl overflow-hidden border-2 border-primary/20 bg-black max-w-[250px] mx-auto w-full aspect-square relative">
                    <div id="reader-empty" className="w-full h-full object-cover"></div>
                    <CameraView elementId="reader-empty" onScan={handleEmptyScan} />
                    {scanError && (
                      <div className="absolute inset-x-2 bottom-2 bg-red-500 text-white text-xs font-bold p-2 rounded-xl text-center">
                        {scanError}
                        <button onClick={() => setScanError(null)} className="block w-full mt-1 underline">Retry</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-4 bg-primary rounded-2xl text-center text-white space-y-2">
                      <QrCode className="w-12 h-12 text-white/60 mx-auto" />
                      <p className="text-sm font-mono text-white/80">SCANNED: {scannedEmptyQR}</p>
                      <span className="text-sm text-emerald-400 font-bold flex items-center gap-1 justify-center"><CheckCircle2 className="w-3 h-3" /> Return Logged!</span>
                    </div>
                    <Button onClick={handleNextStep} className="w-full h-11 bg-primary text-white font-bold rounded-xl shadow-sm">Proceed to Next Scan</Button>
                  </div>
                )}
              </div>
            )}

            {scanStep === 'scan_full_in' && (
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-blue-900 text-sm">
                  <span className="font-extrabold block">2. Scan Delivered Water Container</span>
                  <p className="text-sm text-blue-800 mt-1">Scan QR on the fresh container to record the customer handoff.</p>
                </div>

                {!scannedFullQR ? (
                  <div className="rounded-2xl overflow-hidden border-2 border-primary/20 bg-black max-w-[250px] mx-auto w-full aspect-square relative">
                    <div id="reader-full" className="w-full h-full object-cover"></div>
                    <CameraView elementId="reader-full" onScan={handleFullScan} />
                    {scanError && (
                      <div className="absolute inset-x-2 bottom-2 bg-red-500 text-white text-xs font-bold p-2 rounded-xl text-center">
                        {scanError}
                        <button onClick={() => setScanError(null)} className="block w-full mt-1 underline">Retry</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-4 bg-primary rounded-2xl text-center text-white space-y-2">
                      <QrCode className="w-12 h-12 text-white/60 mx-auto" />
                      <p className="text-sm font-mono text-white/80">SCANNED: {scannedFullQR}</p>
                      <span className="text-sm text-emerald-400 font-bold flex items-center gap-1 justify-center"><CheckCircle2 className="w-3 h-3" /> Delivery Logged!</span>
                    </div>
                    <Button onClick={handleNextStep} className="w-full h-11 bg-primary text-white font-bold rounded-xl shadow-sm">Verify Delivery Handoff</Button>
                  </div>
                )}
              </div>
            )}

            {scanStep === 'completed' && (
              <div className="space-y-3 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">1:1 Shell Swap Verified!</h4>
                  <p className="text-sm text-slate-500 mt-0.5">
                    No cash deposit held or refunded by anyone. Customer paid content price only!
                  </p>
                </div>

                <Button
                  onClick={handleNextStep}
                  className="w-full sm:w-auto h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Close & Continue Route</span>
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
