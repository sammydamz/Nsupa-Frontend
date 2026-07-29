import React, { useState } from 'react';
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

  const handleSimulateScan = (bottle: Bottle) => {
    setIsScanning(false);
    setScannedBottle(bottle);
    if (onBottleScanned) onBottleScanned(bottle);
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
              <h1 className="text-base font-extrabold text-slate-900 leading-tight">Delivery & Refill Tracking Scanner</h1>
              <p className="text-xs text-slate-500">Scanned to log delivery handoffs & depot refill cycles</p>
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
        <Card className="bg-slate-900 rounded-3xl text-white text-center shadow-lg border-2 border-blue-400 relative overflow-hidden">
          <CardContent className="p-6 space-y-5">
            <div className="relative mx-auto w-64 h-64 border-2 border-[#4FC3F7] rounded-3xl flex items-center justify-center p-4">
              {/* Animated Scanning Laser Line */}
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#4FC3F7] to-transparent shadow-[0_0_15px_#38bdf8] animate-pulse" style={{ top: '45%' }} />

              {/* Corner Bracket Guides */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-[#4FC3F7] rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-[#4FC3F7] rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-[#4FC3F7] rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-[#4FC3F7] rounded-br-lg" />

              <div className="text-center space-y-2">
                <QrCode className="w-16 h-16 text-[#4FC3F7] mx-auto animate-pulse" />
                <p className="text-xs font-semibold text-blue-200">Align Container QR Code within frame</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-300">Select a container below to view depot refill history & delivery status:</p>

              <div className="grid grid-cols-2 gap-2">
                {bottles.map((b) => (
                  <Button
                    key={b.id}
                    variant="outline"
                    onClick={() => handleSimulateScan(b)}
                    className="h-auto p-3 bg-slate-800 hover:bg-slate-700 border-slate-700 rounded-2xl flex flex-col items-start justify-start text-left text-xs transition-colors"
                  >
                    <span className="font-extrabold text-[#4FC3F7] block">{b.id}</span>
                    <span className="text-[10px] text-slate-400 block truncate w-full text-left font-normal">{b.type}</span>
                    <span className="text-[10px] font-bold text-emerald-400 block mt-1">
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
                      <span className="text-[10px] font-bold uppercase text-primary tracking-wider block">Container QR Asset Verified</span>
                      <h2 className="text-base font-extrabold text-slate-900">{scannedBottle.qrCode}</h2>
                    </div>
                  </div>

                  <Badge className="bg-blue-100 hover:bg-blue-100 text-primary text-xs font-extrabold rounded-full border-none">
                    Depot Verified
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-white p-3 rounded-2xl border border-blue-100">
                    <span className="text-[10px] text-slate-500 block">Depot Location</span>
                    <span className="font-bold text-slate-800 truncate block">{scannedBottle.depotLocation}</span>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-blue-100">
                    <span className="text-[10px] text-slate-500 block">Refill Batch</span>
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
                    <h3 className="text-xs font-bold uppercase text-slate-800 tracking-wider">Depot Refill Cycle Counter</h3>
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
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-slate-500" />
                    Container Lifecycle History
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>Out for Delivery Handoff</span>
                          <span className="text-[10px] text-slate-400 font-normal">Today, 08:30 AM</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">Scanned onto delivery truck for East Legon route.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>Refilled & Factory Sealed</span>
                          <span className="text-[10px] text-slate-400 font-normal">Yesterday, 04:15 PM</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">Quality inspection passed at Achimota Depot #1.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>Sanitizing & Washing Cycle</span>
                          <span className="text-[10px] text-slate-400 font-normal">Yesterday, 02:00 PM</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">Multi-stage hygienic wash complete.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              onClick={() => setIsScanning(true)}
              className="w-full sm:w-auto h-12 bg-blue-50 text-primary hover:bg-blue-100 hover:text-primary font-bold rounded-2xl text-xs flex items-center justify-center gap-2 border-blue-100 transition-colors"
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
