import React from 'react';
import { UserRole } from '../../types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Shield, Truck, Building2, UserCheck, LogIn } from 'lucide-react';

interface AuthScreensProps {
  onAuthSuccess: (role: UserRole) => void;
}

export const AuthScreens: React.FC<AuthScreensProps> = ({
  onAuthSuccess,
}) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center p-6 bg-gradient-to-br from-primary to-primary/80 overflow-hidden">
      {/* Background ambient drop */}
      <div className="absolute right-[-100px] bottom-[-100px] opacity-10 pointer-events-none">
        <LogIn className="w-[400px] h-[400px] text-white" />
      </div>

      <Card className="w-full max-w-sm shadow-2xl shadow-primary/20 bg-white/10 backdrop-blur-xl border border-white/20 text-white relative z-10 rounded-[2rem]">
        <CardHeader className="text-center space-y-3 pb-6">
          <div className="mx-auto flex justify-center mb-1">
            <img src="/nsupa_blue.svg" alt="Nsupa Logo" className="w-20 h-20 drop-shadow-md object-contain" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-black tracking-tight text-white font-display">Nsupa GH</CardTitle>
            <CardDescription className="text-blue-100 font-medium text-xs uppercase tracking-widest px-2">
              A reusable alternative to single-use plastics
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <Button 
            className="w-full h-14 flex items-center justify-start gap-4 rounded-2xl px-6 bg-white text-primary hover:bg-blue-50 border-transparent shadow-sm hover:scale-[1.02] transition-transform" 
            variant="outline"
            onClick={() => onAuthSuccess('customer')}
          >
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <UserCheck className="w-4 h-4 text-primary" />
            </div>
            <span className="font-extrabold text-sm tracking-wide">Login as Customer</span>
          </Button>

          <Button 
            className="w-full h-14 flex items-center justify-start gap-4 rounded-2xl px-6 bg-white/10 text-white hover:bg-white/20 border-transparent shadow-sm hover:scale-[1.02] transition-transform" 
            variant="outline"
            onClick={() => onAuthSuccess('driver')}
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
              <Truck className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-wide">Login as Rider</span>
          </Button>

          <Button 
            className="w-full h-14 flex items-center justify-start gap-4 rounded-2xl px-6 bg-black/10 backdrop-blur-sm border border-white/10 text-white hover:bg-black/20 hover:scale-[1.02] transition-transform shadow-inner" 
            variant="outline"
            onClick={() => onAuthSuccess('depot')}
          >
            <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0 text-white">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-wide">Login as Depot</span>
          </Button>

          <div className="pt-2">
            <Button 
              className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl px-6 bg-transparent text-blue-200 hover:text-white hover:bg-white/5 border-transparent transition-colors" 
              variant="outline"
              onClick={() => onAuthSuccess('admin')}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="font-bold text-sm tracking-wider uppercase">Login as Admin</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
