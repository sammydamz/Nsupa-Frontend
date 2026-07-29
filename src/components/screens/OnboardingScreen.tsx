import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, RefreshCw, ShieldCheck, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    {
      title: 'Say Goodbye to Single-Use Sachet Rubbers',
      subtitle: 'Cleaner Streets, Pure Water',
      description: 'Nsupa replaces littered plastic sachets with high-grade reusable 15L dispenser shells and eco-pouches across Ghana.',
      icon: RefreshCw,
      color: 'from-sky-500 to-sky-600',
      badge: '100% Eco-Friendly',
      highlights: ['Replaces 30 single-use sachets per 15L bottle', 'Keeps Accra & Kumasi gutters clean', 'Filtered to WHO standards'],
    },
    {
      title: 'Factory-Sealed 15L Reusable Shells',
      subtitle: 'Tamper-Evident & Collapsing Liner',
      description: 'Our rigid transparent shells feature a collapsing inner liner and tamper ring. Water is untouched until you pour.',
      icon: ShieldCheck,
      color: 'from-sky-600 to-blue-700',
      badge: 'Anti-Contamination',
      highlights: ['Cannot be refilled manually outside depot', 'See-through liner status check', 'Easy-flow spigot tap included'],
    },
    {
      title: 'Fast MoMo Doorstep Delivery & Deposit Refunds',
      subtitle: 'Order on MTN MoMo, Track Live',
      description: 'Schedule recurring deliveries or quick refills. Return your empty shells to our drivers for instant deposit refunds!',
      icon: Truck,
      color: 'from-emerald-600 to-sky-600',
      badge: 'Ghana Mobile Money',
      highlights: ['Instant deposit refund to MoMo wallet', 'Live GPS driver tracking', 'AI Smart Refill Prediction'],
    }
  ];

  const stepData = steps[currentStep];
  const Icon = stepData.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-between p-6 bg-gradient-to-b from-sky-50 via-white to-sky-50 rounded-3xl">
      {/* Top Bar with Skip */}
      <div className="flex items-center justify-between">
        {currentStep > 0 ? (
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="text-slate-500 hover:text-slate-800 rounded-xl bg-white border-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        ) : (
          <div />
        )}

        <Button
          variant="ghost"
          onClick={onComplete}
          className="text-xs font-semibold text-slate-500 hover:text-sky-600 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 h-auto"
        >
          Skip
        </Button>
      </div>

      {/* Main Content Card */}
      <div className="my-auto py-6 space-y-6 text-center">
        {/* Step Visual Card */}
        <div className="relative mx-auto w-24 h-24 rounded-3xl bg-gradient-to-tr shadow-lg flex items-center justify-center text-white transition-all duration-300 transform scale-105">
          <div className={`absolute inset-0 rounded-3xl bg-gradient-to-tr ${stepData.color} opacity-90`} />
          <Icon className="w-12 h-12 relative z-10 text-white" />
          <Badge className="absolute -bottom-2 px-2.5 py-0.5 bg-white hover:bg-white text-sky-800 text-[10px] font-extrabold rounded-full border border-sky-200 shadow-sm">
            {stepData.badge}
          </Badge>
        </div>

        <div className="space-y-2 max-w-sm mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">{stepData.subtitle}</span>
          <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">{stepData.title}</h2>
          <p className="text-xs text-slate-600 leading-relaxed">{stepData.description}</p>
        </div>

        {/* Highlights List */}
        <Card className="rounded-2xl border-sky-100 max-w-xs mx-auto shadow-sm">
          <CardContent className="p-4 text-left space-y-2">
            {stepData.highlights.map((h, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Controls */}
      <div className="space-y-4 pt-4">
        {/* Step Progress Indicators */}
        <div className="flex justify-center items-center gap-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentStep ? 'w-8 bg-sky-600' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          className="w-full h-12 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md"
        >
          <span>{currentStep === steps.length - 1 ? 'Get Started with Nsupa' : 'Continue'}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
