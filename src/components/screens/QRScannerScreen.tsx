import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { QrCode, ShieldCheck, CheckCircle2, Truck, Factory, History } from 'lucide-react';
import { Bottle, CustomerScreenId } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QRScannerScreenProps {
  onNavigate: (screen: CustomerScreenId) => void;
  onBottleScanned?: (bottle: Bottle) => void;
}

export const QRScannerScreen: React.FC<QRScannerScreenProps> = ({
  onNavigate,
  onBottleScanned,
}) => {
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [scanHistory, setScanHistory] = useState<Bottle[]>([]);
  const [scannedBottle, setScannedBottle] = useState<Bottle | null>(null);

  const handleRealScan = (scanInput: string) => {
    try {
      const input = scanInput.trim();
      if (!input) return;

      const b = [
  { id: 'NS-BTL-8821', qrCode: 'Nsupa-15L-8821-ACCR', type: '15L Reusable Dispenser Bottle', sizeLitres: 15, status: 'with_customer', linerState: 'partially_used', tamperEvidentRingIntact: true, depositAmountGHS: 25, refillCount: 14, lastRefilledAt: '2026-07-18 09:30 AM', depotLocation: 'Achimota Certified Depot #1', batchNumber: 'BATCH-2026-0718-A' } as Bottle,
  { id: 'NS-BTL-8822', qrCode: 'Nsupa-15L-8822-ACCR', type: '15L Reusable Dispenser Bottle', sizeLitres: 15, status: 'with_customer', linerState: 'empty_ready_return', tamperEvidentRingIntact: false, depositAmountGHS: 25, refillCount: 22, lastRefilledAt: '2026-07-02 02:15 PM', depotLocation: 'Achimota Certified Depot #1', batchNumber: 'BATCH-2026-0702-B' } as Bottle,
  { id: 'NS-BTL-9003', qrCode: 'Nsupa-15L-9003-ACCR', type: '15L Reusable Dispenser Bottle', sizeLitres: 15, status: 'in_transit', linerState: 'freshly_filled', tamperEvidentRingIntact: true, depositAmountGHS: 25, refillCount: 8, lastRefilledAt: '2026-07-21 07:45 AM', depotLocation: 'East Legon Dispatch Station', batchNumber: 'BATCH-2026-0721-C' } as Bottle,
  { id: 'NS-BTL-4110', qrCode: 'Nsupa-5L-4110-KMS', type: '5L Eco Pouch', sizeLitres: 5, status: 'at_depot_cleaning', linerState: 'empty_ready_return', tamperEvidentRingIntact: false, depositAmountGHS: 10, refillCount: 31, lastRefilledAt: '2026-07-10 11:00 AM', depotLocation: 'Kumasi Central Hub', batchNumber: 'BATCH-2026-0710-A' } as Bottle,
  { id: 'NS-BTL-4433', qrCode: 'Nsupa-15L-4433-ACCR', type: '15L Reusable Dispenser Bottle', sizeLitres: 15, status: 'at_depot_refilling', linerState: 'empty_ready_return', tamperEvidentRingIntact: false, depositAmountGHS: 25, refillCount: 42, lastRefilledAt: '2026-07-21 06:00 AM', depotLocation: 'Achimota Certified Depot #1', batchNumber: 'BATCH-2026-0721-D' } as Bottle,
  { id: 'NS-BTL-5541', qrCode: 'Nsupa-15L-5541-ACCR', type: '15L Reusable Dispenser Bottle', sizeLitres: 15, status: 'ready_for_dispatch', linerState: 'freshly_filled', tamperEvidentRingIntact: true, depositAmountGHS: 25, refillCount: 9, lastRefilledAt: '2026-07-22 08:15 AM', depotLocation: 'Achimota Certified Depot #1', batchNumber: 'BATCH-2026-0722-A' } as Bottle,
].find(
        (b: any) => b && (b.id === input || b.qrCode === input || (b.qrCode && b.qrCode.endsWith(input)))
      );
      if (b) {
        setIsScanning(false);
        setScannedBottle(b);
        setScanHistory((prev) => [b, ...prev]);
        if (onBottleScanned) onBottleScanned(b);
      } else {
        setIsScanning(false);
        const fallback: Bottle = {
          id: input,
          qrCode: input,
          sizeLitres: 0,
          type: '15L Reusable Dispenser Bottle',
          status: 'with_customer',
          linerState: 'freshly_filled',
          tamperEvidentRingIntact: true,
          depositAmountGHS: 0,
          refillCount: 0,
          lastRefilledAt: new Date().toLocaleString(),
          depotLocation: 'External QR Code — Not in Nsupa System',
          batchNumber: 'N/A',
        };
        setScannedBottle(fallback);
        setScanHistory((prev) => [fallback, ...prev]);
      }
    } catch (e) {
      console.error('Scan error', e);
      // Still show what was scanned even on error
      setIsScanning(false);
      setScannedBottle(null);
    }
  };

  // Separate camera component that fully mounts/unmounts — key forces clean lifecycle
  const CameraView: React.FC<{ onScan: (text: string) => void }> = ({ onScan }) => {
    useEffect(() => {
      const el = document.getElementById('reader');
      if (el) el.innerHTML = '';
      const scanner = new Html5Qrcode('reader');
      let started = false;
      scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (text) => {
          started = false;
          scanner.stop().then(() => scanner.clear().then(() => onScan(text))).catch(() => {});
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
    }, []);
    return null;
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Title */}
      <Card className="rounded-3xl border-blue-50 shadow-sm">
        <CardContent className="p-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-primary rounded-2xl flex items-center justify-center font-bold">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 leading-tight">Delivery & Refill Tracking Scanner</h1>
              <p className="text-sm text-slate-500">Scanned to log delivery handoffs & depot refill cycles</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {isScanning ? (
        <Card className="bg-white rounded-3xl text-slate-900 shadow-lg border-2 border-blue-100 relative overflow-hidden">
          <CardContent className="p-6 space-y-5">
            <div className="relative mx-auto w-full max-w-sm rounded-3xl overflow-hidden shadow-inner bg-slate-50">
              <div id="reader" className="w-full h-full min-h-[300px]"></div>
              <CameraView key="cam" onScan={handleRealScan} />
            </div>
          </CardContent>
        </Card>
      ) : (
        scannedBottle && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
            {/* Return to Scanner */}
            <button
              onClick={() => setIsScanning(true)}
              className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <QrCode className="w-4 h-4" />
              <span>← Return to Scanner</span>
            </button>

            <Card className="bg-blue-50 border-2 border-blue-200 rounded-3xl shadow-none">
              <CardContent className="p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary text-white rounded-2xl">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`text-sm font-bold uppercase tracking-wider block ${scannedBottle.depotLocation.includes('External') ? 'text-amber-700' : 'text-primary'}`}>
                        {scannedBottle.depotLocation.includes('External') ? 'QR Code Scanned' : 'Container QR Asset Verified'}
                      </span>
                      <h2 className="text-xl font-extrabold text-slate-900 mt-0.5 break-all">{scannedBottle.qrCode}</h2>
                    </div>
                  </div>
                  {scannedBottle.depotLocation.includes('External') ? (
                    <Badge className="bg-amber-100 hover:bg-amber-100 text-amber-800 text-sm font-bold rounded-full border-none">
                      Unverified QR
                    </Badge>
                  ) : (
                    <Badge className="bg-blue-100 hover:bg-blue-100 text-primary text-sm font-extrabold rounded-full border-none">
                      Depot Verified
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm pt-1">
                  <div className="bg-white p-3 rounded-2xl border border-blue-100">
                    <span className="text-xs text-slate-500 block">Depot Location</span>
                    <span className="font-bold text-slate-800 truncate block">{scannedBottle.depotLocation}</span>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-blue-100">
                    <span className="text-xs text-slate-500 block">Refill Batch</span>
                    <span className="font-bold text-slate-800 truncate block">{scannedBottle.batchNumber}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-blue-50 shadow-sm">
              <CardContent className="p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Factory className="w-5 h-5 text-primary" />
                    <h3 className="text-sm font-bold uppercase text-slate-800 tracking-wider">Depot Refill Cycle Counter</h3>
                  </div>
                  <Badge variant="outline" className="text-sm font-black text-primary bg-blue-50 rounded-full border-blue-100">
                    {scannedBottle.refillCount} Cycles
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  This container is tracked by certified depot stations to record every sanitization, refilling, and delivery dispatch event.
                </p>
                <div className="space-y-3 pt-1">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-slate-500" />
                    Container Lifecycle History
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-slate-900 gap-1">
                          <span>Out for Delivery Handoff</span>
                          <span className="text-xs text-slate-400 font-normal whitespace-nowrap">Today, 08:30 AM</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-0.5">Scanned onto delivery truck for East Legon route.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-slate-900 gap-1">
                          <span>Refilled & Factory Sealed</span>
                          <span className="text-xs text-slate-400 font-normal whitespace-nowrap">Yesterday, 04:15 PM</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-0.5">Quality inspection passed at Achimota Depot #1.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-slate-900 gap-1">
                          <span>Sanitizing & Washing Cycle</span>
                          <span className="text-xs text-slate-400 font-normal whitespace-nowrap">Yesterday, 02:00 PM</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-0.5">Multi-stage hygienic wash complete.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              onClick={() => setIsScanning(true)}
              className="w-full sm:w-auto h-12 bg-blue-50 text-primary hover:bg-blue-100 hover:text-primary font-bold rounded-2xl text-sm flex items-center justify-center gap-2 border-blue-100 transition-colors"
            >
              <QrCode className="w-4 h-4" />
              <span>Scan Another Container QR Code</span>
            </Button>

            {/* Scan History — newest first */}
            {scanHistory.length > 0 && (
              <Card className="rounded-3xl border-blue-50 shadow-sm">
                <CardContent className="p-5 space-y-3">
                  <h3 className="text-sm font-bold uppercase text-slate-800 tracking-wider flex items-center gap-2">
                    <History className="w-4 h-4 text-primary" />
                    Recent Scans ({scanHistory.length})
                  </h3>
                  <div className="space-y-2">
                    {scanHistory.map((item, idx) => (
                      <button
                        key={item.id + idx}
                        onClick={() => setScannedBottle(item)}
                        className={`w-full text-left p-3 rounded-2xl border transition-colors flex items-center justify-between gap-2 ${
                          scannedBottle?.id === item.id && scannedBottle?.qrCode === item.qrCode
                            ? 'bg-primary/5 border-primary/30'
                            : 'bg-slate-50 border-slate-200 hover:border-blue-200'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <span className="font-bold text-slate-900 text-sm block truncate">{item.qrCode}</span>
                          <span className="text-xs text-slate-500 block truncate">
                            {item.depotLocation.includes('External') ? 'Unverified QR' : `${item.depotLocation} • ${item.refillCount} cycles`}
                          </span>
                        </div>
                        <Badge variant="outline" className={`text-xs font-bold rounded-full shrink-0 ${
                          item.depotLocation.includes('External')
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-blue-50 text-primary border-blue-200'
                        }`}>
                          {idx === 0 ? 'Latest' : `#${idx + 1}`}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )
      )}
    </div>
  );
};
