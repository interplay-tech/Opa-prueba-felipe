import type { Meta, StoryObj } from "@storybook/react";

import { KpiCard } from "../components/dashboard/KpiCard";

const meta: Meta<typeof KpiCard> = {
  title: "Dashboard/KpiCard",
  component: KpiCard,
  args: {
    title: "Saldo disponible",
    value: "$21,840.00",
    delta: "+8.4%",
    positive: true
  },
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof KpiCard>;

export const Positive: Story = {};

export const Negative: Story = {
  args: {
    positive: false,
    delta: "-1.4%"
  }
};
