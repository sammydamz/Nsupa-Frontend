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
      <Card className="rounded-2xl border-sky-100 shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-sky-100 text-sky-700 rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 leading-tight">Notifications & Alerts</h1>
              <p className="text-xs text-slate-500">Order Updates & AI Reminders</p>
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
              notif.read ? 'bg-white border-sky-100' : 'bg-sky-50/90 border-sky-300 ring-2 ring-sky-100'
            }`}
          >
            <CardContent className="p-4 text-left">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-xs font-bold text-slate-900">{notif.title}</h3>
                <span className="text-[10px] text-slate-400 shrink-0">{notif.timestamp}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-2">{notif.message}</p>

              {notif.actionScreen && (
                <span className="text-[11px] font-bold text-sky-600 inline-flex items-center gap-1 hover:underline">
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
