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
    <div className="absolute inset-0 flex flex-col justify-center items-center p-6 bg-[#277df1]">
      <Card className="w-full max-w-sm shadow-xl bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex justify-center mb-2">
            <img src="/nsupa_blue.svg" alt="Nsupa Logo" className="w-20 h-20 drop-shadow-md" />
          </div>
          <CardTitle className="text-2xl font-extrabold text-white">Nsupa Auth</CardTitle>
          <CardDescription className="text-white/80">Select a role to simulate login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full h-14 flex items-center justify-start gap-4 rounded-2xl px-6 bg-white text-[#277df1] hover:bg-white/90 border-transparent" 
            variant="outline"
            onClick={() => onAuthSuccess('customer')}
          >
            <UserCheck className="w-5 h-5" />
            <span className="font-semibold text-base">Login as Customer</span>
          </Button>

          <Button 
            className="w-full h-14 flex items-center justify-start gap-4 rounded-2xl px-6 bg-white/20 text-white hover:bg-white/30 border-transparent" 
            variant="outline"
            onClick={() => onAuthSuccess('driver')}
          >
            <Truck className="w-5 h-5" />
            <span className="font-semibold text-base">Login as Driver</span>
          </Button>

          <Button 
            className="w-full h-14 flex items-center justify-start gap-4 rounded-2xl px-6 bg-transparent border-white/40 text-white hover:bg-white/10" 
            variant="outline"
            onClick={() => onAuthSuccess('depot')}
          >
            <Building2 className="w-5 h-5" />
            <span className="font-semibold text-base">Login as Depot</span>
          </Button>

          <Button 
            className="w-full h-14 flex items-center justify-start gap-4 rounded-2xl px-6 bg-transparent text-white/80 hover:text-white hover:bg-white/10 border-transparent" 
            variant="outline"
            onClick={() => onAuthSuccess('admin')}
          >
            <Shield className="w-5 h-5" />
            <span className="font-semibold text-base">Login as Admin</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
