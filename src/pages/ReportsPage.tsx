import { Link } from "react-router-dom";

import { reportCatalogItems } from "../data/opa";

const arrowIcon = "/assets/figma/raw/report-arrow.svg";

export function ReportsPage(): JSX.Element {
  return (
    <div className="space-y-5 pb-3 md:space-y-5 md:pb-5 lg:space-y-6 lg:pb-6">
      <section className="space-y-2" data-node-id="124:391">
        <h1 className="text-[14px] font-bold uppercase tracking-[0.42px] text-[#00142c]" data-node-id="124:393">
          Reportes avanzados
        </h1>
        <p className="w-[267px] text-xs leading-4 text-[#45556c] lg:w-full lg:max-w-[480px]" data-node-id="124:395">
          Selecciona un reporte para ver los detalles
        </p>
      </section>

      <div className="space-y-4 xl:grid xl:grid-cols-[minmax(0,1fr)_290px] xl:items-start xl:gap-5 xl:space-y-0">
        <section className="space-y-5 md:grid md:grid-cols-2 md:gap-4 md:space-y-0" data-node-id="124:396">
          {reportCatalogItems.map((item) => (
            <Link
              className="flex h-[99px] w-full items-center gap-[10px] rounded-[14px] bg-white p-[15px] text-left shadow-[0_1px_2px_rgba(15,23,43,0.07)] transition hover:shadow-[0_8px_22px_-15px_rgba(0,20,48,0.45)]"
              key={item.id}
              to={`/reports/${item.id}`}
            >
              <img
                alt={item.title}
                className="h-[76px] w-[76px] shrink-0 drop-shadow-[-7px_6px_20px_rgba(0,183,227,0.2)]"
                src={item.iconUrl}
              />

              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-[16px] font-medium leading-6 tracking-[-0.3125px] text-[#0f172b]">
                  {item.title}
                </p>
                <p className="text-xs leading-5 tracking-[-0.1504px] text-[#45556c]">{item.description}</p>
              </div>

              <img alt="Ver reporte" className="h-[11px] w-[5px] shrink-0" src={arrowIcon} />
            </Link>
          ))}
        </section>

        <aside className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:block xl:space-y-3">
          <article className="rounded-2xl border border-[#dce6f2] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,43,0.08)]">
            <h2 className="text-[14px] font-bold uppercase tracking-[0.3px] text-[#00142c]">
              Reportes frecuentes
            </h2>
            <div className="mt-3 space-y-2">
              {reportCatalogItems.slice(0, 3).map((item, index) => (
                <Link
                  className="flex w-full items-center justify-between rounded-xl bg-[#f8fafc] px-3 py-2 text-left text-sm font-medium text-[#334155] transition hover:bg-[#eef6ff]"
                  key={item.id}
                  to={`/reports/${item.id}`}
                >
                  <span>{item.title}</span>
                  <span className="text-xs text-[#64748b]">#{index + 1}</span>
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-[#dce6f2] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,43,0.08)]">
            <h2 className="text-[14px] font-bold uppercase tracking-[0.3px] text-[#00142c]">
              Exportación rápida
            </h2>
            <p className="mt-2 text-xs leading-5 text-[#475569]">
              Descarga el consolidado diario o semanal para auditoría y conciliación operativa.
            </p>
            <div className="mt-3 space-y-2">
              <button
                className="w-full rounded-full bg-gradient-to-r from-[#95fb3f] to-[#46fc6d] px-4 py-2 text-sm font-semibold text-[#001c3e]"
                type="button"
              >
                Exportar diario
              </button>
              <button
                className="w-full rounded-full border border-[#1e293b] bg-white px-4 py-2 text-sm font-semibold text-[#0f172b]"
                type="button"
              >
                Exportar semanal
              </button>
            </div>
          </article>
        </aside>
      </div>
    </div>
  );
}
