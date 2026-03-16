import { ModuleScaffold } from "../../components/modules/ModuleScaffold";
import { transactionHistory } from "../../data/opa";

export function TransactionsHistoryPage(): JSX.Element {
  return (
    <ModuleScaffold
      subtitle="Auditoría de movimientos financieros y operativos por agente."
      title="Historial de transacciones"
    >
      <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
        {transactionHistory.map((transaction) => (
          <article className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3" key={transaction.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-[#0f172b]">{transaction.type}</p>
                <p className="text-xs text-[#64748b]">{transaction.id} · {transaction.agent}</p>
              </div>
              <p className="text-xs text-[#64748b]">{transaction.date}</p>
            </div>
            <p className="mt-2 text-sm font-semibold text-[#155dfc]">{transaction.amount}</p>
          </article>
        ))}
      </div>
    </ModuleScaffold>
  );
}
