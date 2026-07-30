import React from 'react';
import { Bottle } from '../../types';
import { BottleDiagram } from '../BottleDiagram';
import { ShieldCheck, RefreshCw, QrCode, CheckCircle2, History, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BottleDetailsScreenProps {
  bottle: Bottle;
}

export const BottleDetailsScreen: React.FC<BottleDetailsScreenProps> = ({ bottle }) => {
  return (
    <div className="space-y-5 pb-24">
      {/* Title */}
      <Card className="rounded-2xl border-sky-100 shadow-sm">
        <CardContent className="p-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-sky-100 text-sky-700 rounded-xl">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 leading-tight">Bottle Lifecycle Details</h1>
              <p className="text-sm text-slate-500">Serial ID: {bottle.id}</p>
            </div>
          </div>
          <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-100 border-none font-bold rounded-full text-sm">
            Refill Cycle #{bottle.refillCount}
          </Badge>
        </CardContent>
      </Card>

      {/* Interactive Diagram Component */}
      <BottleDiagram interactiveState={bottle.linerState} />

      {/* Specification Details Table */}
      <Card className="rounded-2xl border-sky-100 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-sm font-bold uppercase text-slate-800 tracking-wider border-b border-sky-100 pb-2">
            Technical Specifications & Traceability
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex flex-wrap justify-between py-1 border-b border-slate-100 gap-1">
              <span className="text-xs text-slate-500">QR Code Unique ID:</span>
              <span className="font-bold text-slate-900">{bottle.qrCode}</span>
            </div>

            <div className="flex flex-wrap justify-between py-1 border-b border-slate-100 gap-1">
              <span className="text-xs text-slate-500">Format & Capacity:</span>
              <span className="font-bold text-slate-900">{bottle.type} ({bottle.sizeLitres} Litres)</span>
            </div>

            <div className="flex flex-wrap justify-between py-1 border-b border-slate-100 gap-1">
              <span className="text-xs text-slate-500">Certified Depot Origin:</span>
              <span className="font-bold text-sky-700 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                {bottle.depotLocation}
              </span>
            </div>

            <div className="flex flex-wrap justify-between py-1 border-b border-slate-100 gap-1">
              <span className="text-xs text-slate-500">Batch Code:</span>
              <span className="font-bold text-slate-900">{bottle.batchNumber}</span>
            </div>

            <div className="flex flex-wrap justify-between py-1 border-b border-slate-100 gap-1">
              <span className="text-xs text-slate-500">Last Refill Date:</span>
              <span className="font-bold text-slate-900">{bottle.lastRefilledAt}</span>
            </div>

            <div className="flex flex-wrap justify-between py-1 gap-1">
              <span className="text-xs text-slate-500">Held Deposit Value:</span>
              <span className="font-extrabold text-emerald-700">GHS {bottle.depositAmountGHS.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
