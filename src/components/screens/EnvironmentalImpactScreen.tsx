import React from 'react';
import { Leaf, Award, Share2, ShieldCheck, Sparkles, RefreshCw, CheckCircle2, TreePine } from 'lucide-react';
import { EnvironmentalStats } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EnvironmentalImpactScreenProps {
  stats: EnvironmentalStats;
}

export const EnvironmentalImpactScreen: React.FC<EnvironmentalImpactScreenProps> = ({ stats }) => {
  return (
    <div className="space-y-5 pb-24">
      {/* Title */}
      <Card className="rounded-2xl border-sky-100 shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 leading-tight">Environmental Impact</h1>
              <p className="text-xs text-slate-500">Your Plastic Reduction Record in Ghana</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hero Badge Card */}
      <Card className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 rounded-3xl text-white shadow-md border-none relative overflow-hidden">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <Badge className="bg-emerald-600/80 hover:bg-emerald-600/80 text-emerald-100 border-emerald-500/40 text-xs font-bold rounded-full gap-1.5 px-3 py-1">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              Nsupa Eco Guardian Level 3
            </Badge>

            <Button
              variant="ghost"
              onClick={() => alert("Impact badge copied to clipboard! Share on WhatsApp & X!")}
              className="h-8 bg-white/10 hover:bg-white/20 hover:text-white text-white rounded-xl text-xs font-semibold flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </Button>
          </div>

          <div>
            <span className="text-[10px] text-emerald-200 uppercase tracking-wider block font-medium">Single-Use Sachets Replaced</span>
            <div className="text-4xl font-black text-white mt-1">{stats.sachetsSaved.toLocaleString()} Sachets</div>
            <p className="text-xs text-emerald-100 mt-1">
              Equivalent to keeping {stats.plasticWasteKgSaved} kg of non-biodegradable rubber waste out of Accra stormwater drains and landfills!
            </p>
          </div>

          {/* Grid Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-2">
            <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-600/40">
              <span className="text-[10px] text-emerald-200 block">CO₂ Emissions Avoided</span>
              <span className="font-extrabold text-white text-base">{stats.co2PreventedKg} kg CO₂</span>
            </div>

            <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-600/40">
              <span className="text-[10px] text-emerald-200 block">Tree Equivalency</span>
              <span className="font-extrabold text-white text-base flex items-center gap-1.5"><TreePine className="w-4 h-4" /> {stats.treesEquivalent} Trees Planted</span>
            </div>

            <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-600/40">
              <span className="text-[10px] text-emerald-200 block">Purified Water Consumed</span>
              <span className="font-extrabold text-white text-base">{stats.litresDelivered} Litres</span>
            </div>

            <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-600/40">
              <span className="text-[10px] text-emerald-200 block">15L Reusable Shell Cycles</span>
              <span className="font-extrabold text-white text-base">{stats.reusableCyclesCompleted} Refills</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sustainable Circular Economy Model */}
      <Card className="rounded-2xl border-sky-100 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <h3 className="text-xs font-bold uppercase text-slate-800 tracking-wider">Why Reusable 15L Dispenser Shells Matter</h3>

          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Zero Microplastics Exposure</span>
                <p className="text-[11px] text-slate-500">Unlike thin sachets stored under direct Ghana sunlight, Nsupa shells protect drinking water in food-grade collapsing liners.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Local Green Jobs Created</span>
                <p className="text-[11px] text-slate-500">Supports depot washing technicians and electric delivery bike riders across Achimota, East Legon, and Kumasi.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
