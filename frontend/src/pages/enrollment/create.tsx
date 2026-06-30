import { useNavigate } from "react-router-dom"
import { useEnrollments } from "@/hooks/useEnrollments"
import { EnrollmentsForm } from "@/components/enrollment/EnrollmentsForm"
import { toast } from "sonner"

export default function CreateEnrollmentPage() {
  const navigate       = useNavigate()
  const { enroll, enrolling } = useEnrollments()

  const handleEnroll = async (data: { studentId: number; classId: number }) => {
    try {
      await toast.promise(
        enroll(data),
        {
          loading: "Enrolling student...",
          success: (res) => res.status === "WAITLISTED"
            ? "Class is full — student added to waitlist!"
            : "Student enrolled successfully!",
          error: (err) => err.response?.data?.message ?? "Failed to enroll",
        }
      )
      navigate("/enrollments")
    } catch {
      // toast handles it
    }
  }

  return (
    <div className="p-6">
        <EnrollmentsForm onSubmit={handleEnroll} />
    </div>
  )
}