import type { HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

type DivProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: DivProps): JSX.Element {
  return (
    <div
      className={cn(
        "rounded-[16px] border border-slate-100 bg-white/95 shadow-[0_14px_46px_-28px_rgba(0,28,62,0.35)]",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: DivProps): JSX.Element {
  return <div className={cn("px-5 pt-5", className)} {...props} />;
}

export function CardContent({ className, ...props }: DivProps): JSX.Element {
  return <div className={cn("px-5 pb-5", className)} {...props} />;
}
