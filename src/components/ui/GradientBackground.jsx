import React from "react";
import { cn } from "@/lib/utils";

const GradientBackground = ({
  variant = "radial",
  className,
  children,
  ...props
}) => {
  const variants = {
    radial: "bg-[radial-gradient(circle_at_50%_50%,_rgba(196,154,60,0.05)_0%,_transparent_70%)]",
    linear: "bg-[linear-gradient(180deg,_rgba(196,154,60,0.03)_0%,_transparent_100%)]",
    warm: "bg-[radial-gradient(at_top_left,_rgba(196,154,60,0.05),_transparent_50%),_radial-gradient(at_bottom_right,_rgba(196,154,60,0.05),_transparent_50%)]",
  };

  return (
    <div className={cn("relative w-full overflow-hidden", className)} {...props}>
      <div 
        className={cn(
          "absolute inset-0 z-0 pointer-events-none",
          variants[variant] || variants.radial
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GradientBackground;
