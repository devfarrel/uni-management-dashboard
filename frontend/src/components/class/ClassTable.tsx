import type { Class } from "@/api/class.api"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { getClassColumns } from "@/components/class/columns"

type Props = {
  classes: Class[]
  onDelete: (id: number) => void
  deleting: boolean
  title?: string
  showCreate?: boolean
  createPath?: string
}

export function ClassesTable({
    classes,
    onDelete,
    deleting,
    title = "Classes",
    showCreate = true,
    createPath = "/classes/new",
}: Props) {
  const columns = getClassColumns({ onDelete, deleting })
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        {showCreate && (
          <Button onClick={() => navigate(createPath!)}>
            Create Class
          </Button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={classes}
        searchKey="room"
        searchPlaceholder="Search classes by room..."
      />
    </div>
  )
}