import { useCourses } from "../../hooks/useCourses";
import { CoursesTable } from "@/components/course/CoursesTable";
import { toast } from "sonner";

export default function CoursesPage() {
    const {
        coursesQuery: { data },
        deleteCourse,
        deleting,
    } = useCourses();

    const handleDeleteCourse = async (id: number) => {
        await toast.promise(
            deleteCourse(id),
            {
                loading: "Deleting department...",
                success: "Department deleted successfully!",
                error: "Failed to delete department.",
            }
        )
    }

    return (
        <div className="p-6">
            <CoursesTable
                courses={data || []}
                onDelete={handleDeleteCourse}
                deleting={deleting}
            />
        </div>
    );
}