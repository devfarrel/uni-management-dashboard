import type { Enrollment } from "@/api/enrollment.api"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"

import { getRosterColumns } from "./column"

type Props = {
  enrollments: Enrollment[]
  isAdmin:     boolean
  onDrop:      (id: number) => void
  dropping:    boolean
  onGrade:     (id: number, grade: string) => void
  grading:     boolean
  onWaitlist:  (id: number) => void
  waitlisting: boolean
  title?:      string
  showEnroll?: boolean
  enrollPath?: string
}

export function RosterTable({
    enrollments,
    isAdmin,
    onDrop,
    dropping,
    onGrade,
    grading,
    onWaitlist,
    waitlisting,
    title = "Class Roster",
    showEnroll = true,
    enrollPath = "/enroll",
}: Props) {
  const columns = getRosterColumns({ onDrop, dropping, onGrade, grading, onWaitlist, waitlisting })
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        {isAdmin && showEnroll && (
          <Button onClick={() => navigate(enrollPath!)}>
            Enroll
          </Button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={enrollments}
        searchKey="name"
        searchPlaceholder="Search students..."
      />
    </div>
  )
}