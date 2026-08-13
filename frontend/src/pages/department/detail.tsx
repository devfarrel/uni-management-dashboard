import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useDepartments } from "@/hooks/useDepartments";
import { useCourses } from "@/hooks/useCourses";
import { useClasses } from "@/hooks/useClasses";

import { DepartmentDetail } from "@/components/department/detail-columns";

export default function DepartmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const departmentId = Number(id);

  const {
    departmentQuery: { data: department, isLoading: loadingDepartment },
  } = useDepartments(departmentId);

  const {
    coursesQuery: { data: allCourses, isLoading: loadingCourses },
    deleteCourse,
    deleting: deletingCourse,
  } = useCourses();

  const {
    classesQuery: { data: allClasses, isLoading: loadingClasses },
    deleteClass,
    deleting: deletingClass,
  } = useClasses();

  const courses = (allCourses ?? []).filter(
    (c) => c.departmentId === departmentId,
  );
  const courseIds = new Set(courses.map((c) => c.id));
  const classes = (allClasses ?? []).filter((cls) =>
    courseIds.has(cls.courseId),
  );

  const handleDeleteCourse = async (courseId: number) => {
    await toast.promise(deleteCourse(courseId), {
      loading: "Deleting course...",
      success: "Course deleted successfully!",
      error: "Failed to delete course.",
    });
  };

  const handleDeleteClass = async (classId: number) => {
    await toast.promise(deleteClass(classId), {
      loading: "Deleting class...",
      success: "Class deleted successfully!",
      error: "Failed to delete class.",
    });
  };

  if (loadingDepartment || loadingCourses || loadingClasses) {
    return (
      <div className="px-4 lg:px-6 text-sm text-muted-foreground">
        Loading department...
      </div>
    );
  }

  if (!department) {
    return (
      <div className="px-4 lg:px-6 text-sm text-muted-foreground">
        Department not found.
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-6">
      <DepartmentDetail
        department={department}
        courses={courses}
        classes={classes}
        onDeleteCourse={handleDeleteCourse}
        deletingCourse={deletingCourse}
        onDeleteClass={handleDeleteClass}
        deletingClass={deletingClass}
      />
    </div>
  );
}
