# OPA Product Blueprint

## 1. Core Intent
OPA is an operations SaaS for managing concessionary networks (concesionarios, sub-concesionarios and agentes) with financial control, support workflows and execution visibility.

## 2. Domain Model
- Operator: supervises the full network and approves critical actions.
- Sub-concessionary: intermediate node that manages a group of agents.
- Agent: frontline seller/collector with balance, prizes, commissions and risk state.
- Financial movement: recharge, withdrawal, commission, prize, transaction.
- Operational status: active, warning, disabled.

## 3. Product Logic by Module
- Dashboard: real-time control board (balance, map, quick recharge, active risks).
- Árbol de agentes: hierarchical management with state-based filtering and per-node actions.
- Reportes avanzados: analytical entry points by business domain.
- Soporte: operational knowledge base + inbox + escalation entry points.
- Financial modules:
  - Métodos de recarga
  - Estado de retiros
  - Anulación de retiros
  - Historial de transacciones
  - Historial de apuestas
  - Configuración de cuenta

## 4. Critical Workflows
1. Detect risk: warning/disabled agents from tree or dashboard.
2. Execute action: recharge, remove access, call support, cancel pending withdrawal.
3. Validate impact: check transactions and report modules.
4. Close loop: document issue and update account rules/settings.

## 5. Maturity Plan
- V1 (implemented UI foundation): operational shell + key module pages + role-centric navigation.
- V2: backend integration (auth, permissions, state machine, audit logs).
- V3: automation (alerts, anomaly detection, recommendation engine for operator decisions).

## 6. UX Principles
- Mobile-first operational speed.
- Status-first visuals (active/warning/disabled).
- 1-click access to high-frequency actions.
- Actionable analytics instead of passive charts.
