import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  interactive?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  hoverEffect = false, 
  interactive = false,
  ...props 
}: GlassCardProps) {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl border border-white/5 bg-surface/40 backdrop-blur-md p-6 shadow-sm transition-all duration-300",
        hoverEffect && "hover:bg-surface/60 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        interactive && "cursor-pointer active:scale-[0.98]",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
