import type { Meta, StoryObj } from "@storybook/react";

import { MetricSlideCard } from "../components/mobile/MetricSlideCard";

const meta: Meta<typeof MetricSlideCard> = {
  title: "Mobile/MetricSlideCard",
  component: MetricSlideCard,
  args: {
    title: "Ventas totales",
    subtitle: "Ultimo mes:",
    value: "L 847.562",
    accent: "gradient"
  },
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof MetricSlideCard>;

export const Gradient: Story = {};

export const Dark: Story = {
  args: {
    title: "Recarga de saldo",
    accent: "dark",
    subtitle: undefined,
    value: undefined
  }
};
