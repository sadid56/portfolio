import React, { ReactNode } from "react";

interface BaseCardProps {
  children: ReactNode;
  className?: string;
  variant?: "solid" | "gradient";
}

export const BaseCard: React.FC<BaseCardProps> = ({
  children,
  className = "",
  variant = "solid",
}) => {
  const bgStyles =
    variant === "gradient"
      ? "bg-linear-to-b from-slate-900/70 via-slate-900/40 to-slate-950/80"
      : "bg-slate-950/80";

  return (
    <div
      className={`group/card relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 ${bgStyles} backdrop-blur-md shadow-2xl ${className}`}
    >
      {/* Top shiny border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-linear-to-r from-transparent via-white/60 to-transparent" />

      {/* Subtle ambient light only for gradient variant */}
      {variant === "gradient" && (
        <div className="pointer-events-none absolute -top-14 -left-14 h-36 w-36 rounded-full bg-white/3 blur-2xl" />
      )}

      {children}
    </div>
  );
};

export default BaseCard;
