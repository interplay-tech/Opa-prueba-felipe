export interface KpiMetric {
  id: string;
  title: string;
  value: string;
  delta: string;
  positive: boolean;
}

export interface RechargeOption {
  id: string;
  label: string;
  amount: string;
}

export interface ReportType {
  id: string;
  title: string;
  subtitle: string;
  trend: string;
}

export interface ReportPoint {
  label: string;
  total: number;
}

export interface TransactionRow {
  id: string;
  date: string;
  type: string;
  user: string;
  amount: string;
  status: "success" | "pending" | "rejected";
}

export interface SupportMessage {
  id: string;
  from: string;
  subject: string;
  time: string;
  unread?: boolean;
}

export interface AgentNode {
  id: string;
  name: string;
  role: string;
  commission: string;
  children?: AgentNode[];
}

export const kpiMetrics: KpiMetric[] = [
  {
    id: "balance",
    title: "Saldo disponible",
    value: "$21,840.00",
    delta: "+8.4%",
    positive: true
  },
  {
    id: "profit",
    title: "Ganancia mensual",
    value: "$4,320.00",
    delta: "+5.2%",
    positive: true
  },
  {
    id: "transactions",
    title: "Transacciones",
    value: "1,284",
    delta: "-1.4%",
    positive: false
  }
];

export const rechargeOptions: RechargeOption[] = [
  { id: "movistar", label: "Movistar", amount: "$20" },
  { id: "digitel", label: "Digitel", amount: "$15" },
  { id: "simpletv", label: "Simple TV", amount: "$25" },
  { id: "internet", label: "Internet", amount: "$30" }
];

export const reportTypes: ReportType[] = [
  {
    id: "commissions",
    title: "Comisiones",
    subtitle: "Ingresos por ventas",
    trend: "+12%"
  },
  {
    id: "movements",
    title: "Movimientos",
    subtitle: "Historial operativo",
    trend: "+4%"
  },
  {
    id: "tree",
    title: "Comision / Arbol",
    subtitle: "Red de afiliados",
    trend: "+9%"
  },
  {
    id: "quota",
    title: "Transacciones de cupo",
    subtitle: "Gestion de limites",
    trend: "+2%"
  },
  {
    id: "bets",
    title: "Apuesta afiliados",
    subtitle: "Rendimiento por red",
    trend: "-1%"
  },
  {
    id: "bank",
    title: "Comprobantes bancarios",
    subtitle: "Depositos y vouchers",
    trend: "+7%"
  }
];

export const reportSeries: Record<string, ReportPoint[]> = {
  commissions: [
    { label: "Jan", total: 2400 },
    { label: "Feb", total: 2210 },
    { label: "Mar", total: 2900 },
    { label: "Apr", total: 3100 },
    { label: "May", total: 3450 },
    { label: "Jun", total: 3620 }
  ],
  movements: [
    { label: "Jan", total: 1300 },
    { label: "Feb", total: 1880 },
    { label: "Mar", total: 2120 },
    { label: "Apr", total: 2350 },
    { label: "May", total: 2410 },
    { label: "Jun", total: 2480 }
  ],
  tree: [
    { label: "Jan", total: 540 },
    { label: "Feb", total: 730 },
    { label: "Mar", total: 980 },
    { label: "Apr", total: 910 },
    { label: "May", total: 1120 },
    { label: "Jun", total: 1260 }
  ],
  quota: [
    { label: "Jan", total: 890 },
    { label: "Feb", total: 960 },
    { label: "Mar", total: 1240 },
    { label: "Apr", total: 1210 },
    { label: "May", total: 1340 },
    { label: "Jun", total: 1415 }
  ],
  bets: [
    { label: "Jan", total: 600 },
    { label: "Feb", total: 700 },
    { label: "Mar", total: 640 },
    { label: "Apr", total: 680 },
    { label: "May", total: 720 },
    { label: "Jun", total: 690 }
  ],
  bank: [
    { label: "Jan", total: 430 },
    { label: "Feb", total: 510 },
    { label: "Mar", total: 620 },
    { label: "Apr", total: 700 },
    { label: "May", total: 790 },
    { label: "Jun", total: 860 }
  ]
};

export const transactions: TransactionRow[] = [
  {
    id: "TX-9321",
    date: "2026-02-09",
    type: "Comision",
    user: "Ana M",
    amount: "$210.00",
    status: "success"
  },
  {
    id: "TX-9322",
    date: "2026-02-09",
    type: "Recarga",
    user: "Carlos P",
    amount: "$80.00",
    status: "pending"
  },
  {
    id: "TX-9323",
    date: "2026-02-08",
    type: "Retiro",
    user: "Laura G",
    amount: "$320.00",
    status: "rejected"
  },
  {
    id: "TX-9324",
    date: "2026-02-08",
    type: "Comision Arbol",
    user: "Daniel R",
    amount: "$125.00",
    status: "success"
  }
];

export const supportFaq = [
  "Como ver estado de mi retiro",
  "Metodo para recarga inmediata",
  "Politica de comprobantes",
  "Actualizar datos del operador",
  "Limites por transaccion"
];

export const supportMessages: SupportMessage[] = [
  {
    id: "m1",
    from: "Equipo OPA",
    subject: "Tu solicitud de retiro fue validada",
    time: "Hace 24 min",
    unread: true
  },
  {
    id: "m2",
    from: "Soporte",
    subject: "Actualizacion del modulo de reportes",
    time: "Hace 2 h"
  },
  {
    id: "m3",
    from: "Auditoria",
    subject: "Comprobante bancario pendiente de revision",
    time: "Ayer"
  }
];

export const supportQuickLinks = [
  "Metodos de recarga",
  "Ver estado de retiro",
  "Anular retiro",
  "Historial de apuestas",
  "Historial de transacciones",
  "Configuracion"
];

export const agentsTree: AgentNode = {
  id: "root",
  name: "Maria Rojas",
  role: "Operador Master",
  commission: "$4,900",
  children: [
    {
      id: "a1",
      name: "Luis Perez",
      role: "Agente Regional",
      commission: "$1,840",
      children: [
        {
          id: "a1b",
          name: "Sofia Marin",
          role: "Subagente",
          commission: "$670"
        },
        {
          id: "a1c",
          name: "Ramon Diaz",
          role: "Subagente",
          commission: "$590"
        }
      ]
    },
    {
      id: "a2",
      name: "Marta Ruiz",
      role: "Agente Regional",
      commission: "$1,360",
      children: [
        {
          id: "a2b",
          name: "Jorge Leon",
          role: "Subagente",
          commission: "$450"
        }
      ]
    }
  ]
};
