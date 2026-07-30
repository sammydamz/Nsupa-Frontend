import React from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { DashboardHeader, MetricCard } from '../shared';

export const AdminDashboardScreen: React.FC = () => {
  return (
    <div className="space-y-5 pb-24">
      {/* Title */}
      <DashboardHeader 
        title="Nsupa Platform Command Center"
        subtitle="National Water Distribution Oversight (Ghana)"
        icon={Shield}
        badgeText="Live Operational"
      />

      {/* High Level National Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-sm">
        <MetricCard 
          title="Total Active Users"
          value="14,280"
          subtitle={<span className="text-emerald-600">+18% this month</span>}
        />
        <MetricCard 
          title="15L Reusable Shells"
          value="28,500"
          valueClassName="text-sky-700"
          subtitle="Circulating in GH"
        />
        <MetricCard 
          title="Single-Use Sachets Replaced"
          value="855,000"
          valueClassName="text-emerald-600"
          subtitle={<span className="text-emerald-600">11.1 Tons plastic saved</span>}
        />
        <MetricCard 
          title="Monthly Revenue"
          value="GHS 342,000"
          subtitle="92% MoMo Payments"
        />
      </div>

      {/* AI Demand Forecasting Card */}
      <Card className="bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 text-white rounded-3xl shadow-lg border-sky-400/30">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 text-white rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-primary-foreground/80 uppercase tracking-wider">AI Regional Water Demand Forecast</h2>
              <p className="text-sm font-extrabold text-white">East Legon & KNUST Peak Weather Prediction</p>
            </div>
          </div>

          <p className="text-sm text-sky-100 leading-relaxed">
            Temperatures in Accra and Kumasi are forecasted to reach 34°C this Friday. Nsupa AI predicts a <strong>+42% surge in 15L dispenser shell refill requests</strong>.
          </p>

          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/15 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-xs text-primary-foreground/80 block">Recommended Pre-Fill (East Legon)</span>
              <span className="font-extrabold text-white text-sm">1,200 Shells</span>
            </div>

            <div>
              <span className="text-xs text-primary-foreground/80 block">Recommended Rider Dispatch</span>
              <span className="font-extrabold text-white text-sm">24 Electric Riders</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Depot Distribution Table */}
      <Card className="rounded-2xl border-sky-100 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-sm font-bold uppercase text-slate-800 tracking-wider border-b border-sky-100 pb-2">
            Regional Depot Stock & Delivery Efficiency
          </h2>

          <div className="space-y-2 text-sm">
            {[
              { region: 'East Legon & Spintex, Accra', activeShells: 8200, refillRate: '98.4%', riders: 18 },
              { region: 'Osu & Cantonments, Accra', activeShells: 6400, refillRate: '97.2%', riders: 14 },
              { region: 'KNUST & Kumasi Central', activeShells: 5800, refillRate: '99.1%', riders: 12 },
              { region: 'Tema Community 1-12', activeShells: 4100, refillRate: '96.5%', riders: 9 },
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-slate-900 block">{item.region}</span>
                  <span className="text-xs text-slate-500 block">{item.riders} Active Riders • {item.activeShells.toLocaleString()} 15L Shells</span>
                </div>

                <div className="text-right">
                  <span className="text-sm font-bold text-sky-700 block">{item.refillRate} On-Time</span>
                  <span className="text-xs text-emerald-600 font-semibold">Depot Stock Normal</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
