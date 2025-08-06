import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  variant = "default",
  className,
  trend
}: MetricCardProps) {
  const variantStyles = {
    default: "border-border",
    success: "border-success/20 bg-gradient-to-br from-success/5 to-success/10",
    warning: "border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10",
    danger: "border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10"
  };

  const iconColors = {
    default: "text-primary",
    success: "text-success",
    warning: "text-warning",
    danger: "text-destructive"
  };

  return (
    <Card className={cn(
      "metric-card transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
      variantStyles[variant],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className={cn("h-4 w-4", iconColors[variant])} />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              vs período anterior
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}