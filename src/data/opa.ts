export interface MetricSlide {
  id: string;
  title: string;
  value?: string;
  subtitle?: string;
  accent: "dark" | "gradient";
}

export interface MapFilter {
  id: string;
  label: string;
  count: number;
  tone: "active" | "warning" | "danger";
}

export interface MapMarker {
  id: string;
  top: string;
  left: string;
  tone: "active" | "warning" | "danger" | "muted";
}

export interface SalesPoint {
  label: string;
  value: number;
}

export interface ReportCatalogItem {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
}

export interface ReportTemplateMetric {
  id: string;
  label: string;
  value: string;
  tone: "default" | "positive" | "warning";
}

export interface ReportTemplateOption {
  id: string;
  label: string;
  hint: string;
  enabled: boolean;
}

export interface ReportTemplateRow {
  id: string;
  primary: string;
  secondary: string;
  amount: string;
  status: "success" | "pending" | "alert";
}

export interface ReportTemplate {
  id: string;
  title: string;
  subtitle: string;
  metrics: ReportTemplateMetric[];
  options: ReportTemplateOption[];
  rows: ReportTemplateRow[];
}

export interface AgentSummary {
  id: string;
  initials: string;
  name: string;
  role: string;
  status: "active" | "inactive";
  sales: string;
  trend: string;
  trendDirection: "up" | "down";
  warning?: string;
}

export type AgentTreeFilter = "active" | "warning" | "disabled";

export interface AgentTreeAgent {
  id: string;
  name: string;
  code: string;
  email: string;
  available: string;
  prizes: string;
  commissions: string;
  state: AgentTreeFilter;
}

export interface SubConcessionary {
  id: string;
  name: string;
  code: string;
  email: string;
  available: string;
  prizes: string;
  commissions: string;
  agents: AgentTreeAgent[];
  hasAgentsSection: boolean;
}

export type SupportTab = "playbooks" | "tickets" | "escalations";

export interface SupportTabItem {
  id: SupportTab;
  label: string;
  count: number;
}

export interface QuickSupportLink {
  id: string;
  label: string;
  to: string;
  highlighted?: boolean;
}

export type WithdrawWorkflowStatus =
  | "SOLICITADO"
  | "EN_REVISION"
  | "APROBADO"
  | "RECHAZADO"
  | "ANULADO"
  | "PAGADO";

export type CasePriority = "alta" | "media" | "baja";

export interface WithdrawCase {
  id: string;
  agent: string;
  subNetwork: string;
  amount: string;
  status: WithdrawWorkflowStatus;
  priority: CasePriority;
  requestedAt: string;
  updatedAt: string;
  assignee: string;
  note?: string;
}

export interface OperationalQueueItem {
  id: string;
  type: "retiro" | "comprobante" | "alerta";
  title: string;
  detail: string;
  priority: CasePriority;
  status: string;
  owner: string;
  to: string;
}

export interface ReconciliationItem {
  id: string;
  bank: string;
  reference: string;
  amount: string;
  status: "Conciliado" | "Observado" | "Pendiente";
  agent: string;
}

