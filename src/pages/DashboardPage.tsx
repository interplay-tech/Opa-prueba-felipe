import { useEffect, useMemo, useState } from "react";

import { ChevronDown, Filter, QrCode, Search, X } from "lucide-react";
import { Link } from "react-router-dom";

import { AgentDetailModal } from "../components/agents/AgentDetailModal";
import { DashboardInsightModal } from "../components/dashboard/DashboardInsightModal";
import { OperatorShareQrModal } from "../components/dashboard/OperatorShareQrModal";
import { AgentSummaryCard } from "../components/mobile/AgentSummaryCard";
import { MetricSlideCard } from "../components/mobile/MetricSlideCard";
import { StatusPill } from "../components/mobile/StatusPill";
import type { DashboardInsightCardId } from "../data/dashboardInsights";
import type { AgentSummary, MapMarker } from "../data/opa";
import { mapFilters, mapMarkers, monthlySlides, operatorProfile, topAgents } from "../data/opa";
import { cn } from "../lib/cn";
import { useOperations } from "../state/OperationsContext";

type MapToneFilter = MapMarker["tone"] | "all";

interface OperationalMarker extends MapMarker {
  agent: string;
  code: string;
  location: string;
}

const markerMetaById: Record<string, Omit<OperationalMarker, "id" | "top" | "left" | "tone">> = {
  m1: { agent: "Agente 3", code: "ID: 20067", location: "Blvd. Kuwait · Zona norte" },
  m2: { agent: "Agente 1", code: "ID: 20061", location: "Cascadas Mall" },
  m3: { agent: "Agente 4", code: "ID: 20064", location: "Expresso Banco Central" },
  m4: { agent: "Agente 5", code: "ID: 20059", location: "Boulevard del Sur" },
  m5: { agent: "Agente 2", code: "ID: 20062", location: "Centro comercial Torre" },
  m6: { agent: "Agente 7", code: "ID: 20071", location: "Terminal San Pedro" },
  m7: { agent: "Agente 8", code: "ID: 20072", location: "Kiosko Altia" },
  m8: { agent: "Agente 9", code: "ID: 20073", location: "Plaza Los Castaños" },
  m9: { agent: "Agente 6", code: "ID: 20069", location: "Merendón Oeste" },
  m10: { agent: "Agente 10", code: "ID: 20075", location: "Mercado central" }
};

const markerColorByTone: Record<MapMarker["tone"], string> = {
  active: "bg-[#00b7e3]",
  warning: "bg-[#fcea2a]",
  danger: "bg-[#f54180]",
  muted: "bg-[#6a7282]"
};

const mapFilterToMarkerTone: Record<string, MapMarker["tone"]> = {
  active: "active",
  warning: "warning",
  disabled: "danger"
};

const dashboardInsightCardIds: DashboardInsightCardId[] = [
  "recharge",
  "sales",
  "active-points",
  "commissions",
  "alerts"
];

function isDashboardInsightCardId(id: string): id is DashboardInsightCardId {
  return dashboardInsightCardIds.includes(id as DashboardInsightCardId);
}

