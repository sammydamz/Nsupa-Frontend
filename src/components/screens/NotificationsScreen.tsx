import React from 'react';
import { Bell, Sparkles, Truck, Wallet, Tag, ArrowRight } from 'lucide-react';
import { NotificationItem, CustomerScreenId } from '../../types';
import { Card, CardContent } from '@/components/ui/card';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  onMarkRead: (id: string) => void;
  onNavigate: (screen: CustomerScreenId) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onMarkRead,
  onNavigate,
}) => {
  return (
    <div className="space-y-5 pb-24">
      {/* Title */}
      <Card className="rounded-2xl border-blue-50 shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-blue-50 text-primary rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 leading-tight">Notifications & Alerts</h1>
              <p className="text-sm text-slate-500">Order Updates & AI Reminders</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2.5">
        {notifications.map((notif) => (
          <Card
            key={notif.id}
            onClick={() => {
              onMarkRead(notif.id);
              if (notif.actionScreen) onNavigate(notif.actionScreen);
            }}
            className={`rounded-2xl transition-all cursor-pointer shadow-none ${
              notif.read ? 'bg-white border-blue-50' : 'bg-blue-50/90 border-primary/40 ring-2 ring-blue-100'
            }`}
          >
            <CardContent className="p-4 text-left">
              <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                <h3 className="text-sm font-bold text-slate-900">{notif.title}</h3>
                <span className="text-xs text-slate-400 shrink-0">{notif.timestamp}</span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-2">{notif.message}</p>

              {notif.actionScreen && (
                <span className="text-xs font-bold text-primary inline-flex items-center gap-1 hover:underline">
                  View Screen <ArrowRight className="w-3 h-3" />
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