export interface AuditEvent {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface OperatorProfileField {
  id: string;
  label: string;
  value: string;
}

export type OperatorScope = "concessionary" | "subconcessionary";

export interface OperatorProfile {
  id: string;
  name: string;
  code: string;
  status: string;
  statusTone: "muted" | "active";
  scope: OperatorScope;
  scopeLabel: string;
  avatarInitials: string;
  fields: OperatorProfileField[];
}

export const monthlySlides: MetricSlide[] = [
  {
    id: "recharge",
    title: "Recarga de saldo",
    accent: "dark"
  },
  {
    id: "sales",
    title: "Ventas totales",
    subtitle: "Ultimo mes:",
    value: "L 847.562",
    accent: "gradient"
  },
  {
    id: "active-points",
    title: "Agentes activos",
    subtitle: "Cantidad",
    value: "127",
    accent: "gradient"
  },
  {
    id: "commissions",
    title: "Comisiones totales",
    subtitle: "Último mes:",
    value: "L 995.75",
    accent: "gradient"
  },
  {
    id: "alerts",
    title: "Alertas",
    subtitle: "Cantidad",
    value: "17",
    accent: "gradient"
  }
];

export const mapFilters: MapFilter[] = [
  { id: "active", label: "Activo", count: 5, tone: "active" },
  { id: "warning", label: "Advertencia", count: 1, tone: "warning" },
  { id: "disabled", label: "Desactivado", count: 1, tone: "danger" }
];

export const mapMarkers: MapMarker[] = [
  { id: "m1", top: "17%", left: "37%", tone: "warning" },
  { id: "m2", top: "26%", left: "29%", tone: "active" },
  { id: "m3", top: "31%", left: "61%", tone: "danger" },
  { id: "m4", top: "41%", left: "28%", tone: "active" },
  { id: "m5", top: "45%", left: "52%", tone: "active" },
  { id: "m6", top: "56%", left: "19%", tone: "active" },
  { id: "m7", top: "61%", left: "49%", tone: "active" },
  { id: "m8", top: "68%", left: "35%", tone: "muted" },
  { id: "m9", top: "70%", left: "58%", tone: "active" },
  { id: "m10", top: "74%", left: "42%", tone: "danger" }
];

export const salesSeries: SalesPoint[] = [
  { label: "Lun", value: 62000 },
  { label: "Mar", value: 75200 },
  { label: "Mie", value: 68900 },
  { label: "Jue", value: 80400 },
  { label: "Vie", value: 76300 },
  { label: "Sab", value: 83500 },
  { label: "Dom", value: 81200 }
];

export const reportCatalogItems: ReportCatalogItem[] = [
  {
    id: "commissions",
    title: "Comisiones",
    description: "Comisiones generadas por ventas y transacciones",
    iconUrl: "/assets/figma/webp/report-commissions.webp"
  },
  {
    id: "movements",
    title: "Movimientos",
    description: "Historial de movimientos y transacciones",
    iconUrl: "/assets/figma/webp/report-movements.webp"
  },
  {
    id: "tree-commissions",
    title: "Comisiones/Árbol",
    description: "Jerarquía de comisiones por red de agentes",
    iconUrl: "/assets/figma/webp/report-tree-commissions.webp"
  },
  {
    id: "quota-transactions",
    title: "Transacciones de cupo",
    description: "Seguimiento de transacciones por cupos",
    iconUrl: "/assets/figma/webp/report-quota-transactions.webp"
  },
  {
    id: "affiliate-bets",
    title: "Apuesta de afiliados",
    description: "Reporte de apuestas y actividad de afiliados",
    iconUrl: "/assets/figma/webp/report-affiliate-bets.webp"
  },
  {
    id: "bank-vouchers",
    title: "Comprobantes Bancarios",
    description: "Gestión de comprobantes bancarios",
    iconUrl: "/assets/figma/webp/report-bank-vouchers.webp"
  }
];

export const reportTemplates: Record<string, ReportTemplate> = {
  commissions: {
    id: "commissions",
    title: "Plantilla · Comisiones",
    subtitle: "Configura criterios y estructura del reporte por agente y sub-red.",
    metrics: [
      { id: "m1", label: "Comisión total", value: "L 54,200.00", tone: "positive" },
      { id: "m2", label: "Agentes incluidos", value: "127", tone: "default" },
      { id: "m3", label: "Reglas con alerta", value: "3", tone: "warning" }
    ],
    options: [
      { id: "o1", label: "Incluir sub-concesionarios", hint: "Agrupa por nivel jerárquico", enabled: true },
      { id: "o2", label: "Mostrar premios descontados", hint: "Desglose en columna separada", enabled: true },
      { id: "o3", label: "Detalle por punto de venta", hint: "Solo agentes activos", enabled: false },
      { id: "o4", label: "Exportación automática", hint: "Enviar a auditoría al cierre", enabled: false }
    ],
    rows: [
      { id: "r1", primary: "Sub-Concesionario 1", secondary: "Agente 1 · Ticket #9382", amount: "L 2,300.00", status: "success" },
      { id: "r2", primary: "Sub-Concesionario 1", secondary: "Agente 3 · Ticket #9384", amount: "L 420.00", status: "pending" },
      { id: "r3", primary: "Sub-Concesionario 2", secondary: "Agente 4 · Ticket #9385", amount: "L 0.00", status: "alert" }
    ]
  },
  movements: {
    id: "movements",
    title: "Plantilla · Movimientos",
    subtitle: "Consulta operativa de recargas, retiros y transferencias de red.",
    metrics: [
      { id: "m1", label: "Movimientos hoy", value: "892", tone: "default" },
      { id: "m2", label: "Volumen", value: "L 1,204,000", tone: "positive" },
      { id: "m3", label: "Casos observados", value: "12", tone: "warning" }
    ],
    options: [
      { id: "o1", label: "Consolidar por hora", hint: "Ideal para tablero diario", enabled: true },
      { id: "o2", label: "Excluir ajustes manuales", hint: "Oculta transacciones administrativas", enabled: false },
      { id: "o3", label: "Cruzar con soporte", hint: "Une eventos con tickets", enabled: true },
      { id: "o4", label: "Resaltar retiros", hint: "Marca en color alto riesgo", enabled: true }
    ],
    rows: [
      { id: "r1", primary: "TXN-2026-3321", secondary: "Ana Martínez · Recarga", amount: "L 3,100.00", status: "success" },
      { id: "r2", primary: "TXN-2026-3322", secondary: "Roberto Díaz · Retiro", amount: "L 1,950.00", status: "pending" },
      { id: "r3", primary: "TXN-2026-3323", secondary: "Carlos Mendoza · Ajuste", amount: "L 0.00", status: "alert" }
    ]
  },
  "tree-commissions": {
    id: "tree-commissions",
    title: "Plantilla · Comisiones Árbol",
    subtitle: "Visualiza distribución por niveles dentro de la red de agentes.",
    metrics: [
      { id: "m1", label: "Nivel 1", value: "L 22,340.00", tone: "positive" },
      { id: "m2", label: "Nivel 2", value: "L 18,620.00", tone: "default" },
      { id: "m3", label: "Nivel 3", value: "L 13,240.00", tone: "warning" }
    ],
    options: [
      { id: "o1", label: "Desplegar por nodo", hint: "Muestra jerarquía completa", enabled: true },
      { id: "o2", label: "Incluir agentes inactivos", hint: "Para auditoría de red", enabled: false },
      { id: "o3", label: "Cálculo por periodo", hint: "Semana o mes", enabled: true },
      { id: "o4", label: "Comisión neta", hint: "Aplica descuentos y premios", enabled: true }
    ],
    rows: [
      { id: "r1", primary: "Nivel 1 · Red Norte", secondary: "32 agentes", amount: "L 9,900.00", status: "success" },
      { id: "r2", primary: "Nivel 2 · Red Centro", secondary: "18 agentes", amount: "L 6,240.00", status: "pending" },
      { id: "r3", primary: "Nivel 3 · Red Sur", secondary: "9 agentes", amount: "L 2,040.00", status: "alert" }
    ]
  },
  "quota-transactions": {
    id: "quota-transactions",
    title: "Plantilla · Transacciones de cupo",
    subtitle: "Controla límites y uso de cupos por agente y terminal.",
    metrics: [
      { id: "m1", label: "Cupo utilizado", value: "72%", tone: "warning" },
      { id: "m2", label: "Cupo disponible", value: "L 280,000", tone: "positive" },
      { id: "m3", label: "Bloqueos", value: "4", tone: "default" }
    ],
    options: [
      { id: "o1", label: "Alertar al 80%", hint: "Notifica a operador principal", enabled: true },
      { id: "o2", label: "Permitir sobregiro", hint: "Solo sub-concesionarios", enabled: false },
      { id: "o3", label: "Histórico mensual", hint: "Comparativo por red", enabled: true },
      { id: "o4", label: "Detalle por terminal", hint: "Incluye estado y latencia", enabled: true }
    ],
    rows: [
      { id: "r1", primary: "Terminal #2241", secondary: "Agente 1 · Uso 78%", amount: "L 14,300.00", status: "success" },
      { id: "r2", primary: "Terminal #2247", secondary: "Agente 3 · Uso 92%", amount: "L 2,500.00", status: "pending" },
      { id: "r3", primary: "Terminal #2251", secondary: "Agente 4 · Sin movimiento", amount: "L 0.00", status: "alert" }
    ]
  },
  "affiliate-bets": {
    id: "affiliate-bets",
    title: "Plantilla · Apuesta de afiliados",
    subtitle: "Mide desempeño comercial y actividad por afiliado.",
    metrics: [
      { id: "m1", label: "Tickets emitidos", value: "1,942", tone: "default" },
      { id: "m2", label: "Facturación", value: "L 835,600", tone: "positive" },
      { id: "m3", label: "Afiliados sin actividad", value: "6", tone: "warning" }
    ],
    options: [
      { id: "o1", label: "Top 10 afiliados", hint: "Orden por volumen", enabled: true },
      { id: "o2", label: "Excluir anulaciones", hint: "Limpia resultados", enabled: true },
      { id: "o3", label: "Incluir horario pico", hint: "Bloque de 18:00 a 22:00", enabled: false },
      { id: "o4", label: "Comparativo semanal", hint: "Variación vs semana anterior", enabled: true }
    ],
    rows: [
      { id: "r1", primary: "Afiliado A-33", secondary: "125 tickets", amount: "L 45,800.00", status: "success" },
      { id: "r2", primary: "Afiliado A-11", secondary: "84 tickets", amount: "L 28,300.00", status: "pending" },
      { id: "r3", primary: "Afiliado A-07", secondary: "0 tickets", amount: "L 0.00", status: "alert" }
    ]
  },
  "bank-vouchers": {
    id: "bank-vouchers",
    title: "Plantilla · Comprobantes bancarios",
    subtitle: "Supervisa cargas bancarias, verificación y conciliación.",
    metrics: [
      { id: "m1", label: "Comprobantes hoy", value: "143", tone: "default" },
      { id: "m2", label: "Aprobados", value: "129", tone: "positive" },
      { id: "m3", label: "Pendientes", value: "14", tone: "warning" }
    ],
    options: [
      { id: "o1", label: "Validación OCR", hint: "Detecta inconsistencias", enabled: true },
      { id: "o2", label: "Bloquear duplicados", hint: "Control por referencia", enabled: true },
      { id: "o3", label: "Enviar a auditoría", hint: "Automático en pendientes", enabled: false },
      { id: "o4", label: "Vista por banco", hint: "Filtra por entidad", enabled: true }
    ],
    rows: [
      { id: "r1", primary: "CB-2026-8801", secondary: "Banco Atlántida · Agente 1", amount: "L 8,200.00", status: "success" },
      { id: "r2", primary: "CB-2026-8802", secondary: "Ficohsa · Agente 3", amount: "L 1,400.00", status: "pending" },
      { id: "r3", primary: "CB-2026-8803", secondary: "BAC · Agente 4", amount: "L 0.00", status: "alert" }
    ]
  }
};

export const topAgents: AgentSummary[] = [
  {
    id: "ag-01",
    initials: "CM",
    name: "Carlos Mendoza",
    role: "Agente • Centro",
    status: "active",
    sales: "L 82,000",
    trend: "12.7%",
    trendDirection: "up"
  },
  {
    id: "ag-02",
    initials: "AM",
    name: "Ana Martinez",
    role: "Agente • Este",
    status: "active",
    sales: "L 75,000",
    trend: "8.4%",
    trendDirection: "up"
  },
  {
    id: "ag-03",
    initials: "RD",
    name: "Roberto Diaz",
    role: "Sub-Agente • Oeste",
    status: "inactive",
    sales: "L 45,000",
    trend: "5.3%",
    trendDirection: "down",
    warning: "Saldo del terminal por debajo del umbral minimo."
  }
];

export const supportMessages = [
  {
    id: "msg-01",
    from: "Centro de monitoreo",
    subject: "Retiro WD-1108 excede SLA de revisión",
    time: "Hace 18 min"
  },
  {
    id: "msg-02",
    from: "Tesorería",
    subject: "Comprobante CB-8802 requiere validación manual",
    time: "Hace 2 h"
  },
  {
    id: "msg-03",
    from: "Auditoría",
    subject: "Cambio de estado en retiro WD-1106 sin comentario",
    time: "Ayer"
  }
];

export const supportTabs: SupportTabItem[] = [
  { id: "playbooks", label: "Base operativa", count: 5 },
  { id: "tickets", label: "Tickets", count: 7 },
  { id: "escalations", label: "Escalamientos", count: 2 }
];

export const supportFeaturedArticle = {
  badge: "PLAYBOOK",
  title: "Protocolo de retiro observado (+10 min)",
  description:
    "Verifica evidencia, asigna responsable y ejecuta transición de estado con comentario obligatorio."
};

export const supportQuickLinks: QuickSupportLink[] = [
  { id: "operations-queue", label: "BANDEJA OPERATIVA", to: "/modules/operations-queue", highlighted: true },
  { id: "withdraw-workflow", label: "APROBACIÓN DE RETIROS", to: "/modules/withdraw-status" },
  { id: "reconciliation", label: "CONCILIACIÓN BANCARIA", to: "/modules/reconciliation" },
  { id: "audit-log", label: "BITÁCORA DE AUDITORÍA", to: "/modules/audit-log" },
  { id: "transactions-history", label: "HISTORIAL DE TRANSACCIONES", to: "/modules/transactions-history" },
  { id: "account-settings", label: "CONFIGURACIÓN OPERATIVA", to: "/modules/account-settings" }
];

export const withdrawStatusLabel: Record<WithdrawWorkflowStatus, string> = {
  SOLICITADO: "Solicitado",
  EN_REVISION: "En revisión",
  APROBADO: "Aprobado",
  RECHAZADO: "Rechazado",
  ANULADO: "Anulado",
  PAGADO: "Pagado"
};

export const withdrawStatusTransitions: Record<WithdrawWorkflowStatus, WithdrawWorkflowStatus[]> = {
  SOLICITADO: ["EN_REVISION", "ANULADO"],
  EN_REVISION: ["APROBADO", "RECHAZADO", "ANULADO"],
  APROBADO: ["PAGADO"],
  RECHAZADO: [],
  ANULADO: [],
  PAGADO: []
};

export const withdrawWorkflowCases: WithdrawCase[] = [
  {
    id: "WD-1108",
    agent: "Agente 3",
    subNetwork: "Sub-Concesionario 1",
    amount: "L 2,100.00",
    status: "SOLICITADO",
    priority: "alta",
    requestedAt: "Hoy, 10:42",
    updatedAt: "Hace 24 min",
    assignee: "Mesa operativa",
    note: "Monto inusual para franja horaria."
  },
  {
    id: "WD-1107",
    agent: "Agente 2",
    subNetwork: "Sub-Concesionario 1",
    amount: "L 1,250.00",
    status: "EN_REVISION",
    priority: "media",
    requestedAt: "Hoy, 09:30",
    updatedAt: "Hace 45 min",
    assignee: "Tesorería"
  },
  {
    id: "WD-1106",
    agent: "Agente 4",
    subNetwork: "Sub-Concesionario 2",
    amount: "L 950.00",
    status: "APROBADO",
    priority: "baja",
    requestedAt: "Ayer, 18:10",
    updatedAt: "Ayer, 19:02",
    assignee: "Operador senior"
  }
];

export const operationalQueueItems: OperationalQueueItem[] = [
  {
    id: "Q-001",
    type: "retiro",
    title: "Retiro WD-1108 sin dictamen",
    detail: "Agente 3 · Sub-Concesionario 1 · L 2,100.00",
    priority: "alta",
    status: "Pendiente revisión",
    owner: "Mesa operativa",
    to: "/modules/withdraw-status"
  },
  {
    id: "Q-002",
    type: "comprobante",
    title: "Comprobante CB-8802 observado",
    detail: "Ficohsa · Diferencia de referencia",
    priority: "media",
    status: "Pendiente validación",
    owner: "Tesorería",
    to: "/modules/reconciliation"
  },
  {
    id: "Q-003",
    type: "alerta",
    title: "Agente 4 en estado desactivado",
    detail: "Red Oeste · Terminal sin actividad",
    priority: "alta",
    status: "Escalado",
    owner: "Soporte N2",
    to: "/agents"
  }
];

export const reconciliationItems: ReconciliationItem[] = [
  {
    id: "CB-2026-8801",
    bank: "Banco Atlántida",
    reference: "DEP-882991",
    amount: "L 8,200.00",
    status: "Conciliado",
    agent: "Agente 1"
  },
  {
    id: "CB-2026-8802",
    bank: "Ficohsa",
    reference: "DEP-883102",
    amount: "L 1,400.00",
    status: "Observado",
    agent: "Agente 3"
  },
  {
    id: "CB-2026-8803",
    bank: "BAC",
    reference: "DEP-883118",
    amount: "L 950.00",
    status: "Pendiente",
    agent: "Agente 4"
  }
];

export const auditEvents: AuditEvent[] = [
  {
    id: "AU-901",
    actor: "operador.senior",
    action: "Cambio de estado",
    target: "WD-1106 -> APROBADO",
    timestamp: "2026-02-12 08:42"
  },
  {
    id: "AU-900",
    actor: "tesoreria.01",
    action: "Observación manual",
    target: "CB-2026-8802",
    timestamp: "2026-02-12 08:21"
  },
  {
    id: "AU-899",
    actor: "mesa.operativa",
    action: "Asignación de caso",
    target: "WD-1108",
    timestamp: "2026-02-12 08:18"
  }
];

export const operatorProfile: OperatorProfile = {
  id: "operator-239249",
  name: "Operador Principal",
  code: "ID: 239249",
  status: "En turno",
  statusTone: "active",
  scope: "concessionary",
  scopeLabel: "Concesionario",
  avatarInitials: "OP",
  fields: [
    { id: "owner-name", label: "Nombre", value: "María Fernanda López" },
    { id: "email", label: "Correo operativo", value: "operaciones@hondubet.com" },
    { id: "business-name", label: "Centro operativo", value: "Zona Norte - SPS" },
    { id: "department", label: "Departamento", value: "Cortés" },
    { id: "city", label: "Cobertura", value: "San Pedro Sula / Choloma / Puerto Cortés" },
    { id: "document-id", label: "Rol", value: "Operador senior" },
    { id: "landline", label: "Último acceso", value: "Hoy 10:58 · Web desktop" },
    { id: "address", label: "Permisos", value: "Retiros, conciliación, escalamiento y auditoría" }
  ]
};

export const rechargeMethods = [
  {
    id: "rm-1",
    name: "Efectivo en puntos Dilo",
    fee: "1.5%",
    eta: "Inmediato",
    status: "Activo"
  },
  {
    id: "rm-2",
    name: "Transferencia bancaria",
    fee: "0.8%",
    eta: "15-30 min",
    status: "Activo"
  },
  {
    id: "rm-3",
    name: "Comprobante manual",
    fee: "0%",
    eta: "Hasta 2 h",
    status: "Revisión"
  }
];

export const transactionHistory = [
  { id: "tx-9801", type: "Recarga", agent: "Agente 1", amount: "L 320.00", date: "Hoy, 11:08" },
  { id: "tx-9800", type: "Comisión", agent: "Sub-Concesionario 1", amount: "L 120.00", date: "Hoy, 10:41" },
  { id: "tx-9799", type: "Retiro", agent: "Agente 3", amount: "L 700.00", date: "Hoy, 09:57" },
  { id: "tx-9798", type: "Premio", agent: "Agente 4", amount: "L 180.00", date: "Ayer, 19:22" }
];

export const betsHistory = [
  { id: "bet-221", agent: "Agente 1", tickets: 38, total: "L 5,420.00", ratio: "62%" },
  { id: "bet-220", agent: "Agente 3", tickets: 22, total: "L 3,110.00", ratio: "48%" },
  { id: "bet-219", agent: "Agente 4", tickets: 17, total: "L 2,430.00", ratio: "39%" }
];

export const accountSettings = [
  { id: "st-1", label: "Perfil del operador", value: "Centro Norte asignado" },
  { id: "st-2", label: "Seguridad y acceso", value: "2FA + cierre por inactividad (15 min)" },
  { id: "st-3", label: "Notificaciones", value: "Incidentes críticos por correo y panel" },
  { id: "st-4", label: "Reglas operativas", value: "Retiros > L 2,000 requieren revisión" }
];

export const subConcessionaries: SubConcessionary[] = [
  {
    id: "sub-1",
    name: "Sub-Concesionario 1",
    code: "10015",
    email: "redconce@interplay.tech",
    available: "L107.33",
    prizes: "L 0.00",
    commissions: "L 0.00",
    hasAgentsSection: true,
    agents: [
      {
        id: "a-1",
        name: "Agente 1",
        code: "20067",
        email: "veronicapavasub@gmail.com",
        available: "L1457.00",
        prizes: "L 0.00",
        commissions: "L 0.00",
        state: "active"
      },
      {
        id: "a-2",
        name: "Agente 2",
        code: "20067",
        email: "veronicapavasub@gmail.com",
        available: "L1457.00",
        prizes: "L 0.00",
        commissions: "L 0.00",
        state: "active"
      },
      {
        id: "a-3",
        name: "Agente 3",
        code: "20067",
        email: "veronicapavasub@gmail.com",
        available: "L1457.00",
        prizes: "L 0.00",
        commissions: "L 0.00",
        state: "warning"
      },
      {
        id: "a-3b",
        name: "Agente 3",
        code: "20067",
        email: "veronicapavasub@gmail.com",
        available: "L1457.00",
        prizes: "L 0.00",
        commissions: "L 0.00",
        state: "warning"
      },
      {
        id: "a-4",
        name: "Agente 4",
        code: "20067",
        email: "veronicapavasub@gmail.com",
        available: "L1457.00",
        prizes: "L 0.00",
        commissions: "L 0.00",
        state: "disabled"
      }
    ]
  },
  {
    id: "sub-2",
    name: "Sub-Concesionario 2",
    code: "10015",
    email: "redconce@interplay.tech",
    available: "L107.33",
    prizes: "L 0.00",
    commissions: "L 0.00",
    hasAgentsSection: false,
    agents: []
  }
];
