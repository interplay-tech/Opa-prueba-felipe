import { useEffect, useMemo, useState } from "react";

import { CalendarDays, Filter, RotateCcw, X } from "lucide-react";
import { Link } from "react-router-dom";

import {
  dashboardInsightPeriodOptions,
  getDashboardInsightModule,
  type DashboardInsightCardId,
  type DashboardInsightSection
} from "../../data/dashboardInsights";
import type { OperatorScope } from "../../data/opa";
import { cn } from "../../lib/cn";

const summaryToneClass = {
  neutral: "border-[#dbe4ef] bg-white",
  positive: "border-[#bbf7d0] bg-[#f3fff7]",
  warning: "border-[#fde68a] bg-[#fffbeb]",
  danger: "border-[#fecdd3] bg-[#fff1f2]"
} as const;

const deltaToneClass = {
  positive: "text-[#15803d]",
  negative: "text-[#dc2626]",
  neutral: "text-[#334155]"
} as const;

const severityClass = {
  critical: "bg-[#ffe2e2] text-[#c10007]",
  warning: "bg-[#fef9c2] text-[#a65f00]"
} as const;

const quickRechargeStatusClass = {
  critical: "bg-[#ffe2e2] text-[#c10007]",
  warning: "bg-[#fef9c2] text-[#a65f00]",
  ok: "bg-[#dcfce7] text-[#166534]"
} as const;

interface DashboardInsightModalProps {
  open: boolean;
  cardId: DashboardInsightCardId | null;
  operatorScope: OperatorScope;
  onClose: () => void;
}

