"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface IChartAreaInteractiveProps {
  totalVisitors: {
    date: string;
    consultation: number;
    scholarship: number;
    reRegister: number;
    pmb: number;
  }[];
}

const chartConfig = {
  consultation: {
    label: "Consultation",
    color: "hsl(var(--chart-1))",
  },
  scholarship: {
    label: "Scholarship",
    color: "hsl(var(--chart-2))",
  },
  reRegister: {
    label: "ReRegister",
    color: "hsl(var(--chart-3))",
  },
  pmb: {
    label: "PMB",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({
  totalVisitors,
}: IChartAreaInteractiveProps) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("30d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = totalVisitors.filter((item) => {
    const date = new Date(item.date);
    const today = new Date(); // <<== pakai hari ini, dinamis
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Total Form Entries</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          {filteredData.length === 0 ? (
            <div className="flex h-[250px] items-center justify-center text-muted-foreground">
              No data available for selected period
            </div>
          ) : (
            <AreaChart data={filteredData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="consultation"
                type="monotone"
                fill="hsl(var(--chart-1) / 0.3)"
                stroke="hsl(var(--chart-1))"
              />
              <Area
                dataKey="scholarship"
                type="monotone"
                fill="hsl(var(--chart-2) / 0.3)"
                stroke="hsl(var(--chart-2))"
              />
              <Area
                dataKey="reRegister"
                type="monotone"
                fill="hsl(var(--chart-3) / 0.3)"
                stroke="hsl(var(--chart-3))"
              />
              <Area
                dataKey="pmb"
                type="monotone"
                fill="hsl(var(--chart-4) / 0.3)"
                stroke="hsl(var(--chart-4))"
              />
            </AreaChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
