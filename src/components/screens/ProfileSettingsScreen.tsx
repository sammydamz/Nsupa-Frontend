import React, { useState } from 'react';
import { User, MapPin, Phone, Globe, Shield, HelpCircle, LogOut, Moon, Check, Award, Bell } from 'lucide-react';
import { CustomerScreenId } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
            <div className="w-10 h-10 bg-blue-50 text-[#0288D1] rounded-2xl flex items-center justify-center font-bold">
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
            <div className="w-14 h-14 rounded-2xl bg-[#0288D1] text-white flex items-center justify-center font-extrabold text-xl shadow-sm">
              {userName.charAt(0)}
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">{userName}</h2>
              <p className="text-xs text-slate-500">{userPhone}</p>
              <Badge className="text-[10px] text-[#0288D1] bg-blue-50 hover:bg-blue-50 font-bold px-2.5 py-0.5 rounded-full border border-blue-100 mt-1">
                Verified Swap Account
              </Badge>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-[#0288D1] shrink-0" />
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
            className="w-full h-auto p-3 hover:bg-blue-50 rounded-2xl flex items-center justify-between text-left transition-colors font-bold text-slate-800"
          >
            <div className="flex items-center gap-3">
              <Award className="w-4 h-4 text-[#0288D1]" />
              <span>Containers & Milestone Rewards</span>
            </div>
            <Badge className="text-[10px] bg-amber-100 hover:bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border-none">
              7/10 Swaps
            </Badge>
          </Button>

          <Button
            variant="ghost"
            onClick={() => onNavigate('notifications')}
            className="w-full h-auto p-3 hover:bg-blue-50 rounded-2xl flex items-center justify-between text-left transition-colors font-bold text-slate-800"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-[#0288D1]" />
              <span>Notifications & Alerts</span>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Language Selector */}
      <Card className="rounded-3xl border-blue-50 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#0288D1]" />
            <h3 className="text-xs font-bold uppercase text-slate-800 tracking-wider">App Language</h3>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            {(['English', 'Twi', 'Ga'] as const).map((lang) => (
              <Button
                key={lang}
                variant={language === lang ? "default" : "outline"}
                onClick={() => setLanguage(lang)}
                className={`h-10 rounded-2xl transition-all ${
                  language === lang ? 'bg-[#0288D1] hover:bg-[#0277BD] text-white border-[#0288D1]' : 'bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                {lang}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support & Logout */}
      <div className="space-y-2">
        <Button
          variant="outline"
          onClick={() => alert("Nsupa Ghana Customer Support Line: +233 30 200 9988\nWhatsApp Support: +233 24 000 1122")}
          className="w-full h-auto p-4 bg-white rounded-3xl border-blue-50 text-left text-xs font-bold text-slate-800 flex items-center justify-between hover:bg-blue-50 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="w-4 h-4 text-[#0288D1]" />
            <span>Nsupa Ghana Support & WhatsApp Line</span>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={onLogout}
          className="w-full h-auto p-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-3xl border-red-200 text-left text-xs font-bold flex items-center justify-between transition-colors shadow-none"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-4 h-4 text-red-600" />
            <span>Logout Account</span>
          </div>
        </Button>
      </div>
    </div>
  );
};
