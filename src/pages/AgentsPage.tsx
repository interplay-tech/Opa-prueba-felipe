import { useMemo, useState } from "react";

import { Search, X } from "lucide-react";

import { AgentNodePanel } from "../components/agents/AgentNodePanel";
import { SubConcessionaryCard } from "../components/agents/SubConcessionaryCard";
import type { AgentTreeFilter } from "../data/opa";
import { subConcessionaries } from "../data/opa";
import { cn } from "../lib/cn";

const filterLabels: Array<{ id: AgentTreeFilter; label: string }> = [
  { id: "active", label: "Activo" },
  { id: "warning", label: "Advertencia" },
  { id: "disabled", label: "Desactivado" }
];

const filterButtonClass: Record<AgentTreeFilter, string> = {
  active: "border-[#46eb53] bg-[#46eb53] text-[#002d0e]",
  warning: "border-[#f4dd2f] bg-[#f4dd2f] text-[#2c2200]",
  disabled: "border-[#f54180] bg-[#f54180] text-white"
};

const filterLabelById: Record<AgentTreeFilter, string> = {
  active: "activo",
  warning: "advertencia",
  disabled: "desactivado"
};

interface SelectedAgentRef {
  agentId: string;
  subConcessionaryId: string;
}

export function AgentsPage(): JSX.Element {
  const [selectedFilter, setSelectedFilter] = useState<AgentTreeFilter>("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgentRef, setSelectedAgentRef] = useState<SelectedAgentRef | null>(null);
  const [expandedByCard, setExpandedByCard] = useState<Record<string, boolean>>({
    "sub-1": true,
    "sub-2": true
  });

  const totalSubConcessionaries = subConcessionaries.length;
  const totalAgents = subConcessionaries.reduce((sum, card) => sum + card.agents.length, 0);
  const selectedFilterCount = subConcessionaries.reduce(
    (sum, card) => sum + card.agents.filter((agent) => agent.state === selectedFilter).length,
    0
  );

  const searchMatches = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (query.length === 0) {
      return selectedFilterCount;
    }

    return subConcessionaries.reduce(
      (sum, card) =>
        sum +
        card.agents.filter(
          (agent) =>
            agent.state === selectedFilter &&
            `${agent.name} ${agent.code} ${agent.email}`.toLowerCase().includes(query)
        ).length,
      0
    );
  }, [searchTerm, selectedFilter, selectedFilterCount]);

  const selectedAgent = useMemo(() => {
    if (!selectedAgentRef) {
      return null;
    }

    const parent = subConcessionaries.find((card) => card.id === selectedAgentRef.subConcessionaryId);

    if (!parent) {
      return null;
    }

    const agent = parent.agents.find((item) => item.id === selectedAgentRef.agentId);

    if (!agent) {
      return null;
    }

    return {
      agent,
      subConcessionaryName: parent.name
    };
  }, [selectedAgentRef]);

  return (
    <div className="space-y-3 pb-3 md:space-y-4 md:pb-5 lg:space-y-5 lg:pb-6 xl:grid xl:grid-cols-[280px_minmax(0,1fr)_320px] xl:items-start xl:gap-5 xl:space-y-0 xl:pb-0">
      <aside className="space-y-3 xl:sticky xl:top-5">
        <section className="space-y-1 px-[2px]">
          <h1 className="text-[14px] font-bold uppercase tracking-[0.42px] text-[#00142c]">Árbol de agentes</h1>
          <p className="text-xs leading-5 text-[#45556c]">
            Gestiona la jerarquía de concesionarios, sub-concesionarios y puntos de venta.
          </p>
        </section>

        <article className="rounded-2xl border border-[#d9e2ef] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,43,0.1)]">
          <h2 className="text-[14px] font-bold uppercase tracking-[0.3px] text-[#00142c]">Resumen red</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-[#f8fafc] p-3">
              <p className="text-[11px] text-[#64748b]">Sub-concesionarios</p>
              <p className="text-[24px] font-bold leading-none text-[#0f172b]">{totalSubConcessionaries}</p>
            </div>
            <div className="rounded-xl bg-[#f8fafc] p-3">
              <p className="text-[11px] text-[#64748b]">Agentes</p>
              <p className="text-[24px] font-bold leading-none text-[#0f172b]">{totalAgents}</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-[#475569]">
            Mostrando <span className="font-semibold text-[#0f172b]">{selectedFilterCount}</span> agentes en estado{" "}
            <span className="font-semibold lowercase text-[#0f172b]">{filterLabelById[selectedFilter]}</span>.
          </p>
          <p className="mt-1 text-xs text-[#475569]">
            Coincidencias por búsqueda: <span className="font-semibold text-[#0f172b]">{searchMatches}</span>
          </p>
        </article>

        <article className="rounded-2xl border border-[#d9e2ef] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,43,0.08)]">
          <h2 className="text-[14px] font-bold uppercase tracking-[0.3px] text-[#00142c]">Filtros globales</h2>

          <div className="mt-3 space-y-2">
            {filterLabels.map((filterItem) => (
              <button
                className={cn(
                  "w-full rounded-full border px-3 py-2 text-sm font-semibold transition",
                  selectedFilter === filterItem.id
                    ? filterButtonClass[filterItem.id]
                    : "border-[#1f2937] bg-white text-[#111827] hover:border-[#94a3b8]"
                )}
                key={filterItem.id}
                onClick={() => setSelectedFilter(filterItem.id)}
                type="button"
              >
                {filterItem.label}
              </button>
            ))}
          </div>

          <label className="mt-3 flex h-10 items-center gap-2 rounded-xl border border-[#dbe4ef] bg-[#f8fafc] px-3">
            <Search className="h-4 w-4 text-[#64748b]" />
            <input
              className="w-full border-none bg-transparent text-sm text-[#0f172b] outline-none placeholder:text-[#7c8aa0]"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar agente por nombre, ID o correo"
              type="text"
              value={searchTerm}
            />
            {searchTerm.length > 0 ? (
              <button className="text-[#64748b]" onClick={() => setSearchTerm("")} type="button">
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </label>
        </article>
      </aside>

      <section className="space-y-3 xl:max-h-[calc(100vh-220px)] xl:overflow-y-auto xl:pr-1">
        {subConcessionaries.map((card) => (
          <SubConcessionaryCard
            card={card}
            expanded={expandedByCard[card.id] ?? false}
            key={card.id}
            onFilterChange={setSelectedFilter}
            onSelectAgent={(ref) => setSelectedAgentRef(ref)}
            onToggle={() =>
              setExpandedByCard((previous) => ({
                ...previous,
                [card.id]: !previous[card.id]
              }))
            }
            searchTerm={searchTerm}
            selectedFilter={selectedFilter}
          />
        ))}

        <div className="xl:hidden">
          <AgentNodePanel onClose={() => setSelectedAgentRef(null)} selected={selectedAgent} />
        </div>
      </section>

      <aside className="hidden xl:block xl:sticky xl:top-5">
        <AgentNodePanel selected={selectedAgent} />
      </aside>
    </div>
  );
}
