import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function StatCard({ title, value, icon, trend, trendUp, className }: StatCardProps) {
  return (
    <div className={cn("p-6 rounded-xl bg-surface border border-border shadow-sm", className)}>
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-medium text-text-muted">{title}</p>
        {icon && <div className="text-primary/80 bg-primary/10 p-2 rounded-lg">{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">{value}</h3>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trendUp ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
          )}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
