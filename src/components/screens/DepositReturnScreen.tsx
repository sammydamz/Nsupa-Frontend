import React, { useState } from 'react';
import { RotateCcw, QrCode, ArrowRight, CheckCircle2, ShieldCheck, Layers, RefreshCw, Info } from 'lucide-react';
import { CustomerScreenId, Bottle } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DepositReturnScreenProps {
  bottles: Bottle[];
  depositBalanceGHS: number;
  onRequestReturnPickup: (bottleId: string) => void;
  onNavigate: (screen: CustomerScreenId) => void;
}

export const DepositReturnScreen: React.FC<DepositReturnScreenProps> = ({
  bottles,
  onRequestReturnPickup,
  onNavigate,
}) => {
  const [requestedId, setRequestedId] = useState<string | null>(null);

  const handleRequest = (id: string) => {
    setRequestedId(id);
    onRequestReturnPickup(id);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Header */}
      <Card className="rounded-3xl border-blue-50 shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-primary rounded-2xl flex items-center justify-center font-bold">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 leading-tight">1:1 Container Swap & Restock Hub</h1>
              <p className="text-xs text-slate-500">Ghana Reusable Container Exchange System</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visual Flowchart Card - Replicating the exact Diagram */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl text-white shadow-lg border border-slate-700/60">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Zero Cash Deposit Holding Logic
              </span>
            </div>
            <Badge variant="outline" className="bg-blue-900/80 text-blue-200 border-blue-500/30 rounded-full font-mono text-[10px]">
              Ghana Standard
            </Badge>
          </div>

          {/* Flowchart Diagram UI */}
          <div className="space-y-3 pt-1">
            {/* Top Box */}
            <div className="bg-stone-100 text-stone-900 p-3 rounded-2xl text-center shadow-md max-w-xs mx-auto border border-stone-300">
              <span className="text-xs font-black block">Point of restock</span>
              <span className="text-[10px] text-stone-600 font-medium block">hawker, office, or home</span>
            </div>

            {/* Connectors */}
            <div className="flex justify-around text-slate-400 text-xs py-0.5">
              <span>↙</span>
              <span>↘</span>
            </div>

            {/* Two Branches */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Green Branch */}
              <div className="bg-emerald-950/80 border border-emerald-500/50 p-3 rounded-2xl text-emerald-100 space-y-1">
                <span className="font-extrabold text-emerald-300 block text-xs">Brings back empty shell</span>
                <p className="text-[10px] text-emerald-200 leading-tight">
                  Pays content price only e.g. <strong className="text-white">GH₵15</strong>, same as today
                </p>
              </div>

              {/* Gold Branch */}
              <div className="bg-amber-950/80 border border-amber-500/50 p-3 rounded-2xl text-amber-100 space-y-1">
                <span className="font-extrabold text-amber-300 block text-xs">No empty shell to trade</span>
                <p className="text-[10px] text-amber-200 leading-tight">
                  Pays content + shell surcharge e.g. <strong className="text-white">GH₵15 + GH₵10</strong>
                </p>
              </div>
            </div>

            {/* Bottom Purple Box */}
            <div className="bg-indigo-950/90 border border-indigo-400/50 p-3.5 rounded-2xl text-indigo-100 text-center space-y-1 shadow-md">
              <span className="text-xs font-extrabold text-indigo-200 block">
                Driver scans empty out, scans full in — seamless exchange
              </span>
              <p className="text-[10px] text-indigo-300 leading-snug">
                Simple, transparent container swap model designed for households, offices, and schools across Ghana
              </p>
            </div>

            {/* Footer Explanation */}
            <p className="text-[11px] text-slate-300 leading-relaxed italic bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80 text-center">
              "No complex deposit holding; returning an empty container guarantees instant water refills at the lowest water content price."
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Customer's Reusable Shell Inventory */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase text-slate-800 tracking-wider">Your Reusable Containers</h2>
          <span className="text-[11px] text-slate-500 font-medium">{bottles.length} Containers at your location</span>
        </div>

        <div className="space-y-3">
          {bottles.map((bottle) => (
            <Card key={bottle.id} className="rounded-3xl border-blue-50 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">{bottle.id}</span>
                    <span className="text-[11px] text-slate-500 block">{bottle.type} ({bottle.sizeLitres}L)</span>
                  </div>

                  <Badge variant="outline" className={`border-none px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    bottle.linerState === 'empty_ready_return'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {bottle.linerState === 'empty_ready_return' ? 'Ready for 1:1 Swap' : 'In Active Use'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Container Status</span>
                    <span className="font-bold text-slate-800 capitalize">{bottle.linerState.replace(/_/g, ' ')}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">Refill Trade Value</span>
                    <span className="font-extrabold text-emerald-700">GH₵ 15.00 Content Price</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    variant="outline"
                    onClick={() => onNavigate('qr_scanner')}
                    className="flex-1 h-10 bg-blue-50 text-primary font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 hover:bg-blue-100 hover:text-primary border border-blue-100"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Scan QR Code</span>
                  </Button>

                  <Button
                    onClick={() => onNavigate('order')}
                    className="flex-1 h-10 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Order Refill & Swap</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
