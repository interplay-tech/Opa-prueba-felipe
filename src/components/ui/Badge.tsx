import type { HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

type BadgeTone = "info" | "success" | "warning";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  info: "bg-cyan-100 text-cyan-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700"
};

export function Badge({
  className,
  tone = "info",
  ...props
}: BadgeProps): JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em]",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}
