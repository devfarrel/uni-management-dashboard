import { ChartEnrollmentStatus } from "@/components/layout/barchart-horizontal";
import { ChartAreaInteractive } from "@/components/layout/chart-area-interactive";
import { ChartDepartmentDonut } from "@/components/layout/chart-donut";
import { SectionCards } from "@/components/layout/section-cards";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { statsQuery, userTrendQuery } = useDashboard()
  
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <SectionCards />
      <div className="px-4 lg:px-6 grid lg:grid-cols-2 gap-4">
        <ChartAreaInteractive data={userTrendQuery.data} className="lg:col-span-2" />
        <ChartEnrollmentStatus data={statsQuery.data?.enrollmentsByStatus} />
        <ChartDepartmentDonut data={statsQuery.data?.departmentStats} />
      </div>
    </div>
  );
}
