import type { OperatorScope } from "./opa";

export type DashboardInsightCardId = "recharge" | "sales" | "active-points" | "commissions" | "alerts";
export type InsightSummaryTone = "neutral" | "positive" | "warning" | "danger";
export type InsightDeltaTone = "positive" | "negative" | "neutral";

export interface DashboardInsightSummaryCard {
  id: string;
  label: string;
  value: string;
  hint?: string;
  tone: InsightSummaryTone;
}

export interface DashboardInsightListItem {
  id: string;
  label: string;
  value: string;
  hint?: string;
  delta?: string;
  deltaTone?: InsightDeltaTone;
}

export interface DashboardInsightProgressItem {
  id: string;
  label: string;
  value: string;
  hint: string;
  progress: number;
}

export interface DashboardInsightAlertItem {
  id: string;
  pointName: string;
  lastRecharge: string;
  currentBalance: string;
  minimumRequired: string;
  severity: "critical" | "warning";
  actionLabel: string;
  actionTo: string;
}

export interface DashboardQuickRechargeItem {
  id: string;
  agentName: string;
  network: string;
  currentBalance: string;
  suggestedRecharge: string;
  status: "critical" | "warning" | "ok";
  actionLabel: string;
  actionTo: string;
}

interface DashboardInsightSectionBase {
  id: string;
  title: string;
  subtitle?: string;
}

export type DashboardInsightSection =
  | (DashboardInsightSectionBase & {
      type: "list";
      items: DashboardInsightListItem[];
    })
  | (DashboardInsightSectionBase & {
      type: "progress";
      items: DashboardInsightProgressItem[];
    })
  | (DashboardInsightSectionBase & {
      type: "alerts";
      items: DashboardInsightAlertItem[];
    })
  | (DashboardInsightSectionBase & {
      type: "quick-recharge";
      items: DashboardQuickRechargeItem[];
    });

export interface DashboardInsightModule {
  id: DashboardInsightCardId;
  title: string;
  subtitle: string;
  roleHint: string;
  summary: DashboardInsightSummaryCard[];
  sections: DashboardInsightSection[];
}

export const dashboardInsightPeriodOptions = ["Último mes", "Últimos 7 días", "Trimestre actual"];

