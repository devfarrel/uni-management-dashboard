import { useNavigate } from "react-router-dom";
import { DepartmentForm } from "@/components/department/DepartmentsForm";
import type { CreateDepartmentInput } from "@/api/department.api";
import { toast } from "sonner";
import { useDepartments } from "@/hooks/useDepartments";

export default function CreateDepartmentPage() {
    const navigate = useNavigate();
    const { createDepartment } = useDepartments();

    const handleCreateDepartment = async (data: CreateDepartmentInput) => {
      await toast.promise(
        createDepartment(data),
        {
          loading: "Creating department...",
          success: "Department created successfully!",
          error: "Failed to create department.",
        }
      )
      navigate("/departments")
    }

    return (
        <div>
            <DepartmentForm
              mode="create"
              onSubmit={handleCreateDepartment}
            />
        </div>
    );
}