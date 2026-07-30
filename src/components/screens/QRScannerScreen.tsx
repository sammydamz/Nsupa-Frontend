import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QrCode, ShieldCheck, CheckCircle2, RefreshCw, Info, MapPin, Truck, Factory, History, Calendar } from 'lucide-react';
import { Bottle, CustomerScreenId } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QRScannerScreenProps {
  bottles: Bottle[];
  onNavigate: (screen: CustomerScreenId) => void;
  onBottleScanned?: (bottle: Bottle) => void;
}

export const QRScannerScreen: React.FC<QRScannerScreenProps> = ({
  bottles,
  onNavigate,
  onBottleScanned,
}) => {
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [scannedBottle, setScannedBottle] = useState<Bottle | null>(bottles[0] || null);

  useEffect(() => {
    if (isScanning) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      scanner.render((decodedText) => {
        // Stop scanning after success
        scanner.clear();
        handleRealScan(decodedText);
      }, (err) => {
        // ignore ongoing errors
      });

      return () => {
        scanner.clear().catch(e => console.error(e));
      };
    }
  }, [isScanning]);

  const handleRealScan = async (bottleId: string) => {
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bottleId })
      });
      if (res.ok) {
        const result = await res.json();
        // For simplicity, just simulate picking that bottle from the list
        const b = bottles.find(b => b.id === bottleId) || bottles[0];
        setIsScanning(false);
        setScannedBottle(b);
        if (onBottleScanned) onBottleScanned(b);
      } else {
        alert("Failed to verify container. Is it in the system?");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSimulateScan = (bottle: Bottle) => {
    handleRealScan(bottle.id);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Title */}
      <Card className="rounded-3xl border-blue-50 shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-primary rounded-2xl flex items-center justify-center font-bold">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 leading-tight">Delivery & Refill Tracking Scanner</h1>
              <p className="text-sm text-slate-500">Scanned to log delivery handoffs & depot refill cycles</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsScanning(!isScanning)}
            className="bg-blue-50 text-primary hover:bg-blue-100 hover:text-primary text-xs font-bold rounded-xl border-blue-100"
          >
            {isScanning ? 'Inspect Log' : 'Camera Mode'}
          </Button>
        </CardContent>
      </Card>

      {isScanning ? (
        /* Camera Scanner View Simulation */
        <Card className="bg-white rounded-3xl text-slate-900 shadow-lg border-2 border-blue-100 relative overflow-hidden">
          <CardContent className="p-6 space-y-5">
            <div className="relative mx-auto w-full max-w-sm rounded-3xl overflow-hidden shadow-inner bg-slate-50">
              <div id="reader" className="w-full h-full min-h-[300px]"></div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-600 font-medium text-center">Select a container below to view depot refill history & delivery status:</p>

              <div className="grid grid-cols-2 gap-2">
                {bottles.map((b) => (
                  <Button
                    key={b.id}
                    variant="outline"
                    onClick={() => handleSimulateScan(b)}
                    className="h-auto p-3 bg-slate-50 hover:bg-blue-50 border-slate-200 hover:border-blue-200 rounded-2xl flex flex-col items-start justify-start text-left text-xs transition-colors"
                  >
                    <span className="font-extrabold text-primary block">{b.id}</span>
                    <span className="text-xs text-slate-500 block truncate w-full text-left font-normal">{b.type}</span>
                    <span className="text-xs font-bold text-emerald-600 block mt-1">
                      Refill Cycle #{b.refillCount}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Scanned Container Details & Depot Refill Log */
        scannedBottle && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
            {/* Verification Status Card */}
            <Card className="bg-blue-50 border-2 border-blue-200 rounded-3xl shadow-none">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary text-white rounded-2xl">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase text-primary tracking-wider block">Container QR Asset Verified</span>
                      <h2 className="text-base font-extrabold text-slate-900">{scannedBottle.qrCode}</h2>
                    </div>
                  </div>

                  <Badge className="bg-blue-100 hover:bg-blue-100 text-primary text-xs font-extrabold rounded-full border-none">
                    Depot Verified
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
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

            {/* Depot Refill Cycle Stats */}
            <Card className="rounded-3xl border-blue-50 shadow-sm">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Factory className="w-5 h-5 text-primary" />
                    <h3 className="text-sm font-bold uppercase text-slate-800 tracking-wider">Depot Refill Cycle Counter</h3>
                  </div>
                  <Badge variant="outline" className="text-sm font-black text-primary bg-blue-50 rounded-full border-blue-100">
                    {scannedBottle.refillCount} Cycles
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  This container is tracked by certified depot stations to record every sanitization, refilling, and delivery dispatch event.
                </p>

                {/* Delivery & Depot History Timeline */}
                <div className="space-y-3 pt-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-slate-500" />
                    Container Lifecycle History
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>Out for Delivery Handoff</span>
                          <span className="text-xs text-slate-400 font-normal">Today, 08:30 AM</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Scanned onto delivery truck for East Legon route.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>Refilled & Factory Sealed</span>
                          <span className="text-xs text-slate-400 font-normal">Yesterday, 04:15 PM</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Quality inspection passed at Achimota Depot #1.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>Sanitizing & Washing Cycle</span>
                          <span className="text-xs text-slate-400 font-normal">Yesterday, 02:00 PM</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Multi-stage hygienic wash complete.</p>
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
          </div>
        )
      )}
    </div>
  );
};
