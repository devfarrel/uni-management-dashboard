import { useClasses } from "@/hooks/useClasses";
import { ClassesTable } from "@/components/class/ClassTable";
import { toast } from "sonner";

export default function ClassesPage() {
    const {
        classesQuery: { data },
        deleteClass,
        deleting,
    } = useClasses();

    const handleDeleteClass = async (id: number) => {
        await toast.promise(
            deleteClass(id),
            {
                loading: "Deleting class...",
                success: "Class deleted successfully!",
                error: "Failed to delete class.",
            }
        )
    }

    return (
        <div className="p-6">
            <ClassesTable
                classes={data ?? []}
                onDelete={handleDeleteClass}
                deleting={deleting}
            />
        </div>
    );
}