import type { ComponentType } from "react";

import { FileText, Headset, LayoutGrid, Network, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "../../lib/cn";

export interface NavigationItem {
  to: string;
  label: string;
  mobileLabel?: string;
  icon: ComponentType<{ className?: string }>;
}

export const primaryNavigationItems: NavigationItem[] = [
  { to: "/dashboard", label: "Tablero", icon: LayoutGrid },
  { to: "/agents", label: "Árbol de agentes", mobileLabel: "Árbol de\nAgentes", icon: Network },
  { to: "/reports", label: "Reportes", icon: FileText },
  { to: "/support", label: "Soporte", icon: Headset }
];

export function BottomNavigation(): JSX.Element {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pb-[env(safe-area-inset-bottom)] xl:hidden" data-node-id="223:459">
      <div className="relative mx-auto h-[96px] w-full overflow-visible md:max-w-[640px] lg:max-w-[760px]">
        <img
          alt=""
          aria-hidden
          className="absolute bottom-0 left-0 h-[85px] w-full object-fill"
          src="/assets/figma/raw/bottom-nav-bg.svg"
        />

        <button
          aria-label="Abrir acciones rapidas"
          className="absolute left-1/2 top-0 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-[18px] items-center justify-center overflow-visible rounded-full border-[3px] border-[#f3f3f5] bg-gradient-to-b from-[#95fb3f] to-[#46fc6d] text-[#00142c] shadow-[0_12px_20px_-8px_rgba(0,0,0,0.35),0_0_28px_3px_rgba(124,255,77,0.42)]"
          type="button"
        >
          <span aria-hidden className="opa-fab-halo pointer-events-none absolute inset-[-8px] rounded-full bg-[#7cff4d]/30 blur-[4px]" />
          <span aria-hidden className="opa-fab-ring pointer-events-none absolute inset-0 rounded-full border-[3px] border-[#7cff4d]" />
          <span
            aria-hidden
            className="opa-fab-ring opa-fab-ring-delay pointer-events-none absolute inset-0 rounded-full border-[3px] border-[#7cff4d]"
          />
          <Plus className="opa-fab-icon relative z-10 h-6 w-6" />
        </button>

        <nav className="absolute bottom-[8px] left-0 right-0 grid grid-cols-4 gap-0.5 px-2">
          {primaryNavigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "group flex h-[60px] flex-col items-center justify-center gap-0.5 rounded-[10px] py-1 text-[10px] leading-3",
                    isActive ? "text-[#00b7e3]" : "text-white"
                  )
                }
                key={item.to}
                to={item.to}
              >
                {({ isActive }) => (
                  <>
                    <Icon className={cn("h-[22px] w-[22px]", isActive ? "stroke-[#00b7e3]" : "stroke-white")} />
                    <span className="text-center font-medium whitespace-pre-line">{item.mobileLabel ?? item.label}</span>
                    <span
                      className={cn(
                        "h-1 w-1 rounded-full bg-[#00b7e3] shadow-[0_0_4px_#00b7e3] transition-opacity",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
