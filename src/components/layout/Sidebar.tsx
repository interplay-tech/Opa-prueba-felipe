import type { LucideIcon } from "lucide-react";
import {
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  Network,
  PanelsTopLeft,
  Wallet
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "../../lib/cn";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  onNavigate?: () => void;
}

const navItems: Array<{ icon: LucideIcon; label: string; to: string }> = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
  { icon: PanelsTopLeft, label: "Reportes", to: "/reports" },
  { icon: CircleHelp, label: "Soporte", to: "/support" },
  { icon: Network, label: "Arbol", to: "/agents" }
];

export function SidebarItem({
  icon: Icon,
  label,
  to,
  onNavigate
}: SidebarItemProps): JSX.Element {
  return (
    <NavLink to={to} onClick={onNavigate}>
      {({ isActive }) => (
        <span
          className={cn(
            "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
            isActive
              ? "bg-cyan-500 text-white"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </span>
      )}
    </NavLink>
  );
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps): JSX.Element {
  return (
    <>
      <button
        aria-label="Close mobile menu overlay"
        className={cn(
          "fixed inset-0 z-30 bg-slate-950/50 transition md:hidden",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
        onClick={onClose}
        type="button"
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-[17.5rem] max-w-[85vw] -translate-x-full rounded-r-[24px] bg-[var(--opa-navy)] p-4 text-white transition-transform duration-300 md:static md:w-64 md:translate-x-0 md:rounded-[24px]",
          mobileOpen ? "translate-x-0" : ""
        )}
      >
        <div className="flex h-full flex-col">
          <div className="mb-8 rounded-2xl bg-white/10 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">OPA fintech</p>
            <p className="mt-1 text-2xl font-black leading-none">Operator Hub</p>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <SidebarItem key={item.to} onNavigate={onClose} {...item} />
            ))}
          </div>

          <div className="mt-auto rounded-2xl bg-gradient-to-br from-white/12 to-cyan-400/20 p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-xl bg-white/15 p-2">
                <CreditCard className="h-5 w-5 text-cyan-200" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-cyan-100/90">Balance</p>
                <p className="text-lg font-bold">$21,840</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-cyan-100">
              <Wallet className="h-4 w-4" />
              Recarga rapida habilitada
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
