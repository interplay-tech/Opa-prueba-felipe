import { ModuleScaffold } from "../../components/modules/ModuleScaffold";
import { withdrawStatusLabel } from "../../data/opa";
import { useOperations } from "../../state/OperationsContext";

export function WithdrawCancelPage(): JSX.Element {
  const { transitionWithdraw, withdrawCases } = useOperations();

  const cancellable = withdrawCases.filter(
    (item) => item.status === "SOLICITADO" || item.status === "EN_REVISION"
  );

  return (
    <ModuleScaffold subtitle="Anula retiros solo en estados permitidos antes del pago." title="Anulación de retiros">
      <div className="space-y-2 md:space-y-3">
        {cancellable.length === 0 ? (
          <article className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 text-sm text-[#475569]">
            No hay retiros anulables en este momento.
          </article>
        ) : (
          cancellable.map((request) => (
            <article className="rounded-xl border border-[#ffe2e2] bg-[#fff7f9] p-3 md:p-4" key={request.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-[#0f172b]">{request.id}</p>
                  <p className="text-xs text-[#64748b] md:text-sm">
                    {request.agent} · {request.subNetwork}
                  </p>
                </div>
                <span className="rounded-full bg-white px-2 py-[2px] text-xs font-semibold text-[#be123c]">
                  {withdrawStatusLabel[request.status]}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-[#0f172b]">{request.amount}</p>
                <button
                  className="rounded-full bg-[#f54180] px-3 py-1 text-xs font-semibold text-white"
                  onClick={() =>
                    transitionWithdraw({
                      caseId: request.id,
                      nextStatus: "ANULADO",
                      actor: "operador.web",
                      note: "Anulación operativa ejecutada por operador."
                    })
                  }
                  type="button"
                >
                  Anular retiro
                </button>
              </div>

              {request.note ? <p className="mt-2 text-xs text-[#475569] md:text-sm">{request.note}</p> : null}
            </article>
          ))
        )}
      </div>
    </ModuleScaffold>
  );
}