export function DashboardPage(): JSX.Element {
  const { operationalQueue } = useOperations();
  const [selectedTone, setSelectedTone] = useState<MapToneFilter>("all");
  const [query, setQuery] = useState("");
  const [isQuickRechargeOpen, setIsQuickRechargeOpen] = useState(false);
  const [isShareQrOpen, setIsShareQrOpen] = useState(false);
  const [activeInsightCardId, setActiveInsightCardId] = useState<DashboardInsightCardId | null>(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AgentSummary | null>(null);

  const operationalMarkers = useMemo<OperationalMarker[]>(
    () =>
      mapMarkers.map((marker) => ({
        ...marker,
        ...markerMetaById[marker.id]
      })),
    []
  );

  const visibleMarkers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return operationalMarkers.filter((marker) => {
      const toneMatches = selectedTone === "all" ? true : marker.tone === selectedTone;
      const queryMatches =
        normalizedQuery.length === 0
          ? true
          : `${marker.agent} ${marker.code} ${marker.location}`.toLowerCase().includes(normalizedQuery);

      return toneMatches && queryMatches;
    });
  }, [operationalMarkers, query, selectedTone]);

  const markerCountByTone = useMemo(
    () =>
      operationalMarkers.reduce<Record<MapMarker["tone"], number>>(
        (accumulator, marker) => {
          accumulator[marker.tone] += 1;
          return accumulator;
        },
        { active: 0, warning: 0, danger: 0, muted: 0 }
      ),
    [operationalMarkers]
  );

  useEffect(() => {
    if (!selectedMarkerId) {
      return;
    }

    const stillVisible = visibleMarkers.some((marker) => marker.id === selectedMarkerId);
    if (!stillVisible) {
      setSelectedMarkerId(null);
    }
  }, [selectedMarkerId, visibleMarkers]);

  const selectedMarker = visibleMarkers.find((marker) => marker.id === selectedMarkerId) ?? null;

  return (
    <div className="space-y-4 pb-3 md:space-y-5 md:pb-5 xl:flex xl:h-[calc(100vh-180px)] xl:flex-col xl:space-y-4 xl:pb-0">
      <header className="flex items-center justify-between gap-3">
        <p className="text-[14px] font-bold uppercase tracking-[0.42px] text-[#00142c]">Informacion del ultimo mes</p>
        <button
          className="inline-flex h-10 items-center gap-2 rounded-full border border-[#cdd9e8] bg-white px-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#0f172b] shadow-[0_1px_2px_rgba(15,23,43,0.08)] transition hover:bg-[#f8fafc]"
          onClick={() => setIsShareQrOpen(true)}
          type="button"
        >
          <QrCode className="h-4 w-4 text-[#155dfc]" />
          QR ficha
        </button>
      </header>

      <section className="-mx-3 overflow-x-auto px-3 pb-1 scrollbar-hide md:mx-0 md:overflow-visible md:px-0 md:pb-0">
        <div className="flex gap-2 md:grid md:grid-cols-3 md:gap-3 xl:grid-cols-5">
          {monthlySlides.map((card) => {
            const actionable = isDashboardInsightCardId(card.id);

            return (
              <button
                className={cn(
                  "rounded-2xl border-none bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-2",
                  actionable ? "cursor-pointer transition hover:-translate-y-0.5" : "cursor-default"
                )}
                key={card.id}
                onClick={() => {
                  if (actionable) {
                    setActiveInsightCardId(card.id as DashboardInsightCardId);
                  }
                }}
                type="button"
              >
                <MetricSlideCard
                  accent={card.accent}
                  subtitle={card.subtitle}
                  title={card.title}
                  value={card.value}
                />
              </button>
            );
          })}
        </div>
      </section>

      <div className="space-y-4 md:grid md:min-h-0 md:flex-1 md:grid-cols-[minmax(0,1fr)_280px] md:items-start md:gap-4 md:space-y-0 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-5">
        <div className="space-y-4 md:grid md:min-h-0 md:grid-rows-[auto_minmax(0,1fr)]">
          <section className="rounded-2xl border border-[#e2e8f0] bg-white px-6 py-5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <button
              aria-controls="quick-recharge-content"
              aria-expanded={isQuickRechargeOpen}
              className="flex w-full items-start justify-between gap-3 text-left"
              onClick={() => setIsQuickRechargeOpen((previous) => !previous)}
              type="button"
            >
              <div>
                <h2 className="text-[14px] font-bold uppercase tracking-[0.42px] text-[#00142c]">Recarga rapida</h2>
                <p className="mt-2 text-xs text-[#45556c]">Recarga el saldo de tu red de manera rapida.</p>
              </div>
              <span
                className={cn(
                  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition-transform",
                  isQuickRechargeOpen ? "rotate-180" : "rotate-0"
                )}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>

            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
                isQuickRechargeOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
              id="quick-recharge-content"
            >
              <div className="overflow-hidden">
                <label className="flex h-10 items-center gap-3 rounded-lg bg-[#f3f3f5] px-4 text-[#717182]">
                  <Search className="h-4 w-4" />
                  <input
                    className="w-full border-none bg-transparent text-sm text-[#314158] outline-none placeholder:text-[#717182]"
                    placeholder="Busca por id, nombre o correo"
                    type="text"
                  />
                </label>

                <button
                  className="mt-4 flex h-[56px] w-full items-center justify-center rounded-[105px] bg-gradient-to-r from-[#95fb3f] to-[#46fc6d] text-[16px] font-semibold text-[#001c3e] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]"
                  type="button"
                >
                  $ Recarga rapida
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-3 rounded-2xl border border-[#dce6f2] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06)] md:min-h-0 md:overflow-hidden">
            <div>
              <h2 className="text-[14px] font-bold uppercase tracking-[0.42px] text-[#00142c]">Mapa operacional</h2>
              <p className="mt-1 text-xs text-[#45556c]">Estado en tiempo real de todos los puntos de venta</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {mapFilters.map((filterItem) => {
                const markerTone = mapFilterToMarkerTone[filterItem.id];
                const isActive = selectedTone === markerTone;

                return (
                  <button
                    key={filterItem.id}
                    onClick={() => setSelectedTone((previous) => (previous === markerTone ? "all" : markerTone))}
                    type="button"
                  >
                    <StatusPill
                      count={markerCountByTone[markerTone]}
                      label={filterItem.label}
                      tone={filterItem.tone}
                    />
                    <span className={cn("block h-[2px] rounded-full transition", isActive ? "bg-[#001c3e]" : "bg-transparent")} />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <label className="flex h-10 flex-1 items-center gap-3 rounded-lg bg-[#f8fafc] px-4 text-[#717182]">
                <Search className="h-4 w-4" />
                <input
                  className="w-full border-none bg-transparent text-sm text-[#314158] outline-none placeholder:text-[#717182]"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar ubicaciones..."
                  type="text"
                  value={query}
                />
              </label>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#f8fafc] text-[#62748e]"
                onClick={() => {
                  setQuery("");
                  setSelectedTone("all");
                }}
                type="button"
              >
                <Filter className="h-4 w-4" />
              </button>
            </div>

            <div className="relative h-[292px] overflow-hidden rounded-[14px] border border-[#a8b4c4] bg-[#edf2f7] md:h-[320px]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8fafc_0%,#e2e8f0_100%)]" />
              <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(45deg,#cbd5e1_1px,transparent_1px),linear-gradient(-45deg,#cbd5e1_1px,transparent_1px)] [background-position:0_0,0_10px] [background-size:34px_34px]" />
              <div className="absolute -left-6 top-[-20px] h-[430px] w-[5px] rounded-full bg-[#9ac6dd] rotate-[12deg]" />
              <div className="absolute left-[42%] top-[-10px] h-[430px] w-[2px] rounded-full bg-[#8bb8d0] rotate-[6deg]" />
              <div className="absolute bottom-10 left-[-20px] h-[12px] w-[260px] rounded-full bg-[#9eb7cf] rotate-[18deg]" />
              <p className="absolute left-[42%] top-[44%] -translate-x-1/2 rotate-[84deg] text-[10px] text-[#62748e]">
                Blvd. Kuwait
              </p>
              <p className="absolute bottom-4 left-4 text-[10px] text-[#62748e]">Cascadas Mall</p>
              <p className="absolute bottom-6 right-3 text-[10px] text-[#62748e]">Expresso Banco Central</p>

              {visibleMarkers.map((marker) => (
                <button
                  className={cn(
                    "absolute inline-flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-[0_10px_15px_rgba(0,0,0,0.16)] transition",
                    markerColorByTone[marker.tone],
                    selectedMarkerId === marker.id ? "scale-110 ring-2 ring-white" : "hover:scale-105"
                  )}
                  key={marker.id}
                  onClick={() => setSelectedMarkerId(marker.id)}
                  style={{ left: marker.left, top: marker.top }}
                  type="button"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-white/75" />
                </button>
              ))}

              {selectedMarker ? (
                <article className="absolute right-3 top-3 w-[220px] rounded-xl border border-[#dbe4ef] bg-white p-3 shadow-[0_12px_24px_-14px_rgba(0,0,0,0.4)]">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-[#0f172b]">{selectedMarker.agent}</p>
                      <p className="text-xs text-[#64748b]">{selectedMarker.code}</p>
                    </div>
                    <button
                      aria-label="Cerrar detalle de marcador"
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f1f5f9] text-[#64748b]"
                      onClick={() => setSelectedMarkerId(null)}
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-[#475569]">{selectedMarker.location}</p>
                  <Link
                    className="mt-3 block w-full rounded-full bg-[#001c3e] px-3 py-1.5 text-center text-xs font-semibold text-white"
                    to="/agents"
                  >
                    Ver detalle
                  </Link>
                </article>
              ) : null}
            </div>
          </section>
        </div>

        <aside className="space-y-4 md:grid md:min-h-0 md:grid-rows-[minmax(0,1fr)_auto] md:overflow-hidden">
          <section className="rounded-2xl border border-[#d8e3f2] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <h2 className="text-[14px] font-bold uppercase tracking-[0.42px] text-[#00142c]">Top agentes</h2>
            <div className="mt-3 space-y-3">
              {topAgents.map((agent) => (
                <AgentSummaryCard agent={agent} key={agent.id} onOpen={setSelectedAgent} />
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#d8e3f2] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <h2 className="text-[14px] font-bold uppercase tracking-[0.42px] text-[#00142c]">Acciones soporte</h2>
            <div className="mt-3 space-y-2">
              {operationalQueue.map((item) => (
                <Link
                  className="block w-full rounded-xl border border-[#dbe4ef] bg-[#f8fafc] px-3 py-2 text-left text-sm text-[#334155] transition hover:border-[#9ec7ff] hover:bg-[#eef6ff]"
                  key={item.id}
                  to={item.to}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <AgentDetailModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} open={selectedAgent !== null} />
      <DashboardInsightModal
        cardId={activeInsightCardId}
        onClose={() => setActiveInsightCardId(null)}
        open={activeInsightCardId !== null}
        operatorScope={operatorProfile.scope}
      />
      <OperatorShareQrModal open={isShareQrOpen} onClose={() => setIsShareQrOpen(false)} />
    </div>
  );
}
