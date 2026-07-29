import React, { useState } from 'react';
import { Phone, Lock, User, ArrowRight, ShieldCheck, KeyRound, CheckCircle2, Fingerprint } from 'lucide-react';
import { CustomerScreenId } from '../../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AuthScreensProps {
  initialMode?: 'login' | 'signup' | 'otp';
  onAuthSuccess: () => void;
  onNavigate: (screen: CustomerScreenId) => void;
}

export const AuthScreens: React.FC<AuthScreensProps> = ({
  initialMode = 'login',
  onAuthSuccess,
  onNavigate,
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'otp'>(initialMode);
  const [phone, setPhone] = useState('0244123456');
  const [name, setName] = useState('Ama Mensah');
  const [region, setRegion] = useState('East Legon, Accra');
  const [otpCode, setOtpCode] = useState(['4', '8', '2', '1']);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === 'signup' || mode === 'login') {
        setMode('otp');
      } else {
        onAuthSuccess();
      }
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center p-6 bg-gradient-to-b from-sky-50 via-white to-sky-50 rounded-3xl">
      <div className="max-w-sm mx-auto w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-sky-100 text-sky-700 rounded-2xl mb-1 shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {mode === 'login' && 'Akwaaba! Welcome Back'}
            {mode === 'signup' && 'Create Nsupa Account'}
            {mode === 'otp' && 'Verify Phone Number'}
          </h2>
          <p className="text-xs text-slate-500">
            {mode === 'otp'
              ? `Enter 4-digit code sent via SMS to +233 ${phone}`
              : 'Join Ghana’s circular water movement'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 h-11 bg-slate-50 border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
                  placeholder="e.g. Ama Mensah"
                />
              </div>
            </div>
          )}

          {(mode === 'login' || mode === 'signup') && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ghana Phone Number (MoMo)</label>
                <div className="relative">
                  <div className="absolute left-3 top-3.5 flex items-center gap-1 border-r border-slate-300 pr-2 text-xs font-bold text-slate-600">
                    <span>🇬🇭</span>
                    <span>+233</span>
                  </div>
                  <Input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-24 pr-3 h-11 bg-slate-50 border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                    placeholder="24 123 4567"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Area / Region</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 h-11 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="East Legon, Accra">East Legon, Accra</option>
                    <option value="Accra Central / Osu">Accra Central / Osu</option>
                    <option value="Achimota / Dome">Achimota / Dome</option>
                    <option value="Tema Community 1-12">Tema Community 1-12</option>
                    <option value="Kumasi Central">Kumasi Central</option>
                    <option value="KNUST Campus">KNUST Campus, Kumasi</option>
                  </select>
                </div>
              )}
            </>
          )}

          {mode === 'otp' && (
            <div className="space-y-3">
              <div className="flex justify-center gap-3">
                {otpCode.map((digit, idx) => (
                  <Input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newArr = [...otpCode];
                      newArr[idx] = e.target.value;
                      setOtpCode(newArr);
                    }}
                    className="w-12 h-12 text-center text-lg font-extrabold text-sky-800 bg-sky-50 border-2 border-sky-300 rounded-2xl"
                  />
                ))}
              </div>

              <div className="text-center text-xs text-slate-500">
                Didn't receive code?{' '}
                <Button variant="link" type="button" className="text-sky-600 font-bold p-0 h-auto">
                  Resend OTP
                </Button>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md disabled:opacity-70"
          >
            {loading ? (
              <span>Verifying...</span>
            ) : (
              <>
                <span>
                  {mode === 'login' && 'Request OTP Code'}
                  {mode === 'signup' && 'Create Account & Continue'}
                  {mode === 'otp' && 'Verify & Enter Nsupa App'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        {/* Biometric Login option */}
        {mode === 'login' && (
          <Button
            type="button"
            variant="outline"
            onClick={onAuthSuccess}
            className="w-full h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl text-xs flex items-center justify-center gap-2 border-slate-200"
          >
            <Fingerprint className="w-4 h-4 text-sky-600" />
            <span>Login with Biometrics / Touch ID</span>
          </Button>
        )}

        {/* Toggle Mode */}
        <div className="text-center text-xs text-slate-500">
          {mode === 'login' ? (
            <p>
              New to Nsupa?{' '}
              <Button
                variant="link"
                type="button"
                onClick={() => setMode('signup')}
                className="text-sky-600 font-bold p-0 h-auto"
              >
                Sign Up Here
              </Button>
            </p>
          ) : mode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <Button
                variant="link"
                type="button"
                onClick={() => setMode('login')}
                className="text-sky-600 font-bold p-0 h-auto"
              >
                Login Here
              </Button>
            </p>
          ) : (
            <Button
              variant="link"
              type="button"
              onClick={() => setMode('login')}
              className="text-slate-500 hover:text-slate-800 text-xs p-0 h-auto underline"
            >
              Change Phone Number
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
