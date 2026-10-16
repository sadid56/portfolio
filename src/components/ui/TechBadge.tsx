import React, { memo } from "react";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export const TechBadge: React.FC<TechBadgeProps> = memo(
  ({ name, className = "" }) => {
    return (
      <span
        className={`rounded-md border border-white/8 bg-white/3 px-2.5 py-1 text-[11px] font-medium text-slate-300 transition-colors duration-200 hover:border-white/15 hover:text-white ${className}`}
      >
        {name}
      </span>
    );
  },
);

TechBadge.displayName = "TechBadge";

export default TechBadge;
