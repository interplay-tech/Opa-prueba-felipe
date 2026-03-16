import { ModuleScaffold } from "../../components/modules/ModuleScaffold";
import { betsHistory } from "../../data/opa";

export function BetsHistoryPage(): JSX.Element {
  return (
    <ModuleScaffold
      subtitle="Rendimiento de apuestas por agente para seguimiento comercial."
      title="Historial de apuestas"
    >
      <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
        {betsHistory.map((bet) => (
          <article className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3" key={bet.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-[#0f172b]">{bet.agent}</p>
                <p className="text-xs text-[#64748b]">{bet.id}</p>
              </div>
              <span className="rounded-full bg-[#edf8ea] px-2 py-[2px] text-xs font-semibold text-[#1a9d38]">
                {bet.ratio}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-[#64748b]">Tickets</p>
                <p className="font-semibold text-[#0f172b]">{bet.tickets}</p>
              </div>
              <div>
                <p className="text-[#64748b]">Total</p>
                <p className="font-semibold text-[#0f172b]">{bet.total}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ModuleScaffold>
  );
}
