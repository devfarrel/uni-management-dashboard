"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card, CardAction, CardContent,
  CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer, ChartTooltip,
  ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const chartConfig = {
  students:  { label: "Students",  color: "var(--chart-3)" },
  lecturers: { label: "Lecturers", color: "var(--chart-2)" },
} satisfies ChartConfig;

type UserTrendItem = {
  month:     string
  students:  number
  lecturers: number
}

type Props = {
  data?:      UserTrendItem[]
  className?: string
}

export function ChartAreaInteractive({ data = [], className }: Props) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d")
  }, [isMobile])

  const filteredData = data.filter((item) => {
    const date = new Date(item.month + "-01")
    const now  = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") daysToSubtract = 30
    if (timeRange === "7d")  daysToSubtract = 7
    const startDate = new Date(now)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className={`@container/card ${className ?? ""}`}>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">New students and lecturers over time</span>
          <span className="@[540px]/card:hidden">User growth</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">Last 3 months</SelectItem>
              <SelectItem value="30d" className="rounded-lg">Last 30 days</SelectItem>
              <SelectItem value="7d"  className="rounded-lg">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillStudents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="var(--color-students)"  stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-students)"  stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillLecturers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="var(--color-lecturers)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-lecturers)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value + "-01")
                return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value + "-01").toLocaleDateString("en-US", {
                      month: "long", year: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area dataKey="students"  type="natural" fill="url(#fillStudents)"  stroke="var(--color-students)"  stackId="a" />
            <Area dataKey="lecturers" type="natural" fill="url(#fillLecturers)" stroke="var(--color-lecturers)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}