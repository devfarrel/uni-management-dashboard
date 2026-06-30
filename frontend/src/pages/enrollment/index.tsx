// pages/enrollment/index.tsx
import { useNavigate } from "react-router-dom"
import { useEnrollments } from "@/hooks/useEnrollments"
import { EnrollmentsTable } from "@/components/enrollment/EnrollmentsTable"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import type { EnrollmentStatus } from "@/api/enrollment.api"

export default function EnrollmentsPage() {
  const navigate = useNavigate()
  const {
    enrollmentQuery,
    drop,         dropping,
    updateStatus, updatingStatus,
  } = useEnrollments()

  const enrollments = enrollmentQuery.data ?? []

  const handleDrop = async (id: number) => {
    try {
      await toast.promise(
        drop(id),
        {
          loading: "Removing enrollment...",
          success: "Enrollment removed!",
          error:   (err) => err.response?.data?.message ?? "Failed to remove",
        }
      )
    } catch {
      // toast handles it
    }
  }

  const handleStatusChange = async (id: number, status: EnrollmentStatus) => {
    try {
      await toast.promise(
        updateStatus({ id, data: { status } }),
        {
          loading: "Updating status...",
          success: "Status updated!",
          error:   (err) => err.response?.data?.message ?? "Failed to update status",
        }
      )
    } catch {
      // toast handles it
    }
  }

  if (enrollmentQuery.isLoading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6">
      <EnrollmentsTable
        enrollments={enrollments}
        onDrop={handleDrop}
        onStatusChange={handleStatusChange}
        dropping={dropping}
        updatingStatus={updatingStatus}
      />
    </div>
  )
}