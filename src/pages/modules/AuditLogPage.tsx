import { ModuleScaffold } from "../../components/modules/ModuleScaffold";
import { useOperations } from "../../state/OperationsContext";

export function AuditLogPage(): JSX.Element {
  const { auditEvents } = useOperations();

  return (
    <ModuleScaffold subtitle="Bitácora de acciones críticas para seguimiento y cumplimiento." title="Bitácora de auditoría">
      <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
        {auditEvents.map((event) => (
          <article className="rounded-xl border border-[#e2e8f0] bg-white p-3" key={event.id}>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#64748b]">{event.id}</p>
            <p className="mt-1 text-sm font-semibold text-[#0f172b]">{event.action}</p>
            <p className="text-xs text-[#475569]">{event.target}</p>
            <p className="mt-2 text-xs text-[#64748b]">
              {event.actor} · {event.timestamp}
            </p>
          </article>
        ))}
      </div>
    </ModuleScaffold>
  );
}
