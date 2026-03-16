import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { DashboardInsightModal } from "../components/dashboard/DashboardInsightModal";

const meta: Meta<typeof DashboardInsightModal> = {
  title: "Modals/DashboardInsightModal",
  component: DashboardInsightModal,
  parameters: {
    layout: "fullscreen"
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="min-h-screen bg-slate-100">
          <Story />
        </div>
      </MemoryRouter>
    )
  ],
  args: {
    open: true,
    onClose: () => undefined,
    operatorScope: "concessionary",
    cardId: "recharge"
  },
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof DashboardInsightModal>;

export const RechargeConcessionary: Story = {};

export const SalesConcessionary: Story = {
  args: {
    cardId: "sales"
  }
};

export const AlertsSubconcessionary: Story = {
  args: {
    cardId: "alerts",
    operatorScope: "subconcessionary"
  }
};
