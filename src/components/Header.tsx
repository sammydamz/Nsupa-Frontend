import React, { useState } from 'react';
import { Bell, Home, ShoppingBag, QrCode, Wallet, Calendar, Award, Leaf, User, LogOut, Menu, X } from 'lucide-react';
import { UserRole, ScreenId } from '../types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  role: UserRole;
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  unreadCount: number;
  onOpenAIPredictor: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  role,
  currentScreen,
  onNavigate,
  unreadCount,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const customerNavItems: { id: ScreenId; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'order', label: 'Order', icon: ShoppingBag },
    { id: 'subscription', label: 'Sub', icon: Calendar },
    { id: 'deposits', label: 'Rewards', icon: Award },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'impact', label: 'Impact', icon: Leaf },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => onNavigate(role === 'customer' ? 'home' : `${role}_dashboard` as ScreenId)}
          className="flex items-center gap-3 group text-left shrink-0 focus:outline-none"
        >
          <img 
            src="/nsupa-raw.svg" 
            alt="Nsupa Logo" 
            className="w-10 h-10 object-contain group-hover:scale-105 transition-transform drop-shadow-sm" 
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight leading-none text-foreground">Nsupa</span>
              <Badge variant="secondary" className="px-1.5 py-0 text-[10px] rounded-full h-5 capitalize">{role}</Badge>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium leading-none block mt-0.5">Circular Water Ghana</span>
          </div>
        </button>

        {/* Desktop Navigation Links for Customer */}
        {role === 'customer' && (
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
          {/* Mobile Menu Toggle */}
          {role === 'customer' && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden relative h-10 w-10 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                title="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>

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
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="relative h-10 w-10 rounded-full hover:bg-destructive hover:text-destructive-foreground text-muted-foreground transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && role === 'customer' && (
        <div className="md:hidden border-t border-blue-50 bg-white shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-4 gap-2">
            {customerNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex flex-col items-center justify-center gap-1 p-2 rounded-2xl transition-all min-h-[80px] ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-semibold leading-tight text-center">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
