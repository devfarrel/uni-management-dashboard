import { useNavigate } from "react-router-dom"
import { ClassForm } from "@/components/class/ClassForm"
import type { ClassInput } from "@/api/class.api"
import { useClasses } from "@/hooks/useClasses"
import { toast } from "sonner"

export default function CreateClassPage() {
  const navigate           = useNavigate()
  const { createClass }    = useClasses()

  const handleCreate = async (data: ClassInput) => {
    try {
      await toast.promise(
        createClass(data),
        {
          loading: "Creating class...",
          success: "Class created successfully!",
          error:   (err) => err.response?.data?.message ?? "Failed to create class",
        }
      )
      navigate("/classes")
    } catch {
      // toast handles it
    }
  }

  return (
    <div className="p-6">
      <ClassForm mode="create" onSubmit={handleCreate} />
    </div>
  )
}