import type { Course } from "@/api/course.api"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { getCourseColumns } from "@/components/course/columns"

type Props = {
  courses: Course[]
  onDelete: (id: number) => void
  deleting: boolean
  title?: string
  showCreate?: boolean
  createPath?: string
}

export function CoursesTable({
  courses,
  onDelete,
  deleting,
  title = "Courses",
  showCreate = true,
  createPath = "/courses/new",
}: Props) {
  const navigate = useNavigate()
  const columns = getCourseColumns({ onDelete, deleting })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        {showCreate && (
          <Button onClick={() => navigate(createPath!)}>
            Create Course
          </Button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={courses}
        searchKey="code"
        searchPlaceholder="Search courses by code..."
      />
    </div>
  )
}