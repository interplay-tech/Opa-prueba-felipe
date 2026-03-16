import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader } from "../components/ui/Card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[320px]">
      <CardHeader>
        <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Widget</p>
        <h3 className="text-lg font-bold text-slate-900">Estado operativo</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600">Componente base reutilizable para modulos del dashboard.</p>
      </CardContent>
    </Card>
  )
};
