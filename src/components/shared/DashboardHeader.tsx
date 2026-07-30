import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  badgeText?: string;
  badgeVariant?: 'default' | 'destructive' | 'outline' | 'secondary';
  badgeClassName?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  badgeText,
  badgeVariant = 'default',
  badgeClassName = 'bg-emerald-500 hover:bg-emerald-500 text-white border-none',
}) => {
  return (
    <Card className="bg-primary text-primary-foreground rounded-3xl shadow-md border-none">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold leading-tight">{title}</h1>
            <p className="text-xs text-primary-foreground/80">{subtitle}</p>
          </div>
        </div>

        {badgeText && (
          <Badge variant={badgeVariant} className={`text-xs font-bold rounded-full ${badgeClassName}`}>
            {badgeText}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};
