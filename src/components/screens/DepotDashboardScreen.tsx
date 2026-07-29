import React, { useState } from 'react';
import { Building2, RefreshCw, ShieldCheck, Truck, AlertTriangle, CheckCircle2, BarChart3, Factory } from 'lucide-react';
import { Bottle } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DepotDashboardScreenProps {
  bottles: Bottle[];
}

export const DepotDashboardScreen: React.FC<DepotDashboardScreenProps> = ({ bottles }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'cleaning' | 'refill' | 'dispatch'>('inventory');

  return (
    <div className="space-y-5 pb-24">
      {/* Title */}
      <Card className="bg-slate-900 text-white rounded-2xl shadow-md border-none">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold leading-tight">Achimota Certified Depot #1</h1>
              <p className="text-[11px] text-sky-300">Ghana Bottling & Sanitization Station</p>
            </div>
          </div>

          <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white border-none text-xs font-bold rounded-full">
            Depot Active
          </Badge>
        </CardContent>
      </Card>

      {/* Depot Metrics Grid */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <Card className="rounded-2xl border-sky-100 shadow-sm">
          <CardContent className="p-2.5">
            <span className="text-[9px] text-slate-400 block">Clean Inventory</span>
            <span className="text-sm font-black text-slate-900 block mt-0.5">480 Shells</span>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-sky-100 shadow-sm">
          <CardContent className="p-2.5">
            <span className="text-[9px] text-slate-400 block">Sanitizing Queue</span>
            <span className="text-sm font-black text-amber-600 block mt-0.5">34 Shells</span>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-sky-100 shadow-sm">
          <CardContent className="p-2.5">
            <span className="text-[9px] text-slate-400 block">Refilling Station</span>
            <span className="text-sm font-black text-sky-600 block mt-0.5">85 Shells</span>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-sky-100 shadow-sm">
          <CardContent className="p-2.5">
            <span className="text-[9px] text-slate-400 block">Dispatched Today</span>
            <span className="text-sm font-black text-emerald-600 block mt-0.5">210 Units</span>
          </CardContent>
        </Card>
      </div>

      {/* Depot Stage Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-semibold overflow-x-auto">
        <Button
          variant="ghost"
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 h-auto py-2 px-3 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'inventory' ? 'bg-white hover:bg-white text-sky-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
          }`}
        >
          Depot Inventory
        </Button>

        <Button
          variant="ghost"
          onClick={() => setActiveTab('cleaning')}
          className={`flex-1 h-auto py-2 px-3 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'cleaning' ? 'bg-white hover:bg-white text-sky-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
          }`}
        >
          Cleaning Queue (34)
        </Button>

        <Button
          variant="ghost"
          onClick={() => setActiveTab('refill')}
          className={`flex-1 h-auto py-2 px-3 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'refill' ? 'bg-white hover:bg-white text-sky-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
          }`}
        >
          Refill Station
        </Button>
      </div>

      {/* Bottle Inspection Table */}
      <Card className="rounded-2xl border-sky-100 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-xs font-bold uppercase text-slate-800 tracking-wider border-b border-sky-100 pb-2">
            15L Shell Sanitization & Factory Sealing Log
          </h2>

          <div className="space-y-2 text-xs">
            {bottles.map((b) => (
              <div key={b.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-slate-900 block">{b.id} ({b.qrCode})</span>
                  <span className="text-[10px] text-slate-500 block">Batch: {b.batchNumber} • Refill Cycle #{b.refillCount}</span>
                </div>

                <div className="text-right flex flex-col items-end">
                  <Badge variant="outline" className="bg-sky-100 text-sky-800 border-none text-[10px] font-bold rounded-full mb-1 inline-flex">
                    {b.status.replace(/_/g, ' ')}
                  </Badge>
                  <span className="text-[10px] text-emerald-600 font-semibold block">Factory Ring Attached</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
