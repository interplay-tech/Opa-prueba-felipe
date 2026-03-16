import { AlertTriangle, CircleDollarSign, PauseCircle, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

import type { AgentTreeAgent } from "../../data/opa";
import { cn } from "../../lib/cn";

interface SelectedAgentNode {
  agent: AgentTreeAgent;
  subConcessionaryName: string;
}

interface AgentNodePanelProps {
  selected: SelectedAgentNode | null;
  onClose?: () => void;
}

const statusLabel: Record<AgentTreeAgent["state"], string> = {
  active: "Activo",
  warning: "Advertencia",
  disabled: "Desactivado"
};

const statusClass: Record<AgentTreeAgent["state"], string> = {
  active: "bg-[#edf8ea] text-[#1a9d38]",
  warning: "bg-[#fff8d8] text-[#8b6f00]",
  disabled: "bg-[#ffe8f0] text-[#be123c]"
};

export function AgentNodePanel({ selected, onClose }: AgentNodePanelProps): JSX.Element {
  if (!selected) {
    return (
      <article className="rounded-2xl border border-[#d9e2ef] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,43,0.08)]">
        <h2 className="text-[14px] font-bold uppercase tracking-[0.3px] text-[#00142c]">Detalle de agente</h2>
        <p className="mt-2 text-sm text-[#64748b]">Selecciona un agente del árbol para ver su ficha operativa.</p>
      </article>
    );
  }

  const { agent, subConcessionaryName } = selected;

  return (
    <article className="rounded-2xl border border-[#d9e2ef] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,43,0.08)]">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-[14px] font-bold uppercase tracking-[0.3px] text-[#00142c]">Detalle de agente</h2>
          <p className="mt-2 text-base font-semibold text-[#0f172b]">{agent.name}</p>
          <p className="text-xs text-[#64748b]">ID {agent.code} · {subConcessionaryName}</p>
        </div>
        <span className={cn("rounded-full px-2 py-[2px] text-xs font-semibold", statusClass[agent.state])}>
          {statusLabel[agent.state]}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
        <div className="rounded-xl bg-[#f8fafc] p-2">
          <p className="text-[#64748b]">Disponible</p>
          <p className="text-sm font-semibold text-[#0f172b]">{agent.available}</p>
        </div>
        <div className="rounded-xl bg-[#f8fafc] p-2">
          <p className="text-[#64748b]">Comisiones</p>
          <p className="text-sm font-semibold text-[#0f172b]">{agent.commissions}</p>
        </div>
        <div className="rounded-xl bg-[#f8fafc] p-2 sm:col-span-2">
          <p className="text-[#64748b]">Correo</p>
          <p className="text-sm font-semibold text-[#0f172b] break-all">{agent.email}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          className="inline-flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-[#95fb3f] to-[#46fc6d] px-3 py-1.5 text-xs font-semibold text-[#00142c]"
          type="button"
        >
          <CircleDollarSign className="h-4 w-4" />
          Recargar
        </button>

        <button
          className="inline-flex items-center justify-center gap-1 rounded-full border border-[#dbe4ef] bg-white px-3 py-1.5 text-xs font-semibold text-[#334155]"
          type="button"
        >
          {agent.state === "disabled" ? <PlayCircle className="h-4 w-4" /> : <PauseCircle className="h-4 w-4" />}
          {agent.state === "disabled" ? "Reactivar" : "Pausar"}
        </button>

        <Link
          className="inline-flex items-center justify-center gap-1 rounded-full border border-[#ffd2e4] bg-[#fff1f6] px-3 py-1.5 text-xs font-semibold text-[#be123c]"
          to="/support"
        >
          <AlertTriangle className="h-4 w-4" />
          Escalar
        </Link>

        <Link
          className="inline-flex items-center justify-center gap-1 rounded-full border border-[#dbe4ef] bg-white px-3 py-1.5 text-xs font-semibold text-[#334155]"
          to="/modules/transactions-history"
        >
          Ver historial
        </Link>
      </div>

      {onClose ? (
        <button className="mt-3 w-full rounded-full border border-[#dbe4ef] bg-white px-3 py-1.5 text-xs font-semibold text-[#334155]" onClick={onClose} type="button">
          Cerrar detalle
        </button>
      ) : null}
    </article>
  );
}
