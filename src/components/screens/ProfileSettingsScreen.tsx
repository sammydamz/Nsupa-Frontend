import React, { useState } from 'react';
import { User, MapPin, Phone, Globe, Shield, HelpCircle, LogOut, Moon, Check, Award, Bell } from 'lucide-react';
import { CustomerScreenId } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProfileSettingsScreenProps {
  userName: string;
  userPhone: string;
  userAddress: string;
  onLogout: () => void;
  onNavigate: (screen: CustomerScreenId) => void;
}

export const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = ({
  userName,
  userPhone,
  userAddress,
  onLogout,
  onNavigate,
}) => {
  const [language, setLanguage] = useState<'English' | 'Twi' | 'Ga'>('English');

  return (
    <div className="space-y-5 pb-24">
      {/* Title */}
      <Card className="rounded-3xl border-blue-50 shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-primary rounded-2xl flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 leading-tight">Profile & App Settings</h1>
              <p className="text-xs text-slate-500">Account Preferences & Support</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Info Card */}
      <Card className="rounded-3xl border-blue-50 shadow-sm">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-extrabold text-xl shadow-sm">
              {userName.charAt(0)}
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">{userName}</h2>
              <p className="text-xs text-slate-500">{userPhone}</p>
              <Badge className="text-[10px] text-primary bg-blue-50 hover:bg-blue-50 font-bold px-2.5 py-0.5 rounded-full border border-blue-100 mt-1">
                Verified Swap Account
              </Badge>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span className="font-medium">{userAddress}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Navigation Links */}
      <Card className="rounded-3xl border-blue-50 shadow-sm">
        <CardContent className="p-2 space-y-1 text-xs font-bold text-slate-800">
          <Button
            variant="ghost"
            onClick={() => onNavigate('deposits')}
            className="w-full sm:w-auto h-auto p-3 hover:bg-blue-50 rounded-2xl flex items-center justify-between text-left transition-colors font-bold text-slate-800"
          >
            <div className="flex items-center gap-3">
              <Award className="w-4 h-4 text-primary" />
              <span>Containers & Milestone Rewards</span>
            </div>
            <Badge className="text-[10px] bg-amber-100 hover:bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border-none">
              7/10 Swaps
            </Badge>
          </Button>

          <Button
            variant="ghost"
            onClick={() => onNavigate('notifications')}
            className="w-full sm:w-auto h-auto p-3 hover:bg-blue-50 rounded-2xl flex items-center justify-between text-left transition-colors font-bold text-slate-800"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-primary" />
              <span>Notifications & Alerts</span>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Language Selector */}
      <Card className="rounded-3xl border-blue-50 shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold uppercase text-slate-800 tracking-wider">App Language</h3>
          </div>

          <Select value={language} onValueChange={(val: 'English' | 'Twi' | 'Ga') => setLanguage(val)}>
            <SelectTrigger className="w-[120px] h-9 rounded-xl bg-white border-slate-200 text-xs font-bold shadow-sm focus:ring-primary focus:ring-offset-0">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200 shadow-lg">
              <SelectItem value="English" className="text-xs font-bold rounded-lg cursor-pointer">English</SelectItem>
              <SelectItem value="Twi" className="text-xs font-bold rounded-lg cursor-pointer">Twi</SelectItem>
              <SelectItem value="Ga" className="text-xs font-bold rounded-lg cursor-pointer">Ga</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Support & Logout */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
        <Button
          variant="outline"
          onClick={() => alert("Nsupa Ghana Customer Support Line: +233 30 200 9988\nWhatsApp Support: +233 24 000 1122")}
          className="w-full sm:w-auto h-12 px-6 bg-white rounded-2xl border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center gap-2 hover:bg-slate-50 shadow-sm"
        >
          <HelpCircle className="w-4 h-4 text-primary" />
          <span>Support & Help</span>
        </Button>

        <Button
          variant="outline"
          onClick={onLogout}
          className="w-full sm:w-auto h-12 px-6 bg-red-50 hover:bg-red-100 text-red-700 rounded-2xl border-red-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-none"
        >
          <LogOut className="w-4 h-4 text-red-600" />
          <span>Logout Account</span>
        </Button>
      </div>
    </div>
  );
};
