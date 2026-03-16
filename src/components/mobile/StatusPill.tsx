import { cn } from "../../lib/cn";

interface StatusPillProps {
  label: string;
  count: number;
  tone: "active" | "warning" | "danger";
}

const toneClass: Record<StatusPillProps["tone"], string> = {
  active: "bg-[#00b7e3] text-black",
  warning: "bg-[#fcea2a] text-black",
  danger: "bg-[#f54180] text-black"
};

export function StatusPill({ label, count, tone }: StatusPillProps): JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex h-[31px] items-center gap-1 rounded-full px-3 text-[12px] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.08)]",
        toneClass[tone]
      )}
    >
      {label}
      <span className="inline-flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-white px-[3px] text-[11px] font-bold text-[#11181c]">
        {count}
      </span>
    </span>
  );
}
