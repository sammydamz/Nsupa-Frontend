import React, { useState } from 'react';
import { Building2, RefreshCw, ShieldCheck, Truck, AlertTriangle, CheckCircle2, BarChart3, Factory } from 'lucide-react';
import { Bottle } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DashboardHeader, MetricCard } from '../shared';

interface DepotDashboardScreenProps {
  bottles: Bottle[];
}

export const DepotDashboardScreen: React.FC<DepotDashboardScreenProps> = ({ bottles }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'cleaning' | 'refill' | 'dispatch'>('inventory');

  return (
    <div className="space-y-5 pb-24">
      {/* Title */}
      <DashboardHeader 
        title="Achimota Certified Depot #1"
        subtitle="Ghana Bottling & Sanitization Station"
        icon={Building2}
        badgeText="Depot Active"
      />

      {/* Depot Metrics Grid */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <MetricCard 
          title="Clean Inventory"
          value="480 Shells"
        />
        <MetricCard 
          title="Sanitizing Queue"
          value="34 Shells"
          valueClassName="text-amber-600"
        />
        <MetricCard 
          title="Refilling Station"
          value="85 Shells"
          valueClassName="text-sky-600"
        />
        <MetricCard 
          title="Dispatched Today"
          value="210 Units"
          valueClassName="text-emerald-600"
        />
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
