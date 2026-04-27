import React from "react";
import { cn } from "@/lib/utils";

const BackgroundPattern = ({
  variant = "dots",
  opacity = 0.07,
  color = "#c49a3c",
  className,
  children,
  ...props
}) => {
  const patterns = {
    grid: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
              opacity={opacity}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    ),
    dots: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="dots"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill={color} opacity={opacity} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    ),
    mandala: (
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c49a3c' stroke-width='0.4' opacity='0.5'%3E%3Cpath d='M60 10 C65 25 80 40 95 40 C80 40 65 55 60 70 C55 55 40 40 25 40 C40 40 55 25 60 10'/%3E%3Ccircle cx='60' cy='40' r='3'/%3E%3Cpath d='M60 70 L60 90 M50 80 L70 80' stroke-width='0.3'/%3E%3Cellipse cx='60' cy='40' rx='20' ry='30' opacity='0.1'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '240px 240px'
        }}
      />
    ),
  };

  return (
    <div className={cn("relative w-full overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 z-0 pointer-events-none">
        {patterns[variant]}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundPattern;
