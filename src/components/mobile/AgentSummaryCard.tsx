import { ArrowDownRight, ArrowUpRight, ChevronRight } from "lucide-react";

import { cn } from "../../lib/cn";
import type { AgentSummary } from "../../data/opa";

interface AgentSummaryCardProps {
  agent: AgentSummary;
  onOpen?: (agent: AgentSummary) => void;
}

export function AgentSummaryCard({ agent, onOpen }: AgentSummaryCardProps): JSX.Element {
  const TrendIcon = agent.trendDirection === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <article className="rounded-[14px] border border-[#e2e8f0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f5f9] text-sm font-bold text-[#45556c]">
            {agent.initials}
          </span>
          <div>
            <p className="text-base font-medium text-[#0f172b]">{agent.name}</p>
            <p className="text-xs text-[#62748e]">{agent.role}</p>
          </div>
        </div>

        <span
          className={cn(
            "rounded-lg border px-2 py-1 text-xs font-medium",
            agent.status === "active"
              ? "border-[#b9f8cf] bg-[#f0fdf4] text-[#008236]"
              : "border-[#ffc9c9] bg-[#fef2f2] text-[#c10007]"
          )}
        >
          {agent.status === "active" ? "Activo" : "Inactivo"}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-[#62748e]">Ventas Totales</p>
          <p className="text-lg font-bold text-[#0f172b]">{agent.sales}</p>
        </div>
        <div>
          <p className="text-xs text-[#62748e]">Tendencia</p>
          <p
            className={cn(
              "inline-flex items-center gap-1 text-lg font-medium",
              agent.trendDirection === "up" ? "text-[#00a63e]" : "text-[#e7000b]"
            )}
          >
            <TrendIcon className="h-4 w-4" />
            {agent.trend}
          </p>
        </div>
      </div>

      <button
        className="mt-4 inline-flex w-full items-center justify-between rounded-lg px-3 py-1 text-sm font-medium text-[#62748e] transition hover:bg-[#f8fafc]"
        onClick={() => onOpen?.(agent)}
        type="button"
      >
        Ver historial reciente
        <ChevronRight className="h-4 w-4" />
      </button>
    </article>
  );
}
