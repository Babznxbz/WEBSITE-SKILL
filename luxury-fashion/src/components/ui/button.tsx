import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "gold" | "cashmere" | "secondary" | "pink" | "pink-outline";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-xs font-bold uppercase tracking-widest transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-espresso-900 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
          {
            "bg-espresso-950 text-white hover:bg-espresso-800 shadow-md active:scale-[0.98]":
              variant === "default",
            "bg-[#E11D48] text-white shadow-lg shadow-rose-600/30 hover:bg-[#BE123C] hover:shadow-xl active:scale-[0.98]":
              variant === "pink",
            "border-2 border-[#E11D48] bg-white text-[#E11D48] hover:bg-[#E11D48] hover:text-white shadow-sm active:scale-[0.98]":
              variant === "pink-outline",
            "border-2 border-espresso-950 bg-white text-espresso-950 hover:bg-espresso-950 hover:text-white shadow-sm active:scale-[0.98]":
              variant === "outline",
            "hover:bg-cream-200 text-espresso-950 font-bold": variant === "ghost",
            "bg-espresso-900 text-white hover:bg-espresso-950 shadow-md active:scale-[0.98]":
              variant === "secondary",
            "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md hover:brightness-110":
              variant === "gold" || variant === "cashmere",
            "h-11 px-6 py-2.5 rounded-sm": size === "default",
            "h-9 px-4 rounded-sm text-[11px]": size === "sm",
            "h-13 px-8 rounded-sm text-xs tracking-[0.2em]": size === "lg",
            "h-10 w-10 p-0 rounded-sm": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
