import { Navigate, Route, Routes } from "react-router-dom";

import { AppShell } from "./components/layout/AppShell";
import { AgentsPage } from "./pages/AgentsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ReportsPage } from "./pages/ReportsPage";
import { ReportTemplatePage } from "./pages/ReportTemplatePage";
import { SupportPage } from "./pages/SupportPage";
import { AccountSettingsPage } from "./pages/modules/AccountSettingsPage";
import { AuditLogPage } from "./pages/modules/AuditLogPage";
import { BetsHistoryPage } from "./pages/modules/BetsHistoryPage";
import { OperationsQueuePage } from "./pages/modules/OperationsQueuePage";
import { RechargeMethodsPage } from "./pages/modules/RechargeMethodsPage";
import { ReconciliationPage } from "./pages/modules/ReconciliationPage";
import { TransactionsHistoryPage } from "./pages/modules/TransactionsHistoryPage";
import { WithdrawCancelPage } from "./pages/modules/WithdrawCancelPage";
import { WithdrawStatusPage } from "./pages/modules/WithdrawStatusPage";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<Navigate replace to="/login" />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<ProfilePage />} path="/profile" />

      <Route element={<AppShell />}>
        <Route element={<DashboardPage />} path="/dashboard" />
        <Route element={<AgentsPage />} path="/agents" />
        <Route element={<ReportsPage />} path="/reports" />
        <Route element={<ReportTemplatePage />} path="/reports/:reportId" />
        <Route element={<SupportPage />} path="/support" />
        <Route element={<OperationsQueuePage />} path="/modules/operations-queue" />
        <Route element={<RechargeMethodsPage />} path="/modules/recharge-methods" />
        <Route element={<WithdrawStatusPage />} path="/modules/withdraw-status" />
        <Route element={<WithdrawCancelPage />} path="/modules/withdraw-cancel" />
        <Route element={<ReconciliationPage />} path="/modules/reconciliation" />
        <Route element={<AuditLogPage />} path="/modules/audit-log" />
        <Route element={<BetsHistoryPage />} path="/modules/bets-history" />
        <Route element={<TransactionsHistoryPage />} path="/modules/transactions-history" />
        <Route element={<AccountSettingsPage />} path="/modules/account-settings" />
      </Route>

      <Route element={<Navigate replace to="/login" />} path="*" />
    </Routes>
  );
}
