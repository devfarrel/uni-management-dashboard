import type { Department } from "@/api/department.api"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { getDepartmentColumns } from "@/components/department/columns"

type Props = {
  departments: Department[]
  onDelete: (id: number) => void
  deleting: boolean
  title?: string
  showCreate?: boolean
  createPath?: string
}

export function DepartmentTable({
  departments,
  onDelete,
  deleting,
  title = "Departments",
  showCreate = true,
  createPath = "/departments/new"
}: Props) {
  const columns = getDepartmentColumns({ onDelete, deleting })
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        {showCreate && (
          <Button onClick={() => navigate(createPath!)}>
            Create Department
          </Button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={departments ?? []}
        searchKey="name"
        searchPlaceholder="Search departments by name..."
      />
    </div>
  )
}