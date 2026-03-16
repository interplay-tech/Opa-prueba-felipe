import type { Meta, StoryObj } from "@storybook/react";

import { AgentSummaryCard } from "../components/mobile/AgentSummaryCard";

const meta: Meta<typeof AgentSummaryCard> = {
  title: "Mobile/AgentSummaryCard",
  component: AgentSummaryCard,
  args: {
    agent: {
      id: "ag-01",
      initials: "AM",
      name: "Ana Martinez",
      role: "Agente • Este",
      status: "active",
      sales: "L 75,000",
      trend: "8.4%",
      trendDirection: "up"
    }
  },
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof AgentSummaryCard>;

export const Active: Story = {};

export const Inactive: Story = {
  args: {
    agent: {
      id: "ag-02",
      initials: "RD",
      name: "Roberto Diaz",
      role: "Sub-Agente • Oeste",
      status: "inactive",
      sales: "L 45,000",
      trend: "5.3%",
      trendDirection: "down"
    }
  }
};
