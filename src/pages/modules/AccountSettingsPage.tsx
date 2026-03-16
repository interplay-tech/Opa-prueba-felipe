import { ModuleScaffold } from "../../components/modules/ModuleScaffold";
import { accountSettings } from "../../data/opa";

export function AccountSettingsPage(): JSX.Element {
  return (
    <ModuleScaffold
      subtitle="Parámetros de seguridad, reglas de comisión y preferencias de la cuenta."
      title="Configuración de cuenta"
    >
      <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
        {accountSettings.map((setting) => (
          <article className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3" key={setting.id}>
            <p className="text-sm font-semibold text-[#0f172b]">{setting.label}</p>
            <p className="mt-1 text-xs text-[#64748b]">{setting.value}</p>
          </article>
        ))}
      </div>
    </ModuleScaffold>
  );
}
