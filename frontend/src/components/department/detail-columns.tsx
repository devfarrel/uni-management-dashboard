import type { Department } from "@/api/department.api";
import type { Course } from "@/api/course.api";
import type { Class } from "@/api/class.api";

import { DataTable } from "@/components/data-table";
import { getCourseColumns } from "@/components/course/columns";
import { getClassColumns } from "@/components/class/columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  department: Department;
  courses: Course[];
  classes: Class[];
  onDeleteCourse: (id: number) => void;
  deletingCourse: boolean;
  onDeleteClass: (id: number) => void;
  deletingClass: boolean;
};

export function DepartmentDetail({
  department,
  courses,
  classes,
  onDeleteCourse,
  deletingCourse,
  onDeleteClass,
  deletingClass,
}: Props) {
  const courseColumns = getCourseColumns({
    onDelete: onDeleteCourse,
    deleting: deletingCourse,
  });
  const classColumns = getClassColumns({
    onDelete: onDeleteClass,
    deleting: deletingClass,
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{department.name}</CardTitle>
            <Badge variant="secondary">{department.code}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Faculty: {department.faculty}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Available Courses</h2>
            <DataTable
              columns={courseColumns}
              data={courses ?? []}
              searchKey="title"
              searchPlaceholder="Search courses by title..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Available Classes</h2>
            <DataTable
              columns={classColumns}
              data={classes ?? []}
              searchKey="name"
              searchPlaceholder="Search classes by code..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
