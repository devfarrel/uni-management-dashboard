import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer, ChartTooltip,
  ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart"

const chartConfig = {
  count: {
    label: "Students",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

type Props = {
  data?: { status: string; count: number }[]
}

export function ChartEnrollmentStatus({ data = [] }: Props) {
  const total = data.reduce((sum, e) => sum + e.count, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enrollment Status</CardTitle>
        <CardDescription>Breakdown of all enrollments</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ left: 10 }}
          >
            <XAxis type="number" dataKey="count" hide />
            <YAxis
              dataKey="status"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const labels: Record<string, string> = {
                  ENROLLED:   "Enrolled",
                  WAITLISTED: "Waitlisted",
                  DROPPED:    "Dropped",
                }
                return labels[value] ?? value
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Total {total} enrollments across all classes
        </div>
      </CardFooter>
    </Card>
  )
}