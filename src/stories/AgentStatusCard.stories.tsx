import type { Meta, StoryObj } from "@storybook/react";

import { AgentStatusCard } from "../components/agents/AgentStatusCard";

const meta: Meta<typeof AgentStatusCard> = {
  title: "Agents/AgentStatusCard",
  component: AgentStatusCard,
  args: {
    agent: {
      id: "a-1",
      name: "Agente 1",
      code: "20067",
      email: "veronicapavasub@gmail.com",
      available: "L1457.00",
      prizes: "L 0.00",
      commissions: "L 0.00",
      state: "active"
    }
  },
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof AgentStatusCard>;

export const Active: Story = {};

export const Warning: Story = {
  args: {
    agent: {
      id: "a-3",
      name: "Agente 3",
      code: "20067",
      email: "veronicapavasub@gmail.com",
      available: "L1457.00",
      prizes: "L 0.00",
      commissions: "L 0.00",
      state: "warning"
    }
  }
};

export const Disabled: Story = {
  args: {
    agent: {
      id: "a-4",
      name: "Agente 4",
      code: "20067",
      email: "veronicapavasub@gmail.com",
      available: "L1457.00",
      prizes: "L 0.00",
      commissions: "L 0.00",
      state: "disabled"
    }
  }
};
