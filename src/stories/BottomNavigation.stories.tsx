import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { BottomNavigation } from "../components/layout/BottomNavigation";

const meta: Meta<typeof BottomNavigation> = {
  title: "Layout/BottomNavigation",
  component: BottomNavigation,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/dashboard"]}>
        <div className="relative h-[220px] w-[393px] overflow-hidden rounded-2xl bg-[#e8ecf7]">
          <Story />
        </div>
      </MemoryRouter>
    )
  ],
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof BottomNavigation>;

export const Default: Story = {};
