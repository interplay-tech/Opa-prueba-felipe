import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "lucide-react";

import { Input } from "../components/ui/Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  args: {
    placeholder: "Buscar..."
  },
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: Search
  }
};
