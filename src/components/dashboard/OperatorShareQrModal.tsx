import { useEffect, useMemo, useState } from "react";

import { ChevronDown, Copy, Mail, MessageCircleMore, Send, Share2, X } from "lucide-react";

import { operatorProfile } from "../../data/opa";
import { cn } from "../../lib/cn";

interface OperatorShareQrModalProps {
  open: boolean;
  onClose: () => void;
}

const baseOriginFallback = "https://opa.hondubet.com";

export function OperatorShareQrModal({
  open,
  onClose
}: OperatorShareQrModalProps): JSX.Element | null {
  const [origin, setOrigin] = useState(baseOriginFallback);
  const [copyFeedbackVisible, setCopyFeedbackVisible] = useState(false);
  const [showChannels, setShowChannels] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    setCopyFeedbackVisible(false);
    setShowChannels(false);

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

  const referralLink = useMemo(
    () => `${origin}/registro-agente?ref=${operatorProfile.id}&scope=${operatorProfile.scope}`,
    [origin]
  );

  const shareText = useMemo(
    () =>
      `Ficha de operador ${operatorProfile.name} (${operatorProfile.scopeLabel}). Regístrate como agente desde este enlace para quedar asociado a esta red: ${referralLink}`,
    [referralLink]
  );

  const qrSource = useMemo(
    () =>
      `https://quickchart.io/qr?size=320&ecLevel=M&margin=1&dark=001c3e&light=e8ecf7&text=${encodeURIComponent(
        referralLink
      )}`,
    [referralLink]
  );

  if (!open) {
    return null;
  }

  const shareViaNative = async (): Promise<void> => {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "Ficha de operador OPA",
          text: shareText,
          url: referralLink
        });
        return;
      }

      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank", "noopener,noreferrer");
    } catch {
      // Ignore share aborts/cancel actions from the OS share sheet.
    }
  };

  const copyLink = async (): Promise<void> => {
    try {
      if (typeof navigator === "undefined" || !navigator.clipboard) {
        return;
      }

      await navigator.clipboard.writeText(referralLink);
      setCopyFeedbackVisible(true);
      window.setTimeout(() => setCopyFeedbackVisible(false), 1400);
    } catch {
      // Ignore clipboard errors in restricted browser contexts.
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] bg-[rgba(15,23,43,0.58)] p-2 backdrop-blur-[3px] sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <div className="mx-auto flex h-full w-full max-w-[740px] items-end sm:items-center">
        <section
          aria-modal="true"
          className="w-full overflow-hidden rounded-t-[22px] border border-[#dce6f2] bg-white shadow-[0_32px_60px_-22px_rgba(0,0,0,0.45)] sm:rounded-[20px]"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          tabIndex={-1}
        >
          <header className="flex items-start justify-between gap-3 border-b border-[#e2e8f0] px-4 py-4 sm:px-5">
            <div>
              <h2 className="text-[16px] font-bold text-[#0f172b]">Compartir ficha de operador</h2>
              <p className="mt-1 text-xs text-[#64748b]">
                Registra agentes con este QR y enlázalos automáticamente a tu red.
              </p>
            </div>
            <button
              aria-label="Cerrar modal QR"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f8fafc] text-[#64748b]"
              onClick={onClose}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="grid grid-cols-1 gap-4 px-4 py-4 sm:px-5 sm:py-5 md:grid-cols-[240px_minmax(0,1fr)] md:gap-5">
            <aside className="rounded-2xl border border-[#dbe4ef] bg-[#f8fbff] p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748b]">Código QR</p>
              <div className="mt-2 rounded-xl border border-[#dbe4ef] bg-white p-2">
                <img
                  alt="QR de ficha de operador"
                  className="mx-auto h-[206px] w-[206px] rounded-lg"
                  src={qrSource}
                />
              </div>
              <p className="mt-2 text-center text-[11px] text-[#62748e]">Escanéalo para abrir el registro de agentes</p>
            </aside>

            <main className="space-y-3">
              <section className="rounded-2xl border border-[#dbe4ef] bg-[#f8fafc] p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#64748b]">Operador</p>
                <p className="mt-1 text-sm font-semibold text-[#0f172b]">{operatorProfile.name}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-[#334155]">
                    {operatorProfile.scopeLabel}
                  </span>
                  <span className="inline-flex rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-[#334155]">
                    {operatorProfile.code}
                  </span>
                </div>
              </section>

              <section className="rounded-2xl border border-[#dbe4ef] bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#64748b]">Enlace de registro</p>
                <p className="mt-2 break-all rounded-lg bg-[#f8fafc] px-2 py-2 text-xs text-[#334155]">{referralLink}</p>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#001c3e] px-3 text-sm font-semibold text-white"
                    onClick={() => {
                      void shareViaNative();
                    }}
                    type="button"
                  >
                    <Share2 className="h-4 w-4" />
                    Compartir
                  </button>
                  <button
                    className={cn(
                      "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#cdd9e8] bg-white px-3 text-sm font-semibold text-[#0f172b]",
                      copyFeedbackVisible ? "border-[#86efac] bg-[#f0fdf4] text-[#166534]" : ""
                    )}
                    onClick={() => {
                      void copyLink();
                    }}
                    type="button"
                  >
                    <Copy className="h-4 w-4" />
                    {copyFeedbackVisible ? "Copiado" : "Copiar enlace"}
                  </button>
                </div>
              </section>

              <section className="rounded-2xl border border-[#dbe4ef] bg-white p-2">
                <button
                  aria-expanded={showChannels}
                  className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left"
                  onClick={() => setShowChannels((previous) => !previous)}
                  type="button"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#64748b]">Más canales</span>
                  <ChevronDown className={cn("h-4 w-4 text-[#64748b] transition-transform", showChannels ? "rotate-180" : "rotate-0")} />
                </button>

                {showChannels ? (
                  <div className="grid grid-cols-1 gap-2 px-2 pb-2 sm:grid-cols-3">
                    <a
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#dbe4ef] bg-white px-2 text-sm font-medium text-[#0f172b] hover:bg-[#f8fafc]"
                      href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <MessageCircleMore className="h-4 w-4 text-[#155dfc]" />
                      WhatsApp
                    </a>
                    <a
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#dbe4ef] bg-white px-2 text-sm font-medium text-[#0f172b] hover:bg-[#f8fafc]"
                      href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent("Registro de agente OPA")}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Send className="h-4 w-4 text-[#155dfc]" />
                      Telegram
                    </a>
                    <a
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#dbe4ef] bg-white px-2 text-sm font-medium text-[#0f172b] hover:bg-[#f8fafc]"
                      href={`mailto:?subject=${encodeURIComponent("Ficha de operador OPA")}&body=${encodeURIComponent(shareText)}`}
                    >
                      <Mail className="h-4 w-4 text-[#155dfc]" />
                      Correo
                    </a>
                  </div>
                ) : null}
              </section>

              <p className="text-xs text-[#64748b]">
                Todo agente que se registre con esta ficha queda vinculado automáticamente a este operador.
              </p>
            </main>
          </div>
        </section>
      </div>
    </div>
  );
}
