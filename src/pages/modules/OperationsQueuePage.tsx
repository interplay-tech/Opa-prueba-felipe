import { Link } from "react-router-dom";

import { ModuleScaffold } from "../../components/modules/ModuleScaffold";
import { cn } from "../../lib/cn";
import { useOperations } from "../../state/OperationsContext";

const priorityClass = {
  alta: "bg-[#ffe8f0] text-[#be123c]",
  media: "bg-[#fff8d8] text-[#8b6f00]",
  baja: "bg-[#edf8ea] text-[#1a9d38]"
} as const;

const typeLabel = {
  retiro: "Retiro",
  comprobante: "Comprobante",
  alerta: "Alerta"
} as const;

export function OperationsQueuePage(): JSX.Element {
  const { operationalQueue } = useOperations();

  return (
    <ModuleScaffold subtitle="Cola unificada de casos operativos con prioridad y responsable." title="Bandeja operativa">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
        {operationalQueue.map((item) => (
          <article className="rounded-xl border border-[#e2e8f0] bg-white p-3 md:p-4" key={item.id}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-[#0f172b] md:text-base">{item.title}</p>
                <p className="text-xs text-[#64748b] md:text-sm">{item.detail}</p>
              </div>
              <span className={cn("rounded-full px-2 py-[2px] text-xs font-semibold capitalize", priorityClass[item.priority])}>
                {item.priority}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#64748b] md:text-sm">
              <span className="rounded-full bg-[#f8fafc] px-2 py-[2px]">{typeLabel[item.type]}</span>
              <span>Estado: {item.status}</span>
              <span>Responsable: {item.owner}</span>
            </div>

            <Link
              className="mt-3 inline-flex rounded-full bg-[#001c3e] px-3 py-1 text-xs font-semibold text-white"
              to={item.to}
            >
              Abrir caso
            </Link>
          </article>
        ))}
      </div>
    </ModuleScaffold>
  );
}
