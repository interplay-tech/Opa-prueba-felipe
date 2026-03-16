import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Badge } from "../ui/Badge";

interface KpiCardProps {
  title: string;
  value: string;
  delta: string;
  positive: boolean;
  index?: number;
}

export function KpiCard({
  title,
  value,
  delta,
  positive,
  index = 0
}: KpiCardProps): JSX.Element {
  const DeltaIcon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <motion.article
      className="overflow-hidden rounded-[16px] border border-white/30 bg-gradient-to-br from-[#001c3e] via-[#003a7a] to-[#00b7e3] p-[1px]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: index * 0.08 }}
    >
      <div className="rounded-[15px] bg-white/95 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{title}</p>
        <p className="mt-3 text-2xl font-black text-[var(--opa-ink)]">{value}</p>
        <div className="mt-3 flex items-center justify-between">
          <Badge tone={positive ? "success" : "warning"}>{positive ? "Growth" : "Drop"}</Badge>
          <p
            className={`inline-flex items-center gap-1 text-sm font-semibold ${
              positive ? "text-emerald-600" : "text-amber-600"
            }`}
          >
            <DeltaIcon className="h-4 w-4" />
            {delta}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
