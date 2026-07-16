"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer, ChartTooltip,
  ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart"

type DepartmentStat = {
  name:        string
  code:        string
  enrollments: number
}

type Props = {
  data?: DepartmentStat[]
}

export function ChartDepartmentDonut({ data = [] }: Props) {
  const chartData = data.map((d, i) => ({
    department:  d.code,
    enrollments: d.enrollments,
    fill:        `var(--chart-${(i % 5) + 2})`,
  }))

  const chartConfig: ChartConfig = {
    enrollments: { label: "Enrollments" },
    ...Object.fromEntries(
      data.map((d, i) => [
        d.name,
        { label: d.name, color: `var(--chart-${(i % 5) + 2})` }
      ])
    )
  }

  const total = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.enrollments, 0),
    [chartData]
  )

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Department Enrollment</CardTitle>
        <CardDescription>Enrollments per department</CardDescription>
        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
            {data.map((d, i) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: `var(--chart-${(i % 5) + 2})` }}
                />
                <span className="text-muted-foreground">
                <span className="font-medium text-foreground">{d.code}</span>
                {" - "}
                {d.name}
                </span>
            </div>
            ))}
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="enrollments"
              nameKey="department"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Enrollments
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          {data.length} department{data.length !== 1 ? "s" : ""} · {total} total enrollments
        </div>
      </CardFooter>
    </Card>
  )
}