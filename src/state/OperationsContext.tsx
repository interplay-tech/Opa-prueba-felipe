import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type PropsWithChildren
} from "react";

import {
  auditEvents,
  operationalQueueItems,
  reconciliationItems,
  withdrawStatusLabel,
  withdrawStatusTransitions,
  withdrawWorkflowCases,
  type AuditEvent,
  type OperationalQueueItem,
  type ReconciliationItem,
  type WithdrawCase,
  type WithdrawWorkflowStatus
} from "../data/opa";

type ReconciliationStatus = ReconciliationItem["status"];

interface OperationsState {
  withdrawCases: WithdrawCase[];
  reconciliation: ReconciliationItem[];
  audit: AuditEvent[];
}

type OperationsAction =
  | {
      type: "WITHDRAW_TRANSITION";
      caseId: string;
      nextStatus: WithdrawWorkflowStatus;
      actor: string;
      note?: string;
    }
  | {
      type: "RECONCILIATION_STATUS";
      itemId: string;
      nextStatus: ReconciliationStatus;
      actor: string;
      note?: string;
    };

interface OperationsContextValue {
  withdrawCases: WithdrawCase[];
  reconciliation: ReconciliationItem[];
  auditEvents: AuditEvent[];
  operationalQueue: OperationalQueueItem[];
  transitionWithdraw: (params: {
    caseId: string;
    nextStatus: WithdrawWorkflowStatus;
    actor: string;
    note?: string;
  }) => boolean;
  setReconciliationStatus: (params: {
    itemId: string;
    nextStatus: ReconciliationStatus;
    actor: string;
    note?: string;
  }) => void;
}

const initialState: OperationsState = {
  withdrawCases: withdrawWorkflowCases,
  reconciliation: reconciliationItems,
  audit: auditEvents
};

function formatNow(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

function reducer(state: OperationsState, action: OperationsAction): OperationsState {
  if (action.type === "WITHDRAW_TRANSITION") {
    const targetCase = state.withdrawCases.find((item) => item.id === action.caseId);

    if (!targetCase) {
      return state;
    }

    const allowed = withdrawStatusTransitions[targetCase.status];

    if (!allowed.includes(action.nextStatus)) {
      return state;
    }

    const nextWithdrawCases = state.withdrawCases.map((item) =>
      item.id === action.caseId
        ? {
            ...item,
            status: action.nextStatus,
            updatedAt: "Hace unos segundos",
            note: action.note ?? `Transición aplicada: ${withdrawStatusLabel[action.nextStatus]}`
          }
        : item
    );

    const nextAudit: AuditEvent = {
      id: `AU-${Date.now()}`,
      actor: action.actor,
      action: "Cambio de estado retiro",
      target: `${action.caseId} -> ${action.nextStatus}`,
      timestamp: formatNow()
    };

    return {
      ...state,
      withdrawCases: nextWithdrawCases,
      audit: [nextAudit, ...state.audit]
    };
  }

  const nextReconciliation = state.reconciliation.map((item) =>
    item.id === action.itemId ? { ...item, status: action.nextStatus } : item
  );

  const nextAudit: AuditEvent = {
    id: `AU-${Date.now()}`,
    actor: action.actor,
    action: "Cambio de estado comprobante",
    target: `${action.itemId} -> ${action.nextStatus}`,
    timestamp: formatNow()
  };

  return {
    ...state,
    reconciliation: nextReconciliation,
    audit: [nextAudit, ...state.audit]
  };
}

function buildOperationalQueue(state: OperationsState): OperationalQueueItem[] {
  const fromWithdraws = state.withdrawCases
    .filter((item) => item.status === "SOLICITADO" || item.status === "EN_REVISION")
    .map<OperationalQueueItem>((item) => ({
      id: `WQ-${item.id}`,
      type: "retiro",
      title: `Retiro ${item.id} ${item.status === "SOLICITADO" ? "sin dictamen" : "en revisión"}`,
      detail: `${item.agent} · ${item.subNetwork} · ${item.amount}`,
      priority: item.priority,
      status: withdrawStatusLabel[item.status],
      owner: item.assignee,
      to: "/modules/withdraw-status"
    }));

  const fromReconciliation = state.reconciliation
    .filter((item) => item.status === "Observado" || item.status === "Pendiente")
    .map<OperationalQueueItem>((item) => ({
      id: `CQ-${item.id}`,
      type: "comprobante",
      title: `Comprobante ${item.id} ${item.status === "Observado" ? "observado" : "pendiente"}`,
      detail: `${item.bank} · Ref ${item.reference}`,
      priority: item.status === "Observado" ? "alta" : "media",
      status: item.status,
      owner: "Tesorería",
      to: "/modules/reconciliation"
    }));

  const staticAlerts = operationalQueueItems.filter((item) => item.type === "alerta");

  return [...fromWithdraws, ...fromReconciliation, ...staticAlerts];
}

const OperationsContext = createContext<OperationsContextValue | undefined>(undefined);

export function OperationsProvider({ children }: PropsWithChildren): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  const transitionWithdraw = useCallback<OperationsContextValue["transitionWithdraw"]>(
    ({ caseId, nextStatus, actor, note }) => {
      const selected = state.withdrawCases.find((item) => item.id === caseId);

      if (!selected) {
        return false;
      }

      if (!withdrawStatusTransitions[selected.status].includes(nextStatus)) {
        return false;
      }

      dispatch({ type: "WITHDRAW_TRANSITION", caseId, nextStatus, actor, note });
      return true;
    },
    [state.withdrawCases]
  );

  const setReconciliationStatus = useCallback<OperationsContextValue["setReconciliationStatus"]>(
    ({ itemId, nextStatus, actor, note }) => {
      dispatch({ type: "RECONCILIATION_STATUS", itemId, nextStatus, actor, note });
    },
    []
  );

  const value = useMemo<OperationsContextValue>(
    () => ({
      withdrawCases: state.withdrawCases,
      reconciliation: state.reconciliation,
      auditEvents: state.audit,
      operationalQueue: buildOperationalQueue(state),
      transitionWithdraw,
      setReconciliationStatus
    }),
    [setReconciliationStatus, state, transitionWithdraw]
  );

  return <OperationsContext.Provider value={value}>{children}</OperationsContext.Provider>;
}

export function useOperations(): OperationsContextValue {
  const context = useContext(OperationsContext);

  if (!context) {
    throw new Error("useOperations must be used within OperationsProvider");
  }

  return context;
}
