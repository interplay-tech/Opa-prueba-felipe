import { ModuleScaffold } from "../../components/modules/ModuleScaffold";
import { rechargeMethods } from "../../data/opa";

export function RechargeMethodsPage(): JSX.Element {
  return (
    <ModuleScaffold
      subtitle="Configura y supervisa los canales disponibles para recargar saldo."
      title="Métodos de recarga"
    >
      <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
        {rechargeMethods.map((method) => (
          <article className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3" key={method.id}>
            <p className="text-sm font-semibold text-[#0f172b]">{method.name}</p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-[#64748b]">Comisión</p>
                <p className="font-semibold text-[#0f172b]">{method.fee}</p>
              </div>
              <div>
                <p className="text-[#64748b]">Tiempo</p>
                <p className="font-semibold text-[#0f172b]">{method.eta}</p>
              </div>
              <div>
                <p className="text-[#64748b]">Estado</p>
                <p className="font-semibold text-[#155dfc]">{method.status}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ModuleScaffold>
  );
}
