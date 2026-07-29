import React, { useState } from 'react';
import { QrCode, ShieldCheck, Droplet, RefreshCw, CheckCircle2, Info } from 'lucide-react';
import { BottleLinerState } from '../types';

interface BottleDiagramProps {
  interactiveState?: BottleLinerState;
  onStateChange?: (state: BottleLinerState) => void;
  showDetailsToggle?: boolean;
}

export const BottleDiagram: React.FC<BottleDiagramProps> = ({
  interactiveState = 'partially_used',
  onStateChange,
  showDetailsToggle = true,
}) => {
  const [activeState, setActiveState] = useState<BottleLinerState>(interactiveState);
  const [activeTab, setActiveTab] = useState<'mechanism' | 'stages'>('mechanism');

  const handleStateSelect = (state: BottleLinerState) => {
    setActiveState(state);
    if (onStateChange) onStateChange(state);
  };

  return (
    <div className="bg-white rounded-3xl border border-blue-50 shadow-sm overflow-hidden p-5 space-y-4">
      {/* Header Tabs */}
      <div className="flex items-center justify-between border-b border-blue-50 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-blue-50 text-[#0288D1] rounded-2xl">
            <Droplet className="w-5 h-5 fill-[#0288D1] text-[#0288D1]" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-800 leading-tight">15L Reusable Dispenser Bottle</h3>
            <p className="text-xs text-slate-500">Professionally Refilled & Hygienically Sealed</p>
          </div>
        </div>

        {showDetailsToggle && (
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveTab('mechanism')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'mechanism'
                  ? 'bg-white text-[#0288D1] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab('stages')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'stages'
                  ? 'bg-white text-[#0288D1] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Container Status
            </button>
          </div>
        )}
      </div>

      {activeTab === 'mechanism' ? (
        <div className="space-y-4">
          {/* Main Visual Representation of the Bottle */}
          <div className="relative bg-gradient-to-b from-[#F3FAFF] via-white to-[#F3FAFF] rounded-3xl p-5 border border-blue-100 flex flex-col items-center">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0288D1] text-white text-xs font-bold rounded-full shadow-xs mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Certified Depot Refilled
            </div>

            {/* Custom SVG Graphic of the rigid container */}
            <div className="w-full max-w-[260px] h-60 relative flex items-center justify-center my-1">
              <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md">
                <defs>
                  <linearGradient id="shellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity="0.95" />
                  </linearGradient>
                </defs>

                {/* Top Handle */}
                <path d="M 65 30 L 65 15 C 65 8, 135 8, 135 15 L 135 30 Z" fill="none" stroke="#0284C7" strokeWidth="4" />
                <rect x="75" y="10" width="50" height="12" rx="6" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />

                {/* Rigid Outer Shell */}
                <rect x="40" y="30" width="120" height="170" rx="14" fill="url(#shellGrad)" stroke="#0284C7" strokeWidth="3" />
                
                {/* Water Level based on active state */}
                {activeState === 'freshly_filled' && (
                  <rect x="46" y="36" width="108" height="158" rx="10" fill="url(#waterGrad)" opacity="0.85" />
                )}

                {activeState === 'partially_used' && (
                  <g>
                    <rect x="46" y="100" width="108" height="94" rx="8" fill="url(#waterGrad)" opacity="0.85" />
                    <text x="100" y="70" textAnchor="middle" fill="#0284C7" fontSize="10" fontWeight="bold">Partially Used</text>
                  </g>
                )}

                {activeState === 'empty_ready_return' && (
                  <g>
                    <rect x="46" y="180" width="108" height="14" rx="4" fill="#BAE6FD" opacity="0.7" stroke="#0284C7" strokeWidth="1" />
                    <text x="100" y="110" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="bold">Empty Container</text>
                    <text x="100" y="125" textAnchor="middle" fill="#0284C7" fontSize="9">Ready for Swap</text>
                  </g>
                )}

                {/* Front QR Code Sticker */}
                <rect x="72" y="70" width="56" height="40" rx="4" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
                <rect x="76" y="74" width="14" height="14" fill="#0F172A" />
                <rect x="110" y="74" width="10" height="10" fill="#0F172A" />
                <rect x="76" y="94" width="10" height="10" fill="#0F172A" />
                <rect x="94" y="80" width="12" height="12" fill="#0284C7" />
                <rect x="92" y="96" width="24" height="8" fill="#0F172A" />
                <text x="100" y="106" textAnchor="middle" fill="#0284C7" fontSize="5" fontWeight="bold">REUSABLE CONTAINER</text>

                {/* Bottom Tap / Cap */}
                <rect x="88" y="198" width="24" height="14" rx="2" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
                <circle cx="100" cy="205" r="3" fill="#0284C7" />
              </svg>

              {/* Callout Badges */}
              <div className="absolute right-0 top-6 bg-white/95 backdrop-blur-xs border border-blue-200 px-2.5 py-1 rounded-xl text-[10px] shadow-xs text-slate-700">
                <span className="font-bold text-[#0288D1]">1. Durable Container</span>
                <p className="text-[9px] text-slate-500 leading-tight">Your container to keep</p>
              </div>

              <div className="absolute right-0 top-24 bg-white/95 backdrop-blur-xs border border-blue-200 px-2.5 py-1 rounded-xl text-[10px] shadow-xs text-slate-700">
                <span className="font-bold text-[#0288D1]">2. Tracking QR</span>
                <p className="text-[9px] text-slate-500 leading-tight">Scanned at every swap</p>
              </div>

              <div className="absolute right-0 bottom-4 bg-white/95 backdrop-blur-xs border border-emerald-200 px-2.5 py-1 rounded-xl text-[10px] shadow-xs text-slate-700">
                <span className="font-bold text-emerald-700">3. Hygenic Seal</span>
                <p className="text-[9px] text-slate-500 leading-tight">Depot sanitised seal</p>
              </div>
            </div>

            {/* Explanatory Bullet Points */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-3 border-t border-blue-100 text-xs">
              <div className="flex items-start gap-2 bg-white p-3 rounded-2xl border border-blue-50">
                <ShieldCheck className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800">100% Certified Clean</span>
                  <p className="text-[11px] text-slate-500">Professionally washed and refilled at certified depots.</p>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white p-3 rounded-2xl border border-blue-50">
                <RefreshCw className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">15L = 30 Sachets</span>
                  <p className="text-[11px] text-slate-500">Replaces 1 full bag of single-use sachet rubber waste.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Stages View */
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Container status during use and swap:
          </p>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleStateSelect('freshly_filled')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                activeState === 'freshly_filled'
                  ? 'border-[#0288D1] bg-[#F3FAFF] ring-2 ring-blue-100'
                  : 'border-slate-200 bg-white hover:border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-extrabold text-blue-900">1. Fresh Full</span>
                {activeState === 'freshly_filled' && <CheckCircle2 className="w-3.5 h-3.5 text-[#0288D1]" />}
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">Freshly refilled & sealed water container.</p>
            </button>

            <button
              onClick={() => handleStateSelect('partially_used')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                activeState === 'partially_used'
                  ? 'border-[#0288D1] bg-[#F3FAFF] ring-2 ring-blue-100'
                  : 'border-slate-200 bg-white hover:border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-extrabold text-blue-900">2. In Active Use</span>
                {activeState === 'partially_used' && <CheckCircle2 className="w-3.5 h-3.5 text-[#0288D1]" />}
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">Dispensing pure water at home or office.</p>
            </button>

            <button
              onClick={() => handleStateSelect('empty_ready_return')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                activeState === 'empty_ready_return'
                  ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                  : 'border-slate-200 bg-white hover:border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-extrabold text-amber-900">3. Empty Swap</span>
                {activeState === 'empty_ready_return' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">Empty container ready to swap for a full one!</p>
            </button>
          </div>

          <div className="bg-[#F3FAFF] border border-blue-100 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs text-slate-800">
            <Info className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              When empty, hand container to driver or kiosk. Pay only the lower water refill price (e.g. GH₵ 15.00) and get a fresh full container.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

