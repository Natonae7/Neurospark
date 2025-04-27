
import { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  title: string;
  description: string;
  time: string;
  icon: ReactNode;
  type?: 'default' | 'success' | 'warning' | 'info';
  className?: string;
  badge?: string;
}

export const ActivityCard = ({
  title,
  description,
  time,
  icon,
  type = 'default',
  className,
  badge,
}: ActivityCardProps) => {
  const typeClasses = {
    default: '',
    success: 'border-l-4 border-l-mint-green',
    warning: 'border-l-4 border-l-yellow-500',
    info: 'border-l-4 border-l-electric-blue',
  };

  const iconClasses = {
    default: 'bg-gray-100 text-gray-600',
    success: 'bg-mint-green/10 text-mint-green',
    warning: 'bg-yellow-500/10 text-yellow-500',
    info: 'bg-electric-blue/10 text-electric-blue',
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-card", typeClasses[type], className)}>
      <CardContent className="p-4 flex items-start gap-4">
        <div className={cn("p-2 rounded-full shrink-0", iconClasses[type])}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-sm line-clamp-1">{title}</h4>
            <time className="text-xs text-muted-foreground shrink-0 ml-2">{time}</time>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
          {badge && (
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">{badge}</Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
