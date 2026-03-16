import type { Meta, StoryObj } from "@storybook/react";

import { AgentDetailModal } from "../components/agents/AgentDetailModal";
import { topAgents } from "../data/opa";

const meta: Meta<typeof AgentDetailModal> = {
  title: "Modals/AgentDetailModal",
  component: AgentDetailModal,
  parameters: {
    layout: "fullscreen"
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-slate-100">
        <Story />
      </div>
    )
  ],
  args: {
    open: true,
    onClose: () => undefined,
    agent: topAgents[1]
  },
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof AgentDetailModal>;

export const Default: Story = {};

export const LowBalance: Story = {
  args: {
    agent: topAgents[2]
  }
};
