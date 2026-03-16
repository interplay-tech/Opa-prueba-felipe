import { useEffect } from "react";

import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  CircleDollarSign,
  MessageCircle,
  PhoneCall,
  Plus,
  TriangleAlert,
  X
} from "lucide-react";

import type { AgentSummary } from "../../data/opa";

interface ActionItem {
  label: string;
  icon: LucideIcon;
  imageSrc?: string;
}

const rechargeCoinArrowAsset = "/assets/recarga-icon.png";

const actionItems: ActionItem[] = [
  { label: "Recargar", icon: CircleDollarSign, imageSrc: rechargeCoinArrowAsset },
  { label: "Mensaje", icon: MessageCircle },
  { label: "Reportar", icon: TriangleAlert },
  { label: "Llamar", icon: PhoneCall }
];

interface AgentDetailModalProps {
  agent: AgentSummary | null;
  open: boolean;
  onClose: () => void;
}

export function AgentDetailModal({
  agent,
  open,
  onClose
}: AgentDetailModalProps): JSX.Element | null {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  if (!open || !agent) {
    return null;
  }

  const lowBalanceMessage = agent.warning ?? "Saldo del terminal por debajo del umbral minimo.";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,43,0.6)] p-4 backdrop-blur-[4px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        aria-modal="true"
        className="w-full max-w-[min(95vw,720px)] overflow-hidden rounded-[20px] bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between border-b border-[#f1f5f9] px-4 py-4">
          <h2 className="text-base font-bold uppercase tracking-[0.42px] text-[#797979]">Detalle de agente</h2>
          <button
            aria-label="Cerrar detalle"
            className="rounded-full p-1 text-[#90a1b9] transition hover:bg-[#f8fafc]"
            onClick={onClose}
            type="button"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="max-h-[75vh] space-y-4 overflow-y-auto p-5">
          <div>
            <h3 className="text-[20px] font-normal leading-[30px] text-[#00142c]">Kiosko Mall Multiplaza</h3>
            <span className="mt-1 inline-flex rounded-[60px] bg-[#fcea2a] px-2 py-[2px] text-xs font-medium text-[#0f172b]">
              Saldo bajo
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {actionItems.map((item) => {
              const Icon = item.icon;

              return (
                <button className="rounded-[14px] bg-[#eff6ff] py-2 text-[#155dfc]" key={item.label} type="button">
                  <span className="mx-auto inline-flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-[#00b7e3] shadow-[-7px_6px_20px_rgba(0,183,227,0.2)]">
                    {item.imageSrc ? (
                      <img alt={item.label} className="h-7 w-7 object-contain" src={item.imageSrc} />
                    ) : (
                      <Icon className="h-7 w-7" />
                    )}
                  </span>
                  <span className="mt-1 block text-sm font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-4 rounded-[14px] bg-[#f8fafc] p-4">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3px] text-[#155dfc]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#155dfc]" />
                Direccion
              </p>
              <p className="text-[14px] leading-5 text-[#00142c]">Blvd. del Sur, SPS</p>
            </div>
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3px] text-[#155dfc]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#155dfc]" />
                Agente
              </p>
              <p className="text-[14px] leading-5 text-[#00142c]">{agent.name}</p>
            </div>
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3px] text-[#155dfc]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#155dfc]" />
                Ventas hoy
              </p>
              <p className="text-[18px] font-bold leading-7 text-[#00142c]">L 2,450.00</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-[10px] border border-[#ffe2e2] bg-[#fef2f2] px-3 py-3 text-[#e7000b]">
            <AlertTriangle className="h-6 w-6 shrink-0" />
            <p className="text-xs font-medium">{lowBalanceMessage}</p>
          </div>
        </div>

        <div className="border-t border-[#f1f5f9] px-5 py-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              className="inline-flex items-center justify-center gap-1 rounded-[63px] bg-gradient-to-r from-[#95fb3f] to-[#46fc6d] px-4 py-2 text-sm font-medium text-[#001c3e]"
              type="button"
            >
              <Plus className="h-4 w-4" />
              Agregar
            </button>
            <button className="rounded-[52px] border border-black px-4 py-2 text-sm font-medium text-black" type="button">
              Quitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
