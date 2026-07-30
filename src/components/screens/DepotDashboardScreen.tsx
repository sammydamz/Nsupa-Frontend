import React, { useMemo } from 'react';
import { Building2, RefreshCw, ShieldCheck, Truck, CheckCircle2, Factory, Search, Timer } from 'lucide-react';
import { Bottle } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DashboardHeader, MetricCard } from '../shared';

interface DepotDashboardScreenProps {
  bottles: Bottle[];
}

const statusBadge = (bottle: Bottle) => {
  switch (bottle.status) {
    case 'at_depot_cleaning':
      return <Badge className="bg-amber-100 text-amber-800 border-none text-sm font-bold rounded-full">Cleaning</Badge>;
    case 'at_depot_refilling':
      return <Badge className="bg-blue-100 text-primary border-none text-sm font-bold rounded-full">Refilling</Badge>;
    case 'ready_for_dispatch':
      return <Badge className="bg-emerald-100 text-emerald-800 border-none text-sm font-bold rounded-full">Ready</Badge>;
    default:
      return <Badge variant="outline" className="text-sm font-bold rounded-full">{bottle.status.replace(/_/g, ' ')}</Badge>;
  }
};

export const DepotDashboardScreen: React.FC<DepotDashboardScreenProps> = ({ bottles }) => {
  const [activeTab, setActiveTab] = React.useState<'inventory' | 'cleaning' | 'refill' | 'dispatch'>('inventory');

  const cleaningBottles = useMemo(() => bottles.filter(b => b.status === 'at_depot_cleaning'), [bottles]);
  const refillBottles = useMemo(() => bottles.filter(b => b.status === 'at_depot_refilling'), [bottles]);
  const dispatchBottles = useMemo(() => bottles.filter(b => b.status === 'ready_for_dispatch'), [bottles]);
  const inventoryBottles = useMemo(() => bottles.filter(b => ['at_depot_cleaning', 'at_depot_refilling', 'ready_for_dispatch'].includes(b.status)), [bottles]);

  const tabs = [
    { id: 'inventory' as const, label: 'Depot Inventory', count: inventoryBottles.length },
    { id: 'cleaning' as const, label: 'Cleaning Queue', count: cleaningBottles.length },
    { id: 'refill' as const, label: 'Refill Station', count: refillBottles.length },
    { id: 'dispatch' as const, label: 'Ready for Dispatch', count: dispatchBottles.length },
  ];

  const renderBottleList = (items: Bottle[], emptyMessage: string) => {
    if (items.length === 0) {
      return (
        <div className="text-center py-8 text-slate-400">
          <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm font-medium">{emptyMessage}</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {items.map((b) => (
          <div key={b.id} className="p-3 bg-white rounded-xl border border-blue-50 shadow-sm flex items-center justify-between flex-wrap gap-2 hover:border-blue-100 transition-colors">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                b.status === 'at_depot_cleaning' ? 'bg-amber-100 text-amber-700' :
                b.status === 'at_depot_refilling' ? 'bg-blue-100 text-primary' :
                'bg-emerald-100 text-emerald-700'
              }`}>
                {b.status === 'at_depot_cleaning' ? <ShieldCheck className="w-4 h-4" /> :
                 b.status === 'at_depot_refilling' ? <Factory className="w-4 h-4" /> :
                 <Truck className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <span className="font-bold text-slate-900 block text-sm truncate">{b.id}</span>
                <span className="text-xs text-slate-500 block truncate">{b.type} • Batch: {b.batchNumber}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-slate-400 whitespace-nowrap">{b.refillCount} cycles</span>
              {statusBadge(b)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Title */}
      <DashboardHeader 
        title="Achimota Certified Depot #1"
        subtitle="Ghana Bottling & Sanitization Station"
        icon={Building2}
        badgeText="Depot Active"
      />

      {/* Depot Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricCard 
          title="Clean Inventory"
          value={inventoryBottles.length + 470}
          valueClassName="text-primary"
          subtitle="ready for dispatch"
        />
        <MetricCard 
          title="Sanitizing Queue"
          value={cleaningBottles.length}
          valueClassName="text-amber-600"
          subtitle="awaiting cleaning"
        />
        <MetricCard 
          title="Refilling Station"
          value={refillBottles.length}
          valueClassName="text-primary"
          subtitle="being filled"
        />
        <MetricCard 
          title="Dispatched Today"
          value={dispatchBottles.length + 208}
          valueClassName="text-emerald-600"
          subtitle="units sent out"
        />
      </div>

      {/* Depot Stage Tabs */}
      <div className="bg-slate-100 p-1 rounded-2xl flex overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 h-auto py-2.5 px-3 rounded-xl transition-all whitespace-nowrap text-sm font-bold ${
              activeTab === tab.id
                ? 'bg-white hover:bg-white text-primary shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200'
            }`}
          >
            {tab.label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === tab.id
                ? 'bg-primary/10 text-primary'
                : 'bg-slate-200 text-slate-500'
            }`}>
              {tab.count}
            </span>
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <Card className="rounded-3xl border-blue-50 shadow-sm">
        <CardContent className="p-5 space-y-4">
          {activeTab === 'inventory' && (
            <>
              <div className="flex items-center justify-between border-b border-blue-50 pb-3">
                <h2 className="text-sm font-bold uppercase text-slate-800 tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  All Depot Shells ({inventoryBottles.length})
                </h2>
              </div>
              {renderBottleList(inventoryBottles, 'No shells currently at depot')}
            </>
          )}

          {activeTab === 'cleaning' && (
            <>
              <div className="flex items-center justify-between border-b border-blue-50 pb-3">
                <h2 className="text-sm font-bold uppercase text-slate-800 tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  Sanitization Queue ({cleaningBottles.length})
                </h2>
                <span className="text-xs text-slate-400">Heat wash + UV sanitize</span>
              </div>
              {cleaningBottles.length > 0 && (
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 text-sm text-amber-800 mb-2">
                  <span className="font-bold">Protocol:</span> High-temp wash (85°C) → Food-grade sanitizer → UV dry — ~12 min per shell
                </div>
              )}
              {renderBottleList(cleaningBottles, 'Cleaning queue is empty — all shells are sanitized')}
            </>
          )}

          {activeTab === 'refill' && (
            <>
              <div className="flex items-center justify-between border-b border-blue-50 pb-3">
                <h2 className="text-sm font-bold uppercase text-slate-800 tracking-wider flex items-center gap-2">
                  <Factory className="w-4 h-4 text-primary" />
                  Refill Station ({refillBottles.length})
                </h2>
                <span className="text-xs text-slate-400">Food-grade liner + tamper ring</span>
              </div>
              {refillBottles.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 text-sm text-blue-800 mb-2">
                  <span className="font-bold">Process:</span> New liner inserted → Factory-sealed fill → Tamper ring attached → QR scan for tracking
                </div>
              )}
              {renderBottleList(refillBottles, 'No shells at the refill station')}
            </>
          )}

          {activeTab === 'dispatch' && (
            <>
              <div className="flex items-center justify-between border-b border-blue-50 pb-3">
                <h2 className="text-sm font-bold uppercase text-slate-800 tracking-wider flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  Ready for Dispatch ({dispatchBottles.length})
                </h2>
                <span className="text-xs text-slate-400">Assigned to rider route</span>
              </div>
              {renderBottleList(dispatchBottles, 'All shells dispatched — nothing waiting')}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
