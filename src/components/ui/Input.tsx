import type { InputHTMLAttributes } from "react";

import type { LucideIcon } from "lucide-react";

import { cn } from "../../lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

export function Input({ className, icon: Icon, ...props }: InputProps): JSX.Element {
  return (
    <label className="relative flex w-full items-center">
      {Icon ? <Icon className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" /> : null}
      <input
        className={cn(
          "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-[0_1px_1px_rgba(0,0,0,0.03)] outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100",
          Icon ? "pl-10" : "",
          className
        )}
        {...props}
      />
    </label>
  );
}
