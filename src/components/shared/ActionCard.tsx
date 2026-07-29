import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionCardProps {
  title: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
  iconClassName?: string;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  icon: Icon,
  onClick,
  className = 'bg-blue-50 hover:bg-blue-100',
  iconClassName = 'text-primary',
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-3xl transition-colors group text-center w-full ${className}`}
    >
      <div className="w-10 h-10 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon className={`w-5 h-5 ${iconClassName}`} />
      </div>
      <span className="text-xs font-bold text-primary truncate w-full">{title}</span>
    </button>
  );
};
