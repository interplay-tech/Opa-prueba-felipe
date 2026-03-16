import { ChevronDown, ChevronUp } from "lucide-react";

import type { AgentTreeFilter, SubConcessionary } from "../../data/opa";
import { cn } from "../../lib/cn";
import { AgentStatusCard } from "./AgentStatusCard";

interface SubConcessionaryCardProps {
  card: SubConcessionary;
  expanded: boolean;
  selectedFilter: AgentTreeFilter;
  onToggle: () => void;
  onFilterChange: (filter: AgentTreeFilter) => void;
  searchTerm?: string;
  onSelectAgent?: (params: { agentId: string; subConcessionaryId: string }) => void;
}

const filterLabels: Array<{ id: AgentTreeFilter; label: string }> = [
  { id: "active", label: "Activo" },
  { id: "warning", label: "Advertencia" },
  { id: "disabled", label: "Desactivado" }
];

const filterActiveClass: Record<AgentTreeFilter, string> = {
  active: "bg-[#46eb53] border-[#46eb53] text-[#002d0e]",
  warning: "bg-[#f4dd2f] border-[#f4dd2f] text-[#2c2200]",
  disabled: "bg-[#f54180] border-[#f54180] text-white"
};

export function SubConcessionaryCard({
  card,
  expanded,
  selectedFilter,
  onToggle,
  onFilterChange,
  searchTerm = "",
  onSelectAgent
}: SubConcessionaryCardProps): JSX.Element {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const visibleAgents = card.agents.filter((agent) => {
    if (agent.state !== selectedFilter) {
      return false;
    }

    if (normalizedSearch.length === 0) {
      return true;
    }

    return `${agent.name} ${agent.code} ${agent.email}`.toLowerCase().includes(normalizedSearch);
  });

  return (
    <article className="overflow-hidden rounded-[10px] border border-[#d9e2ef] bg-white shadow-[0_1px_2px_rgba(15,23,43,0.1)]">
      <header className="flex items-center justify-between bg-[#002a5c] px-3 py-2 text-white">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#00b7e3] text-[10px] font-bold ring-2 ring-[#155dfc]">
            S
          </span>
          <div>
            <p className="text-[16px] font-semibold leading-5">{card.name}</p>
            <p className="text-[11px] leading-4 text-[#cbd5e1]">ID: {card.code}</p>
          </div>
        </div>

        <button
          aria-label={expanded ? "Ocultar seccion" : "Mostrar seccion"}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#002a5c]"
          onClick={onToggle}
          type="button"
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </header>

      <div className="space-y-2 p-3">
        <p className="text-[11px] text-[#6b7280]">{card.email}</p>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-[6px] bg-[#f5f8fc] p-1.5">
            <p className="text-[10px] text-[#64748b]">Disponible</p>
            <p className="text-[18px] font-semibold leading-5 text-[#0f172b]">{card.available}</p>
          </div>
          <div className="rounded-[6px] bg-[#fff0f7] p-1.5">
            <p className="text-[10px] text-[#f54180]">Premios</p>
            <p className="text-[18px] font-semibold leading-5 text-[#ff2a6d]">{card.prizes}</p>
          </div>
          <div className="rounded-[6px] bg-[#edf8ea] p-1.5">
            <p className="text-[10px] text-[#38a746]">Comisiones</p>
            <p className="text-[18px] font-semibold leading-5 text-[#1a9d38]">{card.commissions}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            className="h-[30px] rounded-[18px] bg-gradient-to-r from-[#75ef43] to-[#46e86d] text-[16px] font-semibold text-[#00142c]"
            type="button"
          >
            + Agregar
          </button>
          <button className="h-[30px] rounded-[18px] border border-[#1f2937] bg-white text-[16px] font-medium text-[#111827]" type="button">
            Quitar
          </button>
        </div>
      </div>

      {card.hasAgentsSection && expanded ? (
        <div className="border-t border-[#e2e8f0] bg-[#f8fafc] p-3">
          <h3 className="text-[14px] font-bold uppercase tracking-[0.2px] text-[#475569]">Agentes</h3>

          <div className="mt-2 flex items-center gap-2">
            {filterLabels.map((filter) => {
              const isActive = selectedFilter === filter.id;

              return (
                <button
                  className={cn(
                    "h-[23px] rounded-full border px-3 text-[12px] font-semibold",
                    isActive
                      ? filterActiveClass[filter.id]
                      : "border-[#1f2937] bg-white text-[#111827]"
                  )}
                  key={filter.id}
                  onClick={() => onFilterChange(filter.id)}
                  type="button"
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="mt-2 space-y-2">
            {visibleAgents.length === 0 ? (
              <article className="rounded-[10px] border border-dashed border-[#c9d8eb] bg-white p-3 text-xs text-[#64748b]">
                No hay agentes para este filtro.
              </article>
            ) : (
              visibleAgents.map((agent) => (
                <AgentStatusCard
                  agent={agent}
                  key={agent.id}
                  onSelect={() => onSelectAgent?.({ agentId: agent.id, subConcessionaryId: card.id })}
                />
              ))
            )}
          </div>
        </div>
      ) : null}
    </article>
  );
}
