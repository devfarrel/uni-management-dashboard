import { useNavigate } from "react-router-dom";
import { CourseForm } from "@/components/course/CoursesForm";
import type { CourseInput } from "@/api/course.api";
import { toast } from "sonner";
import { useCourses } from "@/hooks/useCourses";

export default function CreateCoursePage() {
    const navigate = useNavigate();
    const { createCourse } = useCourses();

    const handleCreateCourse = async (data: CourseInput) => {
      await toast.promise(
        createCourse(data),
        {
          loading: "Creating course...",
          success: "Course created successfully!",
          error: (err) => `Failed: ${err.message}`,
        }
      )
      navigate("/courses")
    }

    return (
        <div>
            <CourseForm
              mode="create"
              onSubmit={handleCreateCourse}
            />
        </div>
    );
}