import React from 'react';
import { Droplet, Bell, Smartphone, Monitor, Shield, Truck, Building2, UserCheck, RefreshCw, Home, ShoppingBag, QrCode, Wallet, Calendar, Award, Leaf, User } from 'lucide-react';
import { UserRole, ScreenId } from '../types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  unreadCount: number;
  isMobileView: boolean;
  onToggleMobileView: () => void;
  onOpenAIPredictor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  role,
  onRoleChange,
  currentScreen,
  onNavigate,
  unreadCount,
  isMobileView,
  onToggleMobileView,
}) => {
  const customerNavItems: { id: ScreenId; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'order', label: 'Order', icon: ShoppingBag },
    { id: 'subscription', label: 'Sub', icon: Calendar },
    { id: 'deposits', label: 'Rewards', icon: Award },
    { id: 'qr_scanner', label: 'Scan', icon: QrCode },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'impact', label: 'Impact', icon: Leaf },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b shadow-sm">
      {/* Top Demo Bar for Role Switching & Screen Jumping */}
      <div className="bg-slate-900 text-white px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300">Active Role:</span>
          <span className="font-bold capitalize text-primary">{role}</span>
        </div>

        {/* Role Toggle Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5">
          <Button
            variant={role === 'customer' ? 'default' : 'secondary'}
            size="sm"
            onClick={() => onRoleChange('customer')}
            className={`h-7 px-3 text-[11px] font-semibold transition-all flex items-center gap-1.5 rounded-full ${role !== 'customer' && 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
          >
            <UserCheck className="w-3 h-3" />
            Customer
          </Button>

          <Button
            variant={role === 'driver' ? 'default' : 'secondary'}
            size="sm"
            onClick={() => onRoleChange('driver')}
            className={`h-7 px-3 text-[11px] font-semibold transition-all flex items-center gap-1.5 rounded-full ${role !== 'driver' && 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
          >
            <Truck className="w-3 h-3" />
            Driver
          </Button>

          <Button
            variant={role === 'depot' ? 'default' : 'secondary'}
            size="sm"
            onClick={() => onRoleChange('depot')}
            className={`h-7 px-3 text-[11px] font-semibold transition-all flex items-center gap-1.5 rounded-full ${role !== 'depot' && 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
          >
            <Building2 className="w-3 h-3" />
            Depot
          </Button>

          <Button
            variant={role === 'admin' ? 'default' : 'secondary'}
            size="sm"
            onClick={() => onRoleChange('admin')}
            className={`h-7 px-3 text-[11px] font-semibold transition-all flex items-center gap-1.5 rounded-full ${role !== 'admin' && 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
          >
            <Shield className="w-3 h-3" />
            Admin
          </Button>
        </div>

        {/* Mobile View Frame Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMobileView}
            className="h-7 flex items-center gap-1.5 px-3 rounded-full text-slate-300 hover:text-white hover:bg-slate-700 text-[11px] font-semibold transition-colors"
            title="Toggle View Mode"
          >
            {isMobileView ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-primary" />
                <span className="hidden sm:inline">Desktop View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-primary" />
                <span className="hidden sm:inline">Phone Frame</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main App Bar Header */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => onNavigate(role === 'customer' ? 'home' : `${role}_dashboard` as ScreenId)}
          className="flex items-center gap-3 group text-left shrink-0 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm group-hover:scale-105 transition-transform">
            <div className="relative">
              <Droplet className="w-5 h-5 fill-current" />
              <RefreshCw className="w-3 h-3 text-white absolute -bottom-1 -right-1 stroke-[3]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight leading-none text-foreground">Nsupa</span>
              <Badge variant="secondary" className="px-1.5 py-0 text-[10px] rounded-full h-5">GH</Badge>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium leading-none block mt-0.5">Circular Water Ghana</span>
          </div>
        </button>

        {/* Desktop Navigation Links for Customer */}
        {role === 'customer' && !isMobileView && (
          <nav className="hidden md:flex items-center gap-1 bg-secondary/50 p-1.5 rounded-full border border-border/50 overflow-x-auto shadow-sm">
            {customerNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 h-8 px-4 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive ? 'shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {role === 'customer' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('notifications')}
              className="relative h-10 w-10 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] border-2 border-background rounded-full shadow-sm">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};


