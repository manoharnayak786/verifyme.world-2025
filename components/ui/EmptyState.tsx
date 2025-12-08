import { cn } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ 
  title = "No data found", 
  description = "Try adjusting your search or filters.", 
  icon, 
  action,
  className 
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-4 text-center rounded-xl border border-dashed border-border bg-surface/50",
      className
    )}>
      <div className="bg-surface p-4 rounded-full mb-4 border border-border">
        {icon || <Search className="h-6 w-6 text-text-muted" />}
      </div>
      <h3 className="text-lg font-semibold text-text-main mb-1">{title}</h3>
      <p className="text-sm text-text-muted max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}