function renderSection(section: DashboardInsightSection): JSX.Element {
  if (section.type === "list") {
    return (
      <section className="space-y-2" key={section.id}>
        <div>
          <h3 className="text-[14px] font-bold text-[#0f172b]">{section.title}</h3>
          {section.subtitle ? <p className="mt-1 text-xs text-[#62748e]">{section.subtitle}</p> : null}
        </div>
        <div className="overflow-hidden rounded-xl border border-[#e2e8f0]">
          {section.items.map((item, index) => (
            <article
              className={cn("flex items-center justify-between gap-3 bg-white px-3 py-3", index < section.items.length - 1 ? "border-b border-[#edf2f7]" : "")}
              key={item.id}
            >
              <div>
                <p className="text-sm font-semibold text-[#0f172b]">{item.label}</p>
                {item.hint ? <p className="text-xs text-[#64748b]">{item.hint}</p> : null}
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#0f172b]">{item.value}</p>
                {item.delta ? (
                  <p className={cn("text-xs font-semibold", deltaToneClass[item.deltaTone ?? "neutral"])}>{item.delta}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "progress") {
    return (
      <section className="space-y-2" key={section.id}>
        <div>
          <h3 className="text-[14px] font-bold text-[#0f172b]">{section.title}</h3>
          {section.subtitle ? <p className="mt-1 text-xs text-[#62748e]">{section.subtitle}</p> : null}
        </div>
        <div className="space-y-2 rounded-xl border border-[#e2e8f0] bg-white p-3">
          {section.items.map((item) => (
            <article className="space-y-1" key={item.id}>
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-semibold text-[#0f172b]">{item.label}</p>
                <p className="text-sm font-bold text-[#7e22ce]">{item.value}</p>
              </div>
              <p className="text-xs text-[#64748b]">{item.hint}</p>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#e2e8f0]">
                <div className="h-full rounded-full bg-[#9333ea]" style={{ width: `${item.progress}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "quick-recharge") {
    return (
      <section className="space-y-2" key={section.id}>
        <div>
          <h3 className="text-[14px] font-bold text-[#0f172b]">{section.title}</h3>
          {section.subtitle ? <p className="mt-1 text-xs text-[#62748e]">{section.subtitle}</p> : null}
        </div>
        <div className="space-y-2">
          {section.items.map((item) => (
            <article className="rounded-xl border border-[#e2e8f0] bg-white p-3 shadow-[0_1px_3px_rgba(15,23,43,0.08)]" key={item.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-[#0f172b]">{item.agentName}</p>
                  <p className="text-xs text-[#64748b]">{item.network}</p>
                </div>
                <span className={cn("rounded-full px-2 py-[2px] text-xs font-semibold", quickRechargeStatusClass[item.status])}>
                  {item.status === "critical" ? "Crítico" : item.status === "warning" ? "Advertencia" : "Estable"}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
                <div>
                  <p className="text-xs text-[#62748e]">Saldo actual</p>
                  <p className="text-[30px] font-bold leading-none text-[#0f172b]">{item.currentBalance}</p>
                  <p className="mt-1 text-xs text-[#90a1b9]">Recarga sugerida: {item.suggestedRecharge}</p>
                </div>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-[10px] bg-gradient-to-r from-[#95fb3f] to-[#46fc6d] px-4 text-sm font-semibold text-[#001c3e] transition hover:brightness-95"
                  to={item.actionTo}
                >
                  {item.actionLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-2" key={section.id}>
      <div>
        <h3 className="text-[14px] font-bold text-[#0f172b]">{section.title}</h3>
        {section.subtitle ? <p className="mt-1 text-xs text-[#62748e]">{section.subtitle}</p> : null}
      </div>
      <div className="space-y-2">
        {section.items.map((item) => (
          <article className="rounded-xl border border-[#e2e8f0] bg-white p-3 shadow-[0_1px_3px_rgba(15,23,43,0.08)]" key={item.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-[#0f172b]">{item.pointName}</p>
                <p className="text-xs text-[#64748b]">Última recarga: {item.lastRecharge}</p>
              </div>
              <span className={cn("rounded-full px-2 py-[2px] text-xs font-semibold", severityClass[item.severity])}>
                {item.severity === "critical" ? "Crítico" : "Bajo"}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
              <div>
                <p className="text-xs text-[#62748e]">Saldo actual</p>
                <p className="text-[30px] font-bold leading-none text-[#0f172b]">{item.currentBalance}</p>
                <p className="mt-1 text-xs text-[#90a1b9]">Mínimo requerido: {item.minimumRequired}</p>
              </div>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-[10px] bg-[#f54900] px-4 text-sm font-semibold text-white transition hover:brightness-95"
                to={item.actionTo}
              >
                {item.actionLabel}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DashboardInsightModal({
  open,
  cardId,
  operatorScope,
  onClose
}: DashboardInsightModalProps): JSX.Element | null {
  const [periodIndex, setPeriodIndex] = useState(0);

  const module = useMemo(
    () => (cardId ? getDashboardInsightModule(operatorScope, cardId) : null),
    [cardId, operatorScope]
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  useEffect(() => {
    setPeriodIndex(0);
  }, [cardId]);

  if (!open || !module) {
    return null;
  }

  const selectedPeriod = dashboardInsightPeriodOptions[periodIndex] ?? dashboardInsightPeriodOptions[0];

  return (
    <div
      className="fixed inset-0 z-[70] bg-[rgba(15,23,43,0.55)] p-2 backdrop-blur-[3px] sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <div className="mx-auto flex h-full w-full max-w-[920px] items-end sm:items-center">
        <section
          aria-modal="true"
          className="w-full overflow-hidden rounded-t-[22px] bg-white shadow-[0_32px_60px_-22px_rgba(0,0,0,0.45)] sm:rounded-[20px]"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          tabIndex={-1}
        >
          <header className="flex items-start justify-between gap-3 border-b border-[#e2e8f0] px-4 py-4 sm:px-5">
            <div>
              <h2 className="text-[16px] font-bold text-[#0f172b]">{module.title}</h2>
              <p className="mt-1 text-xs text-[#64748b]">{module.subtitle}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#155dfc]">{module.roleHint}</p>
            </div>
            <button
              aria-label="Cerrar panel"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f8fafc] text-[#64748b]"
              onClick={onClose}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="max-h-[82dvh] space-y-4 overflow-y-auto px-4 pb-5 pt-4 sm:max-h-[86dvh] sm:px-5 sm:pt-5">
            <section className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f172b]">
                  <Filter className="h-4 w-4 text-[#64748b]" />
                  Filtrar por fecha
                </div>
                <button
                  className="inline-flex items-center gap-1 rounded-lg border border-[#cad5e2] bg-white px-3 py-1.5 text-xs font-medium text-[#45556c]"
                  onClick={() => setPeriodIndex(0)}
                  type="button"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Restablecer
                </button>
              </div>

              <button
                className="mt-3 flex h-11 w-full items-center justify-between rounded-lg border border-[#cad5e2] bg-white px-3 text-sm text-[#0f172b]"
                onClick={() => setPeriodIndex((current) => (current + 1) % dashboardInsightPeriodOptions.length)}
                type="button"
              >
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#64748b]" />
                  {selectedPeriod}
                </span>
                <span className="text-xs font-medium text-[#62748e]">Click para cambiar</span>
              </button>
            </section>

            <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {module.summary.map((item) => (
                <article className={cn("rounded-xl border p-3", summaryToneClass[item.tone])} key={item.id}>
                  <p className="text-xs font-medium text-[#64748b]">{item.label}</p>
                  <p className="mt-1 text-[30px] font-bold leading-none text-[#0f172b]">{item.value}</p>
                  {item.hint ? <p className="mt-1 text-xs text-[#64748b]">{item.hint}</p> : null}
                </article>
              ))}
            </section>

            <div className="space-y-4 pb-1">{module.sections.map((section) => renderSection(section))}</div>
          </div>
        </section>
      </div>
    </div>
  );
}
