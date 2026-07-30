import React from 'react';
import { Home, ShoppingBag, QrCode, Wallet, User } from 'lucide-react';
import { CustomerScreenId } from '../types';
import { Button } from '@/components/ui/button';

interface BottomNavProps {
  currentScreen: CustomerScreenId;
  onNavigate: (screen: CustomerScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: 'home' as CustomerScreenId, label: 'Home', icon: Home },
    { id: 'order' as CustomerScreenId, label: 'Orders', icon: ShoppingBag },
    { id: 'wallet' as CustomerScreenId, label: 'Wallet', icon: Wallet },
    { id: 'profile' as CustomerScreenId, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t px-3 py-2 shadow-lg max-w-md mx-auto md:hidden">
      <div className="flex items-center justify-around relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;



          return (
            <Button
              key={item.id}
              variant="ghost"
              size="icon"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col h-12 w-12 items-center justify-center rounded-xl transition-all ${
                isActive ? 'text-primary bg-primary/10 hover:bg-primary/20 hover:text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] leading-none">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};
