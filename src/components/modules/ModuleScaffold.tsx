import type { PropsWithChildren } from "react";

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ModuleScaffoldProps extends PropsWithChildren {
  title: string;
  subtitle: string;
}

export function ModuleScaffold({
  title,
  subtitle,
  children
}: ModuleScaffoldProps): JSX.Element {
  return (
    <div className="space-y-4 pb-3 md:space-y-5 md:pb-5 xl:flex xl:min-h-[calc(100vh-240px)] xl:flex-col xl:pb-0">
      <header className="space-y-1">
        <Link
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2px] text-[#155dfc]"
          to="/support"
        >
          <ArrowLeft className="h-4 w-4" />
          Soporte
        </Link>
        <h1 className="text-[14px] font-bold uppercase tracking-[0.42px] text-[#00142c]">{title}</h1>
        <p className="text-xs text-[#45556c]">{subtitle}</p>
      </header>

      <section className="rounded-[14px] border border-[#e2e8f0] bg-white p-3 shadow-[0_1px_2px_rgba(15,23,43,0.08)] md:p-4 xl:flex-1 xl:overflow-y-auto">
        {children}
      </section>
    </div>
  );
}
