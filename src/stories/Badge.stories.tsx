import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "../components/ui/Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  args: {
    children: "Estado"
  },
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Info: Story = {
  args: {
    tone: "info"
  }
};

export const Success: Story = {
  args: {
    tone: "success"
  }
};

export const Warning: Story = {
  args: {
    tone: "warning"
  }
};
