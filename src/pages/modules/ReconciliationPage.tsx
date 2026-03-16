import { ModuleScaffold } from "../../components/modules/ModuleScaffold";
import { cn } from "../../lib/cn";
import { useOperations } from "../../state/OperationsContext";

const statusClass = {
  Conciliado: "bg-[#edf8ea] text-[#1a9d38]",
  Observado: "bg-[#ffe8f0] text-[#be123c]",
  Pendiente: "bg-[#fff8d8] text-[#8b6f00]"
} as const;

export function ReconciliationPage(): JSX.Element {
  const { reconciliation, setReconciliationStatus } = useOperations();

  return (
    <ModuleScaffold subtitle="Valida comprobantes bancarios y resuelve diferencias de referencia." title="Conciliación bancaria">
      <div className="space-y-2 md:space-y-3">
        {reconciliation.map((item) => (
          <article className="rounded-xl border border-[#e2e8f0] bg-white p-3 md:p-4" key={item.id}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-[#0f172b]">{item.id}</p>
                <p className="text-xs text-[#64748b] md:text-sm">{item.bank} · Ref {item.reference}</p>
              </div>
              <span className={cn("rounded-full px-2 py-[2px] text-xs font-semibold", statusClass[item.status])}>
                {item.status}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748b] md:text-sm">
              <span>Agente: {item.agent}</span>
              <span className="font-semibold text-[#0f172b]">{item.amount}</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                className="rounded-full border border-[#dbe4ef] bg-white px-3 py-1 text-xs font-semibold text-[#334155]"
                onClick={() =>
                  setReconciliationStatus({
                    itemId: item.id,
                    nextStatus: "Conciliado",
                    actor: "tesoreria.web"
                  })
                }
                type="button"
              >
                Marcar conciliado
              </button>
              <button
                className="rounded-full border border-[#ffd2e4] bg-white px-3 py-1 text-xs font-semibold text-[#be123c]"
                onClick={() =>
                  setReconciliationStatus({
                    itemId: item.id,
                    nextStatus: "Observado",
                    actor: "tesoreria.web"
                  })
                }
                type="button"
              >
                Marcar observado
              </button>
              <button
                className="rounded-full border border-[#f6e58a] bg-white px-3 py-1 text-xs font-semibold text-[#8b6f00]"
                onClick={() =>
                  setReconciliationStatus({
                    itemId: item.id,
                    nextStatus: "Pendiente",
                    actor: "tesoreria.web"
                  })
                }
                type="button"
              >
                Dejar pendiente
              </button>
            </div>
          </article>
        ))}
      </div>
    </ModuleScaffold>
  );
}
