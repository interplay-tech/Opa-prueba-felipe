import type { Meta, StoryObj } from "@storybook/react";

import { OperatorShareQrModal } from "../components/dashboard/OperatorShareQrModal";

const meta: Meta<typeof OperatorShareQrModal> = {
  title: "Modals/OperatorShareQrModal",
  component: OperatorShareQrModal,
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
    onClose: () => undefined
  },
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof OperatorShareQrModal>;

export const Default: Story = {};
