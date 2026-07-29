import React, { useState } from 'react';
import { X, Sparkles, Droplet, Calendar, ShieldCheck, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { AIPredictionResult } from '../types';

interface AIPredictorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPlan: (plan: string) => void;
}

export const AIPredictorModal: React.FC<AIPredictorModalProps> = ({ isOpen, onClose, onApplyPlan }) => {
  const [householdSize, setHouseholdSize] = useState<number>(4);
  const [location, setLocation] = useState<string>('East Legon, Accra');
  const [currentBottles, setCurrentBottles] = useState<number>(2);
  const [usagePattern, setUsagePattern] = useState<string>('Standard drinking & cooking');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AIPredictionResult | null>(null);

  if (!isOpen) return null;

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          householdSize,
          location,
          currentBottles,
          usagePattern,
          role: 'customer',
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Failed to get prediction:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-sky-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0288D1] to-[#4FC3F7] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
              <Sparkles className="w-5 h-5 text-blue-100" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Nsupa AI Smart Refill Assist</h3>
              <p className="text-xs text-blue-100">Predict water depletion & optimize delivery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Input Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Household / Office Size</label>
                <select
                  value={householdSize}
                  onChange={(e) => setHouseholdSize(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value={1}>1 Person (Solo)</option>
                  <option value={2}>2 People (Couple)</option>
                  <option value={4}>4 People (Standard Household)</option>
                  <option value={6}>6 People (Large Family)</option>
                  <option value={12}>12+ People (Office / School)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bottles on Hand (15L)</label>
                <select
                  value={currentBottles}
                  onChange={(e) => setCurrentBottles(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value={1}>1 Bottle (15 Litres)</option>
                  <option value={2}>2 Bottles (30 Litres)</option>
                  <option value={4}>4 Bottles (60 Litres)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location / Region</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="e.g. East Legon, Accra"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Usage Type</label>
                <select
                  value={usagePattern}
                  onChange={(e) => setUsagePattern(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Drinking only">Drinking only</option>
                  <option value="Standard drinking & cooking">Drinking & Cooking</option>
                  <option value="Heavy usage (Hot Accra season)">Heavy Usage (Hot weather)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full py-3 bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-200 transition-all disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Calculating AI Consumption Model...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze Water Consumption & Run-Out Date
                </>
              )}
            </button>
          </div>

          {/* AI Result Card */}
          {result && (
            <div className="space-y-4 pt-3 border-t border-sky-100 animate-in fade-in duration-300">
              <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-900 uppercase tracking-wide">Predicted Run-Out</span>
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[11px] font-bold rounded-full">
                    {result.daysRemaining} Days Left
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-sky-100">
                    <span className="text-[10px] text-slate-500 block">Estimated Empty Date</span>
                    <span className="font-bold text-slate-800 text-sm flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      {result.predictedRunOutDate}
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-sky-100">
                    <span className="text-[10px] text-slate-500 block">Recommended Refill</span>
                    <span className="font-bold text-sky-700 text-sm flex items-center gap-1 mt-0.5">
                      <RefreshCw className="w-3.5 h-3.5 text-sky-600" />
                      {result.recommendedRefillDate}
                    </span>
                  </div>
                </div>

                {/* Eco impact */}
                <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                  <span className="font-medium">Monthly Sachet Waste Eliminated:</span>
                  <span className="font-extrabold text-emerald-700">~{result.sachetsSavedPerMonth} Sachets</span>
                </div>

                {/* AI Insights List */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-bold text-slate-800">AI Consumption Insights:</span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {result.insights.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Droplet className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Smart Tip */}
                {result.smartTip && (
                  <div className="p-2.5 bg-sky-100/70 text-sky-900 text-xs rounded-xl font-medium">
                    💡 <strong>Smart Tip:</strong> {result.smartTip}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onApplyPlan(result.suggestedPlan);
                    onClose();
                  }}
                  className="flex-1 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>Schedule Refill for {result.recommendedRefillDate}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
