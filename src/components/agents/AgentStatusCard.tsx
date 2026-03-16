import { cn } from "../../lib/cn";
import type { AgentTreeAgent } from "../../data/opa";

interface AgentStatusCardProps {
  agent: AgentTreeAgent;
  onSelect?: (agent: AgentTreeAgent) => void;
}

const stateBadgeClass: Record<AgentTreeAgent["state"], string> = {
  active: "bg-[#4aed65] text-[#008236]",
  warning: "bg-[#f4dd2f] text-[#4b3f00]",
  disabled: "bg-[#f54180] text-white"
};

const stateLabel: Record<AgentTreeAgent["state"], string> = {
  active: "activo",
  warning: "alerta",
  disabled: "desactivado"
};

const supportClass: Record<Exclude<AgentTreeAgent["state"], "active">, string> = {
  warning: "bg-[#f4dd2f] text-[#1f2937]",
  disabled: "bg-[#f54180] text-white"
};

export function AgentStatusCard({ agent, onSelect }: AgentStatusCardProps): JSX.Element {
  const showsSupport = agent.state !== "active";

  return (
    <article className="rounded-[10px] border border-[#d9e2ef] bg-[#f8fbff] p-2 shadow-[0_1px_2px_rgba(15,23,43,0.08)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#00b7e3] text-[10px] font-bold text-white ring-2 ring-[#155dfc]">
            A
          </span>
          <div>
            <p className="text-[16px] font-semibold leading-5 text-[#155dfc]">{agent.name}</p>
            <p className="text-[11px] leading-4 text-[#64748b]">ID: {agent.code}</p>
          </div>
        </div>

        <span
          className={cn(
            "rounded-full px-2 py-[2px] text-[11px] font-semibold lowercase",
            stateBadgeClass[agent.state]
          )}
        >
          {stateLabel[agent.state]}
        </span>
      </div>

      <p className="mt-2 text-[11px] text-[#6b7280]">{agent.email}</p>

      <div className="mt-2 grid grid-cols-3 gap-2">
        <div className="rounded-[6px] bg-white p-1.5">
          <p className="text-[10px] text-[#64748b]">Disponible</p>
          <p className="text-[18px] font-semibold leading-5 text-[#0f172b]">{agent.available}</p>
        </div>
        <div className="rounded-[6px] bg-[#fff0f7] p-1.5">
          <p className="text-[10px] text-[#f54180]">Premios</p>
          <p className="text-[18px] font-semibold leading-5 text-[#ff2a6d]">{agent.prizes}</p>
        </div>
        <div className="rounded-[6px] bg-[#edf8ea] p-1.5">
          <p className="text-[10px] text-[#38a746]">Comisiones</p>
          <p className="text-[18px] font-semibold leading-5 text-[#1a9d38]">{agent.commissions}</p>
        </div>
      </div>

      <div className="mt-2">
        {showsSupport ? (
          <div className="grid grid-cols-2 gap-2">
            <button
              className={cn(
                "h-[22px] rounded-[12px] text-[12px] font-semibold",
                supportClass[agent.state as Exclude<AgentTreeAgent["state"], "active">]
              )}
              type="button"
            >
              Soporte
            </button>
            <button
              className="h-[22px] rounded-[12px] border border-[#1f2937] bg-white text-[12px] font-medium text-[#111827]"
              onClick={() => onSelect?.(agent)}
              type="button"
            >
              Ver ficha
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <button
              className="h-[22px] rounded-[12px] bg-gradient-to-r from-[#75ef43] to-[#46e86d] text-[12px] font-semibold text-[#00142c]"
              type="button"
            >
              + Agregar
            </button>
            <button className="h-[22px] rounded-[12px] border border-[#1f2937] bg-white text-[12px] font-medium text-[#111827]" type="button">
              Quitar
            </button>
            <button
              className="h-[22px] rounded-[12px] border border-[#1f2937] bg-white text-[12px] font-medium text-[#111827]"
              onClick={() => onSelect?.(agent)}
              type="button"
            >
              Ficha
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