const concessionaryInsights: Record<DashboardInsightCardId, DashboardInsightModule> = {
  recharge: {
    id: "recharge",
    title: "Recarga rápida de agentes",
    subtitle: "Acceso operativo para fondear saldo de puntos de venta de forma inmediata.",
    roleHint: "Vista concesionario: puede recargar directamente o delegar por sub-red.",
    summary: [
      { id: "rq-1", label: "Saldo disponible", value: "L 107.33", hint: "Bolsa operativa principal", tone: "neutral" },
      { id: "rq-2", label: "Pendientes de recarga", value: "5", hint: "2 en estado crítico", tone: "warning" },
      { id: "rq-3", label: "Recargas hoy", value: "18", hint: "L 12,350 procesados", tone: "positive" }
    ],
    sections: [
      {
        id: "rq-priority",
        type: "quick-recharge",
        title: "Agentes con prioridad de recarga",
        subtitle: "Ordenados por riesgo operativo y tiempo sin recargar",
        items: [
          {
            id: "rq-a1",
            agentName: "Agente 4",
            network: "Sub-Concesionario 1",
            currentBalance: "L 450",
            suggestedRecharge: "L 1,200",
            status: "critical",
            actionLabel: "Recargar ahora",
            actionTo: "/modules/recharge-methods"
          },
          {
            id: "rq-a2",
            agentName: "Agente 3",
            network: "Sub-Concesionario 1",
            currentBalance: "L 820",
            suggestedRecharge: "L 1,500",
            status: "warning",
            actionLabel: "Recargar ahora",
            actionTo: "/modules/recharge-methods"
          },
          {
            id: "rq-a3",
            agentName: "Agente 7",
            network: "Sub-Concesionario 2",
            currentBalance: "L 1,950",
            suggestedRecharge: "L 800",
            status: "ok",
            actionLabel: "Aplicar recarga",
            actionTo: "/modules/recharge-methods"
          }
        ]
      },
      {
        id: "rq-history",
        type: "list",
        title: "Últimas recargas ejecutadas",
        items: [
          {
            id: "rq-h1",
            label: "Agente 1 · Sub-Concesionario 1",
            value: "L 1,000",
            hint: "Hace 12 min",
            delta: "Aprobada",
            deltaTone: "positive"
          },
          {
            id: "rq-h2",
            label: "Agente 5 · Sub-Concesionario 2",
            value: "L 700",
            hint: "Hace 35 min",
            delta: "Pendiente",
            deltaTone: "neutral"
          },
          {
            id: "rq-h3",
            label: "Agente 4 · Sub-Concesionario 1",
            value: "L 1,200",
            hint: "Hace 1 h",
            delta: "Escalada",
            deltaTone: "negative"
          }
        ]
      }
    ]
  },
  sales: {
    id: "sales",
    title: "Ventas totales",
    subtitle: "Rendimiento consolidado de toda la red de operadores y puntos de venta.",
    roleHint: "Vista concesionario: incluye sub-redes y agentes directos.",
    summary: [
      { id: "s1", label: "Total del mes", value: "L 847,562", hint: "Variación +6.8%", tone: "positive" },
      { id: "s2", label: "Promedio diario", value: "L 28,252", hint: "29 días operados", tone: "neutral" },
      { id: "s3", label: "Ticket promedio", value: "L 143", hint: "Sobre 5,918 tickets", tone: "neutral" }
    ],
    sections: [
      {
        id: "sales-breakdown",
        type: "list",
        title: "Desglose por período",
        items: [
          { id: "wk-1", label: "Esta semana", value: "L 142,350", delta: "+8.3%", deltaTone: "positive" },
          { id: "wk-2", label: "Semana pasada", value: "L 131,450", delta: "+5.2%", deltaTone: "positive" },
          { id: "wk-3", label: "Hace 2 semanas", value: "L 124,890", delta: "-2.1%", deltaTone: "negative" },
          { id: "wk-4", label: "Hace 3 semanas", value: "L 127,540", delta: "+3.7%", deltaTone: "positive" }
        ]
      },
      {
        id: "sales-channel",
        type: "progress",
        title: "Canales con mayor venta",
        subtitle: "Participación sobre el volumen total",
        items: [
          { id: "ch-1", label: "Puntos físicos", value: "L 472,100", hint: "55.7% de ventas", progress: 56 },
          { id: "ch-2", label: "Sub-red centro", value: "L 211,930", hint: "25.0% de ventas", progress: 25 },
          { id: "ch-3", label: "Sub-red norte", value: "L 163,532", hint: "19.3% de ventas", progress: 19 }
        ]
      }
    ]
  },
  "active-points": {
    id: "active-points",
    title: "Agentes activos",
    subtitle: "Estado de disponibilidad y crecimiento operativo de la red.",
    roleHint: "Vista concesionario: control de cobertura por región y sub-red.",
    summary: [
      { id: "a1", label: "Activos", value: "106", hint: "Con ventas hoy", tone: "positive" },
      { id: "a2", label: "Advertencia", value: "7", hint: "Requieren seguimiento", tone: "warning" },
      { id: "a3", label: "Desactivados", value: "14", hint: "Sin operación", tone: "danger" }
    ],
    sections: [
      {
        id: "network-growth",
        type: "list",
        title: "Crecimiento de red",
        items: [
          { id: "g1", label: "Esta semana", value: "+8", hint: "Nuevos agentes activados", delta: "+8", deltaTone: "positive" },
          { id: "g2", label: "Este mes", value: "+23", hint: "Total neto mensual", delta: "+23", deltaTone: "positive" },
          { id: "g3", label: "Este trimestre", value: "+67", hint: "Expansión acumulada", delta: "+67", deltaTone: "positive" }
        ]
      },
      {
        id: "region-distribution",
        type: "progress",
        title: "Distribución por región",
        items: [
          { id: "r1", label: "Zona Centro", value: "42 agentes", hint: "33% de cobertura", progress: 33 },
          { id: "r2", label: "Zona Norte", value: "35 agentes", hint: "28% de cobertura", progress: 28 },
          { id: "r3", label: "Zona Sur", value: "28 agentes", hint: "22% de cobertura", progress: 22 },
          { id: "r4", label: "Zona Este", value: "22 agentes", hint: "17% de cobertura", progress: 17 }
        ]
      }
    ]
  },
  commissions: {
    id: "commissions",
    title: "Comisiones totales",
    subtitle: "Control de comisiones generadas por recargas y operación de red.",
    roleHint: "Vista concesionario: incluye comisión consolidada de sub-concesionarios.",
    summary: [
      { id: "c1", label: "Total recarga", value: "L 28,450", hint: "Periodo seleccionado", tone: "positive" },
      { id: "c2", label: "Tasa comisión", value: "3.5%", hint: "Promedio ponderado", tone: "neutral" },
      { id: "c3", label: "Comisión neta", value: "L 995.75", hint: "Después de ajustes", tone: "positive" }
    ],
    sections: [
      {
        id: "recharge-volume",
        type: "progress",
        title: "Desglose por volumen de recarga",
        items: [
          { id: "v1", label: "L 100 - L 500", value: "L 8,575", hint: "2,450 transacciones", progress: 31 },
          { id: "v2", label: "L 501 - L 1,000", value: "L 13,230", hint: "1,890 transacciones", progress: 46 },
          { id: "v3", label: "L 1,001 - L 5,000", value: "L 5,040", hint: "720 transacciones", progress: 18 },
          { id: "v4", label: "Más de L 5,000", value: "L 1,605", hint: "180 transacciones", progress: 5 }
        ]
      },
      {
        id: "commission-level",
        type: "list",
        title: "Comisión por nivel de red",
        items: [
          { id: "l1", label: "Concesionario", value: "L 480.20", hint: "Margen base", delta: "+4.6%", deltaTone: "positive" },
          { id: "l2", label: "Sub-concesionario Norte", value: "L 272.10", hint: "32 agentes", delta: "+2.1%", deltaTone: "positive" },
          { id: "l3", label: "Sub-concesionario Centro", value: "L 243.45", hint: "27 agentes", delta: "-1.4%", deltaTone: "negative" }
        ]
      }
    ]
  },
  alerts: {
    id: "alerts",
    title: "Alertas operativas",
    subtitle: "Puntos con saldo crítico o por debajo del mínimo operativo configurado.",
    roleHint: "Vista concesionario: permite ejecutar recargas y escalar incidencias.",
    summary: [
      { id: "al1", label: "Críticas", value: "3", hint: "Atención inmediata", tone: "danger" },
      { id: "al2", label: "Bajas", value: "2", hint: "Monitoreo preventivo", tone: "warning" },
      { id: "al3", label: "Recargas pendientes", value: "5", hint: "Sin ejecutar", tone: "neutral" }
    ],
    sections: [
      {
        id: "alerts-list",
        type: "alerts",
        title: "Puntos prioritarios",
        items: [
          {
            id: "al-row-1",
            pointName: "Tech Park Plaza",
            lastRecharge: "Hace 4 días",
            currentBalance: "L 450",
            minimumRequired: "L 1,000",
            severity: "critical",
            actionLabel: "Recargar",
            actionTo: "/modules/recharge-methods"
          },
          {
            id: "al-row-2",
            pointName: "South Station Store",
            lastRecharge: "Hace 2 días",
            currentBalance: "L 820",
            minimumRequired: "L 2,500",
            severity: "warning",
            actionLabel: "Recargar",
            actionTo: "/modules/recharge-methods"
          },
          {
            id: "al-row-3",
            pointName: "Market District",
            lastRecharge: "Hace 1 semana",
            currentBalance: "L 120",
            minimumRequired: "L 500",
            severity: "critical",
            actionLabel: "Escalar",
            actionTo: "/modules/operations-queue"
          }
        ]
      }
    ]
  }
};

