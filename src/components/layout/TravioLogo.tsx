import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface TravioLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function TravioLogo({ className, size = "md" }: TravioLogoProps) {
  const sizeClasses = {
    sm: "text-lg md:text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl"
  };

  const iconSizes = {
    sm: "h-4 w-4 md:h-5 md:w-5",
    md: "h-5 w-5 md:h-6 md:w-6",
    lg: "h-6 w-6 md:h-7 md:w-7"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <MapPin className={cn("text-accent", iconSizes[size])} />
      <span className={cn(
        "font-sans font-bold tracking-[0.1em] uppercase text-primary",
        sizeClasses[size]
      )}>
        Travio
      </span>
    </div>
  );
}
