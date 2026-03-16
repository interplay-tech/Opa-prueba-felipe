import { cn } from "../../lib/cn";

const rechargeCoinArrowAsset = "/assets/recarga-icon.png";

interface MetricSlideCardProps {
  title: string;
  value?: string;
  subtitle?: string;
  accent: "dark" | "gradient";
}

export function MetricSlideCard({
  title,
  value,
  subtitle,
  accent
}: MetricSlideCardProps): JSX.Element {
  return (
    <article
      className={cn(
        "relative h-[170px] w-[148px] shrink-0 overflow-hidden rounded-2xl p-5 text-white shadow-[0_10px_20px_-10px_rgba(0,20,48,0.65)] md:w-full",
        accent === "dark"
          ? "bg-[#012655]"
          : "bg-gradient-to-b from-[#01b5e1] to-[#011e40]"
      )}
    >
      <h3 className="max-w-[108px] whitespace-pre-wrap text-[17px] font-extrabold leading-6 tracking-[0.136px]">
        {title}
      </h3>

      {value ? (
        <div className="mt-7">
          {subtitle ? <p className="text-[13px] font-semibold">{subtitle}</p> : null}
          <p className="mt-1 text-[17px] font-extrabold tracking-[0.136px]">{value}</p>
        </div>
      ) : (
        <div className="relative mt-3 h-[70px] w-[102px]">
          <img alt="Recarga de saldo" className="h-full w-full object-contain" src={rechargeCoinArrowAsset} />
        </div>
      )}

      <div className="pointer-events-none absolute -bottom-8 -right-6 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
    </article>
  );
}
