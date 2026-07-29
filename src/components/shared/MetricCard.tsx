import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  valueClassName?: string;
  subtitle?: React.ReactNode;
  subtitleClassName?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  valueClassName = 'text-slate-900',
  subtitle,
  subtitleClassName = 'text-slate-500 font-medium',
}) => {
  return (
    <Card className="rounded-3xl border-sky-100 shadow-sm flex flex-col justify-center h-full min-h-[88px]">
      <CardContent className="p-3 text-center flex flex-col items-center justify-center space-y-0.5">
        <span className="text-[10px] text-slate-400 block w-full truncate">{title}</span>
        <span className={`text-base sm:text-lg font-black block w-full truncate ${valueClassName}`}>{value}</span>
        {subtitle && (
          <span className={`text-[9px] sm:text-[10px] block w-full truncate ${subtitleClassName}`}>{subtitle}</span>
        )}
      </CardContent>
    </Card>
  );
};
