import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gold" | "outline" | "secondary";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center border px-2.5 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider transition-colors",
        {
          "border-transparent bg-primary text-primary-foreground": variant === "default",
          "border-gold-400/40 bg-gold-400/10 text-gold-300": variant === "gold",
          "border-border text-muted-foreground": variant === "outline",
          "border-transparent bg-secondary text-secondary-foreground": variant === "secondary",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
