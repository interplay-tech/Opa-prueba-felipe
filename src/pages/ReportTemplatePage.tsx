import { ArrowLeft, CalendarDays, Download, Filter, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { cn } from "../lib/cn";
import { reportCatalogItems, reportTemplates, type ReportTemplateRow } from "../data/opa";

const rowStatusClass: Record<ReportTemplateRow["status"], string> = {
  success: "bg-[#eaf8ea] text-[#1a9d38]",
  pending: "bg-[#fff8d8] text-[#8b6f00]",
  alert: "bg-[#ffe8f0] text-[#be123c]"
};

const metricToneClass = {
  default: "border-[#dce6f2] bg-white text-[#0f172b]",
  positive: "border-[#b9f8cf] bg-[#f3fff5] text-[#0f172b]",
  warning: "border-[#ffe5b5] bg-[#fff8e6] text-[#0f172b]"
} as const;

export function ReportTemplatePage(): JSX.Element {
  const { reportId = "" } = useParams();
  const template = reportTemplates[reportId];
  const report = reportCatalogItems.find((item) => item.id === reportId);

  if (!template || !report) {
    return (
      <div className="space-y-4 pb-3 lg:pb-6">
        <Link
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2px] text-[#155dfc]"
          to="/reports"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a reportes
        </Link>
        <section className="rounded-2xl border border-[#dce6f2] bg-white p-6">
          <h1 className="text-[14px] font-bold uppercase tracking-[0.42px] text-[#00142c]">Reporte no encontrado</h1>
          <p className="mt-2 text-sm text-[#475569]">No se pudo cargar la plantilla solicitada.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-3 md:space-y-5 md:pb-5 lg:pb-6">
      <section className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <Link
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2px] text-[#155dfc]"
            to="/reports"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a reportes
          </Link>
          <h1 className="text-[14px] font-bold uppercase tracking-[0.42px] text-[#00142c]">{template.title}</h1>
          <p className="max-w-[560px] text-xs leading-5 text-[#45556c]">{template.subtitle}</p>
        </div>

        <img
          alt={report.title}
          className="hidden h-[58px] w-[58px] rounded-2xl border border-[#dce6f2] bg-white p-1 drop-shadow-[-7px_6px_20px_rgba(0,183,227,0.2)] lg:block"
          src={report.iconUrl}
        />
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {template.metrics.map((metric) => (
          <article
            className={cn(
              "rounded-2xl border p-4 shadow-[0_1px_2px_rgba(15,23,43,0.05)]",
              metricToneClass[metric.tone]
            )}
            key={metric.id}
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[#64748b]">{metric.label}</p>
            <p className="mt-2 text-[26px] font-bold leading-none">{metric.value}</p>
          </article>
        ))}
      </section>

      <div className="space-y-4 xl:grid xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start xl:gap-5 xl:space-y-0">
        <section className="space-y-3 rounded-2xl border border-[#dce6f2] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,43,0.08)]">
          <header className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-[14px] font-bold uppercase tracking-[0.3px] text-[#00142c]">Datos del reporte</h2>

            <div className="flex items-center gap-2">
              <button
                className="inline-flex items-center gap-2 rounded-full border border-[#dbe4ef] bg-white px-3 py-1.5 text-xs font-semibold text-[#334155]"
                type="button"
              >
                <CalendarDays className="h-3.5 w-3.5" />
                Últimos 30 días
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-full border border-[#dbe4ef] bg-white px-3 py-1.5 text-xs font-semibold text-[#334155]"
                type="button"
              >
                <Download className="h-3.5 w-3.5" />
                Exportar
              </button>
            </div>
          </header>

          <div className="flex items-center gap-2">
            <label className="flex h-10 flex-1 items-center gap-3 rounded-lg bg-[#f8fafc] px-4 text-[#717182]">
              <Search className="h-4 w-4" />
              <input
                className="w-full border-none bg-transparent text-sm text-[#314158] outline-none placeholder:text-[#717182]"
                placeholder="Buscar por agente, transacción o código"
                type="text"
              />
            </label>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#f8fafc] text-[#62748e]"
              type="button"
            >
              <Filter className="h-4 w-4" />
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#e7eef8]">
            {template.rows.map((row, index) => (
              <article
                className={cn(
                  "flex items-center justify-between gap-3 bg-white px-4 py-3",
                  index < template.rows.length - 1 ? "border-b border-[#e7eef8]" : ""
                )}
                key={row.id}
              >
                <div>
                  <p className="text-sm font-semibold text-[#0f172b]">{row.primary}</p>
                  <p className="text-xs text-[#64748b]">{row.secondary}</p>
                </div>
                <div className="text-right">
                  <span className={cn("rounded-full px-2 py-[2px] text-[11px] font-semibold", rowStatusClass[row.status])}>
                    {row.status === "success" ? "Exitoso" : row.status === "pending" ? "Pendiente" : "Alerta"}
                  </span>
                  <p className="mt-1 text-sm font-bold text-[#0f172b]">{row.amount}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-3 rounded-2xl border border-[#dce6f2] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,43,0.08)]">
          <h2 className="text-[14px] font-bold uppercase tracking-[0.3px] text-[#00142c]">Opciones de plantilla</h2>
          <div className="space-y-2">
            {template.options.map((option) => (
              <button
                className={cn(
                  "w-full rounded-xl border px-3 py-3 text-left transition",
                  option.enabled
                    ? "border-[#a7d7ff] bg-[#eef7ff]"
                    : "border-[#dbe4ef] bg-[#f8fafc]"
                )}
                key={option.id}
                type="button"
              >
                <p className="text-sm font-semibold text-[#0f172b]">{option.label}</p>
                <p className="mt-1 text-xs text-[#64748b]">{option.hint}</p>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
