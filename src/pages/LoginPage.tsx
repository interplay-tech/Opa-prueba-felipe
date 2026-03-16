import { Lock, Mail, Shield, Square } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onLogin: () => void;
  buttonClassName?: string;
  containerClassName?: string;
}

function LoginForm({
  onLogin,
  buttonClassName,
  containerClassName
}: LoginFormProps): JSX.Element {
  return (
    <div className={containerClassName ?? "space-y-7 px-[22px] pb-10 pt-11"}>
      <div className="space-y-3">
        <label className="block text-[16px] font-semibold text-[#314158]">Usuario / Email</label>
        <div className="flex h-14 items-center gap-3 rounded-[14px] border border-[#cad5e2] bg-[#f3f3f5] px-4">
          <Mail className="h-5 w-5 text-[#90a1b9]" />
          <input
            className="w-full border-none bg-transparent text-[16px] text-[#314158] outline-none placeholder:text-[#717182]"
            placeholder="Ingrese su email o usuario"
            type="email"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-[16px] font-semibold text-[#314158]">Contrasena</label>
        <div className="flex h-14 items-center gap-3 rounded-[14px] border border-[#cad5e2] bg-[#f3f3f5] px-4">
          <Lock className="h-5 w-5 text-[#90a1b9]" />
          <input
            className="w-full border-none bg-transparent text-[16px] text-[#314158] outline-none placeholder:text-[#717182]"
            placeholder="Ingrese su contrasena"
            type="password"
          />
        </div>
      </div>

      <label className="inline-flex items-center gap-3 text-[16px] font-medium text-[#314158]">
        <Square className="h-5 w-5 rounded bg-[#f3f3f5] text-[#90a1b9]" />
        Mantener sesion iniciada
      </label>

      <button
        className={
          buttonClassName ??
          "mx-auto block h-14 w-[262px] rounded-[72px] bg-[#001c3e] text-[18px] font-semibold text-white shadow-[0_10px_15px_rgba(0,0,0,0.15)]"
        }
        onClick={onLogin}
        type="button"
      >
        Iniciar Sesion
      </button>

      <button className="mx-auto block text-[16px] font-medium text-[#155dfc]" type="button">
        ¿Olvido su contrasena?
      </button>
    </div>
  );
}

function LoginFooter(): JSX.Element {
  return (
    <>
      <div className="border-t border-[#e2e8f0] bg-[#f8fafc] px-8 py-5">
        <p className="flex items-center justify-center gap-2 text-[16px] font-medium text-[#45556c]">
          <Shield className="h-5 w-5" />
          Solo Personal Autorizado
        </p>
      </div>

      <p className="px-8 py-6 text-center text-[14px] leading-5 tracking-[-0.15px] text-[#62748e]">
        © 2026 OPA · Hondubet. Todos los derechos reservados.
      </p>
    </>
  );
}

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="px-3 py-3 xl:hidden">
        <div className="mx-auto w-full max-w-[430px] overflow-hidden rounded-[32px] bg-[#f3f3f5] shadow-[0_30px_80px_-35px_rgba(0,0,0,0.55)] sm:max-w-[620px] md:max-w-[900px]">
          <div className="bg-[#001c3e] px-6 pb-14 pt-16 text-center text-white">
            <div className="mx-auto inline-flex h-10 items-center justify-center rounded-2xl bg-gradient-to-r from-[#0040a0] to-[#009df6] px-4">
              <span className="font-['Nunito',sans-serif] text-[36px] font-black leading-none">OPA</span>
            </div>
            <p className="mt-1 font-['Nunito',sans-serif] text-[16px] font-black">HONDUBET</p>
            <div className="mx-auto mt-6 h-px w-[181px] bg-[#00b7e3]" />
            <p className="mt-8 text-[16px] leading-8 tracking-[0.2px] text-[#dbeafe]">
              SISTEMA DE GESTION
              <br />
              DE PUNTOS DE SERVICIO
            </p>
          </div>
          <LoginForm onLogin={() => navigate("/dashboard")} />
          <LoginFooter />
        </div>
      </div>

      <div className="hidden min-h-screen items-center justify-center px-8 py-8 xl:flex">
        <div className="grid w-full max-w-[1180px] grid-cols-[minmax(0,1fr)_440px] overflow-hidden rounded-[36px] bg-[#f3f3f5] shadow-[0_36px_90px_-40px_rgba(0,0,0,0.6)]">
          <section className="relative overflow-hidden bg-[#001c3e] px-14 py-14 text-white">
            <div className="relative z-10 max-w-[420px]">
              <div className="inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#0040a0] to-[#009df6] px-5">
                <span className="font-['Nunito',sans-serif] text-[44px] font-black leading-none">OPA</span>
              </div>
              <p className="mt-1 font-['Nunito',sans-serif] text-[18px] font-black">HONDUBET</p>
              <div className="mt-7 h-px w-[220px] bg-[#00b7e3]" />
              <h1 className="mt-10 text-[34px] font-bold leading-[1.2]">
                Sistema de gestión
                <br />
                de puntos de servicio
              </h1>
              <p className="mt-5 text-base leading-7 text-[#dbeafe]">
                Controla la red de agentes, monitorea transacciones y opera soporte desde un solo panel.
              </p>
            </div>
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#00b7e3]/25 blur-3xl" />
            <div className="pointer-events-none absolute left-8 top-8 h-32 w-32 rounded-full bg-[#46fc6d]/10 blur-3xl" />
          </section>

          <section className="flex flex-col bg-[#f3f3f5]">
            <header className="border-b border-[#e2e8f0] px-10 py-8">
              <p className="text-xs uppercase tracking-[0.22em] text-[#64748b]">Acceso de operador</p>
              <p className="mt-2 text-2xl font-bold text-[#0f172b]">Iniciar sesión</p>
            </header>

            <LoginForm
              buttonClassName="h-14 w-full rounded-[72px] bg-[#001c3e] text-[18px] font-semibold text-white shadow-[0_10px_15px_rgba(0,0,0,0.15)]"
              containerClassName="space-y-7 px-10 pb-8 pt-8"
              onLogin={() => navigate("/dashboard")}
            />

            <div className="mt-auto">
              <LoginFooter />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
