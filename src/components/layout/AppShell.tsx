import { ChevronDown, Sparkles } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import { cn } from "../../lib/cn";
import { BottomNavigation, primaryNavigationItems } from "./BottomNavigation";

const operatorAvatarAsset = "/assets/figma/webp/avatar-operator.webp";

function AppHeader({
  desktop = false,
  showLogo = true,
  title
}: {
  desktop?: boolean;
  showLogo?: boolean;
  title?: string;
}): JSX.Element {
  return (
    <header className={cn("pb-3 pt-3", desktop ? "px-6 xl:px-8" : "px-3")} data-node-id="124:129">
      <div className="flex items-center justify-between">
        {showLogo ? (
          <div
            className={cn(
              "inline-flex items-center justify-center rounded-[13.6px] bg-gradient-to-r from-[#0040a0] to-[#009df6]",
              desktop ? "h-[42px] w-[104px]" : "h-[37px] w-[94px]"
            )}
          >
            <span
              className={cn(
                "font-['Nunito',sans-serif] font-black leading-none text-white",
                desktop ? "text-[38px]" : "text-[36px]"
              )}
            >
              OPA
            </span>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-[#64748b]">Panel operativo</p>
            <p className="text-[20px] font-bold leading-none text-[#0f172b]">{title ?? "Dashboard"}</p>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            className="inline-flex h-[37px] items-center gap-1 rounded-full bg-gradient-to-r from-[#95fb3f] to-[#46fc6d] pl-3 pr-2 font-semibold text-[#0f172b] shadow-[0_4px_10px_rgba(0,0,0,0.18)]"
            type="button"
          >
            <span className="text-[16px] leading-none">L 107.33</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          <Link
            aria-label="Abrir perfil del operador"
            className="inline-flex h-[37px] w-[37px] items-center justify-center overflow-hidden rounded-full border-[2px] border-white bg-[#00b7e3] text-white transition hover:brightness-105"
            to="/profile"
          >
            <img alt="Perfil del operador" className="h-full w-full object-cover" src={operatorAvatarAsset} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function AppShell(): JSX.Element {
  const location = useLocation();
  const shouldShowBottomNav = !location.pathname.startsWith("/profile");
  const headerTitle = location.pathname.startsWith("/agents")
    ? "Árbol de agentes"
    : location.pathname.startsWith("/reports")
      ? "Reportes"
      : location.pathname.startsWith("/support")
        ? "Soporte"
        : location.pathname.startsWith("/profile")
          ? "Perfil operador"
        : "Dashboard";

  return (
    <div className="min-h-screen bg-[#e8ecf7]">
      <div className="xl:hidden">
        <div className="min-h-[100dvh] w-full bg-[#e8ecf7]">
          <div className="relative flex min-h-[100dvh] flex-col">
            <AppHeader />
            <main
              className={cn(
                "flex-1 px-3 sm:px-4 md:px-5",
                shouldShowBottomNav ? "pb-[calc(118px+env(safe-area-inset-bottom))]" : "pb-5"
              )}
            >
              <Outlet />
            </main>
            {shouldShowBottomNav ? <BottomNavigation /> : null}
          </div>
        </div>
      </div>

      <div className="hidden xl:block">
        <div className="grid min-h-screen grid-cols-[300px_minmax(0,1fr)] gap-4 px-4 py-4 2xl:px-6 2xl:py-5">
          <aside className="flex flex-col rounded-[30px] bg-[#001c3e] p-5 text-white shadow-[0_30px_70px_-36px_rgba(0,0,0,0.75)]">
            <div>
              <div className="inline-flex h-[46px] w-[124px] items-center justify-center rounded-[16px] bg-gradient-to-r from-[#0040a0] to-[#009df6]">
                <span className="font-['Nunito',sans-serif] text-[42px] font-black leading-none text-white">OPA</span>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[#8db4e6]">Operator Platform</p>
            </div>

            <div className="mt-7 rounded-2xl border border-[#123a69] bg-[#012655] px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#6ca5e4]">Disponible</p>
              <p className="mt-1 text-[30px] font-bold leading-none text-white">L 107.33</p>
              <p className="mt-2 text-xs text-[#93c5fd]">Actualizado hace 1 min</p>
            </div>

            <nav className="mt-6 space-y-2">
              {primaryNavigationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink key={item.to} to={item.to}>
                    {({ isActive }) => (
                      <span
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition",
                          isActive
                            ? "bg-[#00b7e3] text-[#001c3e]"
                            : "text-[#dbeafe] hover:bg-[#023064]"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            <div className="mt-auto rounded-2xl border border-[#123a69] bg-[#012655] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#6ca5e4]">Centro operativo</p>
              <p className="mt-2 text-sm text-[#dbeafe]">Panel de seguimiento para concesionarios y agentes.</p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0a4a83] px-3 py-1 text-xs font-semibold text-[#dbeafe]">
                <Sparkles className="h-3.5 w-3.5" />
                Modo desktop activo
              </div>
            </div>
          </aside>

          <div className="flex min-h-full flex-col overflow-hidden rounded-[30px] bg-[#e8ecf7] shadow-[0_24px_56px_-42px_rgba(0,0,0,0.55)]">
            <AppHeader desktop showLogo={false} title={headerTitle} />
            <main className="flex-1 overflow-y-auto px-6 pb-5 pt-1 xl:px-8">
              <div className="w-full">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
