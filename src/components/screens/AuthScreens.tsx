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
    <div className="min-h-[80vh] flex flex-col justify-center items-center p-6 bg-gradient-to-b from-primary/5 via-white to-primary/5 rounded-3xl">
      <Card className="w-full max-w-sm shadow-xl border-primary/10">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto inline-flex p-3 bg-primary/10 text-primary rounded-2xl mb-1">
            <LogIn className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-extrabold text-slate-900">Nsupa Auth</CardTitle>
          <CardDescription>Select a role to simulate login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full h-14 flex items-center justify-start gap-4 rounded-2xl px-6" 
            variant="default" 
            onClick={() => onAuthSuccess('customer')}
          >
            <UserCheck className="w-5 h-5" />
            <span className="font-semibold text-base">Login as Customer</span>
          </Button>

          <Button 
            className="w-full h-14 flex items-center justify-start gap-4 rounded-2xl px-6" 
            variant="secondary"
            onClick={() => onAuthSuccess('driver')}
          >
            <Truck className="w-5 h-5" />
            <span className="font-semibold text-base">Login as Driver</span>
          </Button>

          <Button 
            className="w-full h-14 flex items-center justify-start gap-4 rounded-2xl px-6" 
            variant="outline"
            onClick={() => onAuthSuccess('depot')}
          >
            <Building2 className="w-5 h-5" />
            <span className="font-semibold text-base">Login as Depot</span>
          </Button>

          <Button 
            className="w-full h-14 flex items-center justify-start gap-4 rounded-2xl px-6" 
            variant="ghost"
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