const subconcessionaryInsights: Record<DashboardInsightCardId, DashboardInsightModule> = {
  recharge: {
    ...concessionaryInsights.recharge,
    roleHint: "Vista sub-concesionario: recarga sobre su red directa sin acceso global.",
    summary: [
      { id: "srq-1", label: "Saldo disponible", value: "L 61.20", hint: "Bolsa de sub-red", tone: "neutral" },
      { id: "srq-2", label: "Pendientes", value: "3", hint: "1 en estado crítico", tone: "warning" },
      { id: "srq-3", label: "Recargas hoy", value: "7", hint: "L 4,100 procesados", tone: "positive" }
    ],
    sections: [
      {
        id: "srq-priority",
        type: "quick-recharge",
        title: "Agentes con prioridad de recarga",
        subtitle: "Red asignada al sub-concesionario",
        items: [
          {
            id: "srq-a1",
            agentName: "Agente 4",
            network: "Sub-Concesionario 1",
            currentBalance: "L 450",
            suggestedRecharge: "L 1,000",
            status: "critical",
            actionLabel: "Solicitar recarga",
            actionTo: "/modules/operations-queue"
          },
          {
            id: "srq-a2",
            agentName: "Agente 3",
            network: "Sub-Concesionario 1",
            currentBalance: "L 820",
            suggestedRecharge: "L 1,300",
            status: "warning",
            actionLabel: "Solicitar recarga",
            actionTo: "/modules/operations-queue"
          },
          {
            id: "srq-a3",
            agentName: "Agente 2",
            network: "Sub-Concesionario 1",
            currentBalance: "L 2,100",
            suggestedRecharge: "L 700",
            status: "ok",
            actionLabel: "Aplicar recarga",
            actionTo: "/modules/recharge-methods"
          }
        ]
      },
      {
        id: "srq-history",
        type: "list",
        title: "Últimas recargas ejecutadas",
        items: [
          {
            id: "srq-h1",
            label: "Agente 1 · Sub-Concesionario 1",
            value: "L 900",
            hint: "Hace 20 min",
            delta: "Aprobada",
            deltaTone: "positive"
          },
          {
            id: "srq-h2",
            label: "Agente 3 · Sub-Concesionario 1",
            value: "L 600",
            hint: "Hace 50 min",
            delta: "Pendiente",
            deltaTone: "neutral"
          },
          {
            id: "srq-h3",
            label: "Agente 4 · Sub-Concesionario 1",
            value: "L 1,000",
            hint: "Hace 2 h",
            delta: "Escalada",
            deltaTone: "negative"
          }
        ]
      }
    ]
  },
  sales: {
    ...concessionaryInsights.sales,
    roleHint: "Vista sub-concesionario: muestra únicamente su red directa.",
    summary: [
      { id: "ss1", label: "Total del mes", value: "L 302,880", hint: "Variación +4.1%", tone: "positive" },
      { id: "ss2", label: "Promedio diario", value: "L 10,096", hint: "30 días operados", tone: "neutral" },
      { id: "ss3", label: "Ticket promedio", value: "L 126", hint: "Sobre 2,403 tickets", tone: "neutral" }
    ],
    sections: [
      {
        id: "ss-breakdown",
        type: "list",
        title: "Desglose por período",
        items: [
          { id: "ss-w1", label: "Esta semana", value: "L 53,180", delta: "+6.2%", deltaTone: "positive" },
          { id: "ss-w2", label: "Semana pasada", value: "L 50,070", delta: "+3.8%", deltaTone: "positive" },
          { id: "ss-w3", label: "Hace 2 semanas", value: "L 47,310", delta: "-1.2%", deltaTone: "negative" },
          { id: "ss-w4", label: "Hace 3 semanas", value: "L 46,990", delta: "+1.7%", deltaTone: "positive" }
        ]
      },
      {
        id: "ss-channel",
        type: "progress",
        title: "Canales con mayor venta",
        subtitle: "Participación sobre tu sub-red",
        items: [
          { id: "ss-ch1", label: "Puntos físicos", value: "L 198,220", hint: "65.4% del total", progress: 65 },
          { id: "ss-ch2", label: "Terminales móviles", value: "L 74,660", hint: "24.7% del total", progress: 25 },
          { id: "ss-ch3", label: "Canal remoto", value: "L 30,000", hint: "9.9% del total", progress: 10 }
        ]
      }
    ]
  },
  "active-points": {
    ...concessionaryInsights["active-points"],
    roleHint: "Vista sub-concesionario: seguimiento de sus agentes asignados.",
    summary: [
      { id: "sa1", label: "Activos", value: "29", hint: "Con ventas hoy", tone: "positive" },
      { id: "sa2", label: "Advertencia", value: "3", hint: "Requieren revisión", tone: "warning" },
      { id: "sa3", label: "Desactivados", value: "4", hint: "Sin operación", tone: "danger" }
    ],
    sections: [
      {
        id: "sa-growth",
        type: "list",
        title: "Crecimiento de red",
        items: [
          { id: "sa-g1", label: "Esta semana", value: "+2", hint: "Nuevos agentes", delta: "+2", deltaTone: "positive" },
          { id: "sa-g2", label: "Este mes", value: "+5", hint: "Total neto mensual", delta: "+5", deltaTone: "positive" },
          { id: "sa-g3", label: "Este trimestre", value: "+11", hint: "Expansión acumulada", delta: "+11", deltaTone: "positive" }
        ]
      },
      {
        id: "sa-region",
        type: "progress",
        title: "Distribución por zona",
        items: [
          { id: "sa-r1", label: "Zona Centro", value: "12 agentes", hint: "33% de cobertura", progress: 33 },
          { id: "sa-r2", label: "Zona Norte", value: "9 agentes", hint: "25% de cobertura", progress: 25 },
          { id: "sa-r3", label: "Zona Sur", value: "8 agentes", hint: "22% de cobertura", progress: 22 },
          { id: "sa-r4", label: "Zona Este", value: "7 agentes", hint: "20% de cobertura", progress: 20 }
        ]
      }
    ]
  },
  commissions: {
    ...concessionaryInsights.commissions,
    roleHint: "Vista sub-concesionario: comisión de su red sin consolidado de otros nodos.",
    summary: [
      { id: "sc1", label: "Total recarga", value: "L 9,870", hint: "Periodo seleccionado", tone: "positive" },
      { id: "sc2", label: "Tasa comisión", value: "2.9%", hint: "Promedio de tu red", tone: "neutral" },
      { id: "sc3", label: "Comisión neta", value: "L 286.23", hint: "Incluye descuentos", tone: "positive" }
    ],
    sections: [
      {
        id: "sc-volume",
        type: "progress",
        title: "Desglose por volumen de recarga",
        items: [
          { id: "sc-v1", label: "L 100 - L 500", value: "L 3,510", hint: "1,120 transacciones", progress: 36 },
          { id: "sc-v2", label: "L 501 - L 1,000", value: "L 4,040", hint: "690 transacciones", progress: 41 },
          { id: "sc-v3", label: "L 1,001 - L 5,000", value: "L 1,730", hint: "280 transacciones", progress: 18 },
          { id: "sc-v4", label: "Más de L 5,000", value: "L 590", hint: "70 transacciones", progress: 5 }
        ]
      },
      {
        id: "sc-level",
        type: "list",
        title: "Comisión por tipo de punto",
        items: [
          { id: "sc-l1", label: "Puntos activos", value: "L 188.40", hint: "20 agentes", delta: "+2.8%", deltaTone: "positive" },
          { id: "sc-l2", label: "Puntos en advertencia", value: "L 72.10", hint: "3 agentes", delta: "-0.9%", deltaTone: "negative" },
          { id: "sc-l3", label: "Puntos nuevos", value: "L 25.73", hint: "Alta reciente", delta: "+5.3%", deltaTone: "positive" }
        ]
      }
    ]
  },
  alerts: {
    ...concessionaryInsights.alerts,
    roleHint: "Vista sub-concesionario: acciones limitadas a su red asignada.",
    summary: [
      { id: "sal1", label: "Críticas", value: "2", hint: "Prioridad alta", tone: "danger" },
      { id: "sal2", label: "Bajas", value: "1", hint: "Seguimiento", tone: "warning" },
      { id: "sal3", label: "Solicitudes abiertas", value: "3", hint: "Pendientes por validar", tone: "neutral" }
    ],
    sections: [
      {
        id: "sal-list",
        type: "alerts",
        title: "Puntos prioritarios",
        items: [
          {
            id: "sal-row-1",
            pointName: "Tech Park Plaza",
            lastRecharge: "Hace 4 días",
            currentBalance: "L 450",
            minimumRequired: "L 1,000",
            severity: "critical",
            actionLabel: "Solicitar recarga",
            actionTo: "/modules/operations-queue"
          },
          {
            id: "sal-row-2",
            pointName: "South Station Store",
            lastRecharge: "Hace 2 días",
            currentBalance: "L 820",
            minimumRequired: "L 2,500",
            severity: "warning",
            actionLabel: "Solicitar recarga",
            actionTo: "/modules/operations-queue"
          },
          {
            id: "sal-row-3",
            pointName: "Market District",
            lastRecharge: "Hace 1 semana",
            currentBalance: "L 120",
            minimumRequired: "L 500",
            severity: "critical",
            actionLabel: "Escalar",
            actionTo: "/modules/operations-queue"
          }
        ]
      }
    ]
  }
};

const dashboardInsightsByScope: Record<OperatorScope, Record<DashboardInsightCardId, DashboardInsightModule>> = {
  concessionary: concessionaryInsights,
  subconcessionary: subconcessionaryInsights
};

export function getDashboardInsightModule(
  scope: OperatorScope,
  cardId: DashboardInsightCardId
): DashboardInsightModule {
  return dashboardInsightsByScope[scope][cardId];
}
