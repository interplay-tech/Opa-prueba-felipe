import { ChevronLeft, Circle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

import { operatorProfile } from "../data/opa";
import { cn } from "../lib/cn";

const operatorAvatarAsset = "/assets/figma/webp/avatar-operator.webp";

const statusClassByTone = {
  muted: "bg-[#a3a3a3] text-white",
  active: "bg-[#46eb53] text-[#002d0e]"
} as const;

export function ProfilePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#e8ecf7] px-3 py-3 md:px-5 md:py-5">
      <div className="mx-auto max-w-[430px] space-y-4 md:max-w-[980px] md:space-y-5">
        <header className="flex items-start justify-between gap-3">
          <Link
            aria-label="Volver al dashboard"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#022f65] text-white"
            to="/dashboard"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>

          <button
            className="inline-flex items-center gap-2 rounded-full bg-[#a3a3a3] px-4 py-2 text-sm font-semibold text-[#111827]"
            type="button"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </header>

        <section className="rounded-2xl border border-[#dbe4ef] bg-white p-5 text-center shadow-[0_1px_3px_rgba(15,23,43,0.08)] md:p-6">
          <div className="mx-auto inline-flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-[#00b7e3] text-[28px] font-bold text-white shadow-[0_8px_22px_-12px_rgba(0,0,0,0.35)]">
            <img alt="Avatar operador" className="h-full w-full object-cover" src={operatorAvatarAsset} />
          </div>

          <h1 className="mt-4 text-[34px] font-bold leading-9 text-[#00142c] md:text-[38px]">{operatorProfile.name}</h1>
          <p className="mt-1 text-[20px] text-[#334155]">{operatorProfile.code}</p>

          <span
            className={cn(
              "mt-3 inline-flex items-center gap-1 rounded-xl px-3 py-1 text-base font-semibold",
              statusClassByTone[operatorProfile.statusTone]
            )}
          >
            <Circle className="h-2.5 w-2.5 fill-current" />
            {operatorProfile.status}
          </span>
        </section>

        <section className="rounded-2xl border border-[#dbe4ef] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,43,0.08)] md:p-6">
          <h2 className="text-[14px] font-bold uppercase tracking-[0.42px] text-[#00142c]">Información personal</h2>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {operatorProfile.fields.map((field) => (
              <article className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3" key={field.id}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2px] text-[#64748b]">{field.label}</p>
                <p className="mt-1 text-base font-medium text-[#0f172b]">{field.value}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
