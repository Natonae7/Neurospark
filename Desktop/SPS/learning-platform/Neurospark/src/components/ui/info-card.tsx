
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  valueClassName?: string;
}

export const InfoCard = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
  valueClassName,
}: InfoCardProps) => {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight mb-1">
          <span className={valueClassName}>{value}</span>
        </div>
        {(description || trend) && (
          <div className="flex items-center text-xs text-muted-foreground">
            {trend && (
              <span className={cn("mr-2 flex items-center", 
                trend.isPositive ? "text-mint-green" : "text-destructive"
              )}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            )}
            {description && <span>{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
