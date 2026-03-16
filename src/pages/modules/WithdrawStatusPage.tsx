import { useMemo } from "react";

import { ModuleScaffold } from "../../components/modules/ModuleScaffold";
import {
  withdrawStatusLabel,
  withdrawStatusTransitions,
  type WithdrawCase,
  type WithdrawWorkflowStatus
} from "../../data/opa";
import { cn } from "../../lib/cn";
import { useOperations } from "../../state/OperationsContext";

const statusBadgeClass: Record<WithdrawWorkflowStatus, string> = {
  SOLICITADO: "bg-[#fff8d8] text-[#8b6f00]",
  EN_REVISION: "bg-[#eaf2ff] text-[#155dfc]",
  APROBADO: "bg-[#eaf8ea] text-[#1a9d38]",
  RECHAZADO: "bg-[#ffe8f0] text-[#be123c]",
  ANULADO: "bg-[#f3f4f6] text-[#374151]",
  PAGADO: "bg-[#edf8ea] text-[#1a9d38]"
};

const actionLabel: Record<WithdrawWorkflowStatus, string> = {
  SOLICITADO: "Marcar solicitado",
  EN_REVISION: "Enviar a revisión",
  APROBADO: "Aprobar retiro",
  RECHAZADO: "Rechazar retiro",
  ANULADO: "Anular retiro",
  PAGADO: "Marcar pagado"
};

function summarizeByStatus(cases: WithdrawCase[]): Array<{ id: WithdrawWorkflowStatus; count: number }> {
  return (Object.keys(withdrawStatusLabel) as WithdrawWorkflowStatus[]).map((status) => ({
    id: status,
    count: cases.filter((item) => item.status === status).length
  }));
}

export function WithdrawStatusPage(): JSX.Element {
  const { transitionWithdraw, withdrawCases } = useOperations();
  const summary = useMemo(() => summarizeByStatus(withdrawCases), [withdrawCases]);

  return (
    <ModuleScaffold
      subtitle="Monitorea y ejecuta transiciones válidas en retiros con trazabilidad operativa."
      title="Aprobación de retiros"
    >
      <div className="space-y-3 lg:space-y-4">
        <section className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-6">
          {summary.map((status) => (
            <article className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-2 md:p-3" key={status.id}>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#64748b]">{withdrawStatusLabel[status.id]}</p>
              <p className="mt-1 text-[22px] font-bold leading-none text-[#0f172b] md:text-[26px]">{status.count}</p>
            </article>
          ))}
        </section>

        <section className="space-y-2 md:space-y-3">
          {withdrawCases.map((request) => {
            const transitions = withdrawStatusTransitions[request.status];

            return (
              <article className="rounded-xl border border-[#e2e8f0] bg-white p-3 md:p-4" key={request.id}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-[#0f172b] md:text-base">{request.id}</p>
                    <p className="text-xs text-[#64748b] md:text-sm">
                      {request.agent} · {request.subNetwork}
                    </p>
                  </div>
                  <span className={cn("rounded-full px-2 py-[2px] text-xs font-semibold", statusBadgeClass[request.status])}>
                    {withdrawStatusLabel[request.status]}
                  </span>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2 text-xs md:grid-cols-4 md:text-sm">
                  <div>
                    <p className="text-[#64748b]">Monto</p>
                    <p className="font-semibold text-[#0f172b]">{request.amount}</p>
                  </div>
                  <div>
                    <p className="text-[#64748b]">Prioridad</p>
                    <p className="font-semibold capitalize text-[#0f172b]">{request.priority}</p>
                  </div>
                  <div>
                    <p className="text-[#64748b]">Responsable</p>
                    <p className="font-semibold text-[#0f172b]">{request.assignee}</p>
                  </div>
                  <div>
                    <p className="text-[#64748b]">Última actualización</p>
                    <p className="font-semibold text-[#0f172b]">{request.updatedAt}</p>
                  </div>
                </div>

                {request.note ? <p className="mt-2 text-xs text-[#475569] md:text-sm">{request.note}</p> : null}

                <div className="mt-3 flex flex-wrap gap-2">
                  {transitions.length === 0 ? (
                    <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#64748b]">
                      Flujo cerrado
                    </span>
                  ) : (
                    transitions.map((targetStatus) => (
                      <button
                        className="rounded-full border border-[#dbe4ef] bg-white px-3 py-1 text-xs font-semibold text-[#334155] transition hover:border-[#93c5fd] hover:bg-[#eef6ff]"
                        key={targetStatus}
                        onClick={() =>
                          transitionWithdraw({
                            caseId: request.id,
                            nextStatus: targetStatus,
                            actor: "operador.web",
                            note: `Transición aplicada: ${withdrawStatusLabel[targetStatus]}`
                          })
                        }
                        type="button"
                      >
                        {actionLabel[targetStatus]}
                      </button>
                    ))
                  )}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </ModuleScaffold>
  );
}
