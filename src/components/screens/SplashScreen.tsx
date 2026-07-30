import React from 'react';
import { Droplet, RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-between p-6 text-center bg-gradient-to-b from-sky-50 via-white to-sky-100 rounded-3xl">
      <div className="w-full pt-8 flex flex-col items-center">
        {/* Animated Brand Water Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-sky-600 via-sky-500 to-sky-400 flex items-center justify-center text-white shadow-lg animate-pulse">
            <Droplet className="w-12 h-12 fill-white" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-2xl shadow-md border-2 border-white">
            <RefreshCw className="w-5 h-5 animate-spin-slow" />
          </div>
        </div>

        <Badge variant="outline" className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-800 hover:bg-sky-100 text-xs font-bold rounded-full mb-3 border-sky-200">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
          Circular Water Distribution Ghana
        </Badge>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Nsupa</h1>
        <p className="text-sm font-medium text-slate-600 max-w-xs mt-2">
          Pure drinking water in factory-sealed 15L reusable dispenser bottles & eco-pouches.
        </p>
      </div>

      {/* Visual illustration box */}
      <div className="my-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-100 shadow-sm w-full max-w-xs space-y-2 text-left">
        <div className="flex items-center gap-2 text-sm text-sky-900 font-bold">
          <span className="w-2 h-2 rounded-full bg-sky-500" />
          Zero Single-Use Sachets
        </div>
        <div className="flex items-center gap-2 text-sm text-sky-900 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Ghana Mobile Money Deposit Refunds
        </div>
        <div className="flex items-center gap-2 text-sm text-sky-900 font-bold">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          Doorstep Delivery & AI Refill Prediction
        </div>
      </div>

      <div className="w-full max-w-xs space-y-3 pb-4">
        <Button
          onClick={onStart}
          className="w-full sm:w-auto h-12 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </Button>

        <p className="text-xs text-slate-400">
          Empowering Accra, Kumasi & Tema with sustainable hydration.
        </p>
      </div>
    </div>
  );
};
