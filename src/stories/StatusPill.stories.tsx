import type { Meta, StoryObj } from "@storybook/react";

import { StatusPill } from "../components/mobile/StatusPill";

const meta: Meta<typeof StatusPill> = {
  title: "Mobile/StatusPill",
  component: StatusPill,
  args: {
    label: "Activo",
    count: 5,
    tone: "active"
  },
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof StatusPill>;

export const Active: Story = {};

export const Warning: Story = {
  args: {
    label: "Advertencia",
    count: 1,
    tone: "warning"
  }
};

export const Danger: Story = {
  args: {
    label: "Desactivado",
    count: 1,
    tone: "danger"
  }
};
