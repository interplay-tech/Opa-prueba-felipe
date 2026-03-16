import type { Meta, StoryObj } from "@storybook/react";

import { SubConcessionaryCard } from "../components/agents/SubConcessionaryCard";
import type { SubConcessionary } from "../data/opa";

const card: SubConcessionary = {
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
      id: "a-3",
      name: "Agente 3",
      code: "20067",
      email: "veronicapavasub@gmail.com",
      available: "L1457.00",
      prizes: "L 0.00",
      commissions: "L 0.00",
      state: "warning"
    }
  ]
};

const meta: Meta<typeof SubConcessionaryCard> = {
  title: "Agents/SubConcessionaryCard",
  component: SubConcessionaryCard,
  args: {
    card,
    expanded: true,
    selectedFilter: "active",
    onToggle: () => undefined,
    onFilterChange: () => undefined
  },
  decorators: [
    (Story) => (
      <div className="w-[343px] bg-[#e8ecf7] p-2">
        <Story />
      </div>
    )
  ],
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof SubConcessionaryCard>;

export const ExpandedActive: Story = {};

export const ExpandedWarning: Story = {
  args: {
    selectedFilter: "warning"
  }
};

export const Collapsed: Story = {
  args: {
    expanded: false
  }
};
