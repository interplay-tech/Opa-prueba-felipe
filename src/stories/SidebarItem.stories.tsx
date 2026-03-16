import type { Meta, StoryObj } from "@storybook/react";
import { LayoutDashboard } from "lucide-react";
import { MemoryRouter } from "react-router-dom";

import { SidebarItem } from "../components/layout/Sidebar";

const meta: Meta<typeof SidebarItem> = {
  title: "Layout/SidebarItem",
  component: SidebarItem,
  args: {
    icon: LayoutDashboard,
    label: "Dashboard",
    to: "/dashboard"
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/dashboard"]}>
        <div className="w-[240px] rounded-2xl bg-[var(--opa-navy)] p-3">
          <Story />
        </div>
      </MemoryRouter>
    )
  ],
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof SidebarItem>;

export const Active: Story = {};

export const Inactive: Story = {
  args: {
    to: "/reports"
  }
};
