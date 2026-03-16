import { useMemo, useState } from "react";

import { ArrowUpRight, MessageCircle, Search, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

import {
  supportFeaturedArticle,
  supportMessages,
  supportQuickLinks,
  type SupportTab,
  withdrawStatusLabel
} from "../data/opa";
import { cn } from "../lib/cn";
import { useOperations } from "../state/OperationsContext";

const tabActiveClass: Record<SupportTab, string> = {
  playbooks: "bg-[#00b7e3] text-[#00142c]",
  tickets: "bg-[#001c3e] text-white",
  escalations: "bg-[#f54180] text-white"
};

const ticketStatusClass = {
  SOLICITADO: "bg-[#fff8d8] text-[#8b6f00]",
  EN_REVISION: "bg-[#eaf2ff] text-[#155dfc]",
  APROBADO: "bg-[#eaf8ea] text-[#1a9d38]",
  RECHAZADO: "bg-[#ffe8f0] text-[#be123c]",
  ANULADO: "bg-[#f3f4f6] text-[#374151]",
  PAGADO: "bg-[#edf8ea] text-[#1a9d38]"
} as const;

export function SupportPage(): JSX.Element {
  const { operationalQueue, withdrawCases } = useOperations();
  const [tab, setTab] = useState<SupportTab>("playbooks");

  const escalatedCases = useMemo(
    () => operationalQueue.filter((item) => item.priority === "alta"),
    [operationalQueue]
  );
  const tabs = useMemo(
    () => [
      { id: "playbooks" as const, label: "Base operativa", count: supportQuickLinks.length },
      { id: "tickets" as const, label: "Tickets", count: withdrawCases.length },
      { id: "escalations" as const, label: "Escalamientos", count: escalatedCases.length }
    ],
    [escalatedCases.length, withdrawCases.length]
  );

  return (
    <div className="space-y-4 pb-3 md:space-y-5 md:pb-5 lg:space-y-6 lg:pb-6">
      <section className="space-y-1">
        <h1 className="text-[14px] font-bold uppercase tracking-[0.42px] text-[#00142c]">SOPORTE OPERATIVO</h1>
      </section>

      <div className="space-y-4 xl:grid xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start xl:gap-5 xl:space-y-0">
        <div className="space-y-4">
          <section className="rounded-[2px] border-[3px] border-[#14b8ff] bg-[#e8ecf7] p-1">
            <div className="rounded-[12px] bg-[#001c4a] px-5 py-6">
              <h2 className="text-[32px] font-extrabold leading-9 text-white lg:text-[36px] lg:leading-10">
                Centro de
                <br />
                Soporte OPA
              </h2>

              <button
                className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#10b6de] px-4 py-2 text-left"
                type="button"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#001c4a] text-white">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <span className="text-[15px] leading-5 text-[#00142c]">Resolver casos, escalar y documentar</span>
              </button>
            </div>
          </section>

          <section className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map((item) => {
              const isActive = tab === item.id;

              return (
                <button
                  className={cn(
                    "inline-flex h-[31px] items-center gap-1 rounded-full px-3 text-[12px] font-semibold whitespace-nowrap",
                    isActive ? tabActiveClass[item.id] : "bg-white text-[#1f2937]"
                  )}
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  type="button"
                >
                  {item.label}
                  <span className="inline-flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-white px-[3px] text-[11px] font-bold text-[#111827]">
                    {item.count}
                  </span>
                </button>
              );
            })}
          </section>

          {tab === "playbooks" ? (
            <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
              <article className="rounded-[14px] bg-white p-4">
                <span className="inline-flex rounded-full bg-[#65f74a] px-3 py-[2px] text-[12px] font-extrabold text-[#00142c]">
                  {supportFeaturedArticle.badge}
                </span>
                <h3 className="mt-3 text-[28px] font-bold leading-8 text-[#1e293b] lg:text-[32px] lg:leading-9">
                  {supportFeaturedArticle.title}
                </h3>
                <p className="mt-3 text-[13px] leading-6 text-[#475569]">{supportFeaturedArticle.description}</p>
              </article>

              <label className="flex h-10 items-center gap-3 rounded-[12px] border border-[#dbe4ef] bg-white px-3 text-[#7c8aa0] md:col-span-2">
                <Search className="h-4 w-4 text-[#1d4ed8]" />
                <input
                  className="w-full border-none bg-transparent text-sm text-[#314158] outline-none placeholder:text-[#7c8aa0]"
                  placeholder="Buscar protocolo"
                  type="text"
                />
              </label>

              <section className="overflow-hidden rounded-[14px] bg-white md:col-span-2">
                {supportQuickLinks.map((link, index) => (
                  <Link
                    className={cn(
                      "flex items-center justify-between px-4 py-4 text-[16px] font-semibold text-[#1f2937]",
                      index < supportQuickLinks.length - 1 ? "border-b border-[#e6edf6]" : "",
                      link.highlighted ? "text-[#155dfc]" : ""
                    )}
                    key={link.id}
                    to={link.to}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className={cn("h-4 w-4", link.highlighted ? "text-[#155dfc]" : "text-[#90a1b9]")} />
                  </Link>
                ))}
              </section>
            </div>
          ) : null}

          {tab === "tickets" ? (
            <section className="space-y-2">
              {withdrawCases.map((item) => (
                <article className="rounded-[14px] bg-white p-4" key={item.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2px] text-[#64748b]">{item.id}</p>
                      <p className="mt-1 text-sm font-semibold text-[#0f172b]">
                        {item.agent} · {item.subNetwork}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2 py-[2px] text-[11px] font-semibold",
                        ticketStatusClass[item.status]
                      )}
                    >
                      {withdrawStatusLabel[item.status]}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-[#64748b]">
                    <span>{item.amount}</span>
                    <span>Responsable: {item.assignee}</span>
                  </div>
                </article>
              ))}
            </section>
          ) : null}

          {tab === "escalations" ? (
            <section className="space-y-2">
              {escalatedCases.map((caseItem) => (
                <Link
                  className="block rounded-[14px] border border-[#ffd2e4] bg-white p-4"
                  key={caseItem.id}
                  to={caseItem.to}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-[#0f172b]">{caseItem.title}</p>
                    <span className="rounded-full bg-[#ffe8f0] px-2 py-[2px] text-[11px] font-semibold text-[#be123c]">
                      Alta
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#64748b]">{caseItem.detail}</p>
                  <p className="mt-2 text-xs text-[#475569]">Responsable: {caseItem.owner}</p>
                </Link>
              ))}
            </section>
          ) : null}
        </div>

        <aside className="hidden space-y-3 xl:block">
          <article className="rounded-[14px] border border-[#ffd2e4] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,43,0.08)]">
            <h2 className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-[0.3px] text-[#00142c]">
              <ShieldAlert className="h-4 w-4 text-[#f54180]" />
              Casos críticos
            </h2>
            <div className="mt-3 space-y-2">
              {escalatedCases.map((item) => (
                <Link className="block rounded-xl bg-[#fff1f6] p-3" key={item.id} to={item.to}>
                  <p className="text-sm font-semibold text-[#0f172b]">{item.title}</p>
                  <p className="mt-1 text-xs text-[#64748b]">{item.status}</p>
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-[14px] border border-[#dce6f2] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,43,0.08)]">
            <h2 className="text-[14px] font-bold uppercase tracking-[0.3px] text-[#00142c]">Mensajes recientes</h2>
            <div className="mt-3 space-y-2">
              {supportMessages.map((message) => (
                <div className="rounded-xl bg-[#f8fafc] p-3" key={message.id}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2px] text-[#64748b]">{message.from}</p>
                  <p className="mt-1 text-sm font-semibold text-[#0f172b]">{message.subject}</p>
                  <p className="mt-1 text-xs text-[#64748b]">{message.time}</p>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </div>
    </div>
  );
}
