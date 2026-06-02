import { useDepartments } from "../../hooks/useDepartments";
import { DepartmentTable } from "@/components/department/DepartmentsTable";
import { toast } from "sonner";

export default function DepartmentsPage() {
    const {
        departmentsQuery: { data },
        deleteDepartment,
        deleting,
    } = useDepartments();

    const handleDeleteDepartment = async (id: number) => {
        await toast.promise(
            deleteDepartment(id),
            {
                loading: "Deleting department...",
                success: "Department deleted successfully!",
                error: "Failed to delete department.",
            }
        )
    }

    return (
        <div className="p-6">
            <DepartmentTable
                departments={data || []}
                onDelete={handleDeleteDepartment}
                deleting={deleting}
            />
        </div>
    );
}