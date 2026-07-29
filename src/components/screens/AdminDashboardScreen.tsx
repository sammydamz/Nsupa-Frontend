import React from 'react';
import { Shield, Users, QrCode, BarChart3, TrendingUp, Sparkles, MapPin, DollarSign, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const AdminDashboardScreen: React.FC = () => {
  return (
    <div className="space-y-5 pb-24">
      {/* Title */}
      <Card className="bg-slate-900 text-white rounded-2xl shadow-md border-none">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold leading-tight">Nsupa Platform Command Center</h1>
              <p className="text-[11px] text-sky-300">National Water Distribution Oversight (Ghana)</p>
            </div>
          </div>

          <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white border-none text-xs font-bold rounded-full">
            Live Operational
          </Badge>
        </CardContent>
      </Card>

      {/* High Level National Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <Card className="rounded-2xl border-sky-100 shadow-sm">
          <CardContent className="p-3">
            <span className="text-[10px] text-slate-400 block">Total Active Users</span>
            <span className="text-lg font-black text-slate-900 block mt-0.5">14,280</span>
            <span className="text-[9px] text-emerald-600 font-bold">+18% this month</span>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-sky-100 shadow-sm">
          <CardContent className="p-3">
            <span className="text-[10px] text-slate-400 block">15L Reusable Shells</span>
            <span className="text-lg font-black text-sky-700 block mt-0.5">28,500</span>
            <span className="text-[9px] text-slate-500 font-medium">Circulating in GH</span>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-sky-100 shadow-sm">
          <CardContent className="p-3">
            <span className="text-[10px] text-slate-400 block">Single-Use Sachets Replaced</span>
            <span className="text-lg font-black text-emerald-600 block mt-0.5">855,000</span>
            <span className="text-[9px] text-emerald-600 font-bold">11.1 Tons plastic saved</span>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-sky-100 shadow-sm">
          <CardContent className="p-3">
            <span className="text-[10px] text-slate-400 block">Monthly Revenue</span>
            <span className="text-lg font-black text-slate-900 block mt-0.5">GHS 342,000</span>
            <span className="text-[9px] text-slate-500 font-medium">92% MoMo Payments</span>
          </CardContent>
        </Card>
      </div>

      {/* AI Demand Forecasting Card */}
      <Card className="bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 text-white rounded-3xl shadow-lg border-sky-400/30">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-500 text-white rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-sky-300 uppercase tracking-wider">AI Regional Water Demand Forecast</h2>
              <p className="text-xs font-extrabold text-white">East Legon & KNUST Peak Weather Prediction</p>
            </div>
          </div>

          <p className="text-xs text-sky-100 leading-relaxed">
            Temperatures in Accra and Kumasi are forecasted to reach 34°C this Friday. Nsupa AI predicts a <strong>+42% surge in 15L dispenser shell refill requests</strong>.
          </p>

          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/15 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-sky-300 block">Recommended Pre-Fill (East Legon)</span>
              <span className="font-extrabold text-white text-sm">1,200 Shells</span>
            </div>

            <div>
              <span className="text-[10px] text-sky-300 block">Recommended Driver Dispatch</span>
              <span className="font-extrabold text-white text-sm">24 Electric Riders</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Depot Distribution Table */}
      <Card className="rounded-2xl border-sky-100 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-xs font-bold uppercase text-slate-800 tracking-wider border-b border-sky-100 pb-2">
            Regional Depot Stock & Delivery Efficiency
          </h2>

          <div className="space-y-2 text-xs">
            {[
              { region: 'East Legon & Spintex, Accra', activeShells: 8200, refillRate: '98.4%', drivers: 18 },
              { region: 'Osu & Cantonments, Accra', activeShells: 6400, refillRate: '97.2%', drivers: 14 },
              { region: 'KNUST & Kumasi Central', activeShells: 5800, refillRate: '99.1%', drivers: 12 },
              { region: 'Tema Community 1-12', activeShells: 4100, refillRate: '96.5%', drivers: 9 },
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-slate-900 block">{item.region}</span>
                  <span className="text-[10px] text-slate-500 block">{item.drivers} Active Riders • {item.activeShells.toLocaleString()} 15L Shells</span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-sky-700 block">{item.refillRate} On-Time</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Depot Stock Normal</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
