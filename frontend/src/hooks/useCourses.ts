import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { CourseAPI } from "@/api/course.api"

export const useCourses = () => {
    const queryClient = useQueryClient()

    const coursesQuery = useQuery({
        queryKey: ["courses"],
        queryFn: CourseAPI.getAll,
    })

    const createMutation = useMutation({
        mutationFn: CourseAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courses"] })
        },
    })

    const deleteMutation = useMutation({
        mutationFn: (id: number) => CourseAPI.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courses"] })
        },
    })

    return {
        coursesQuery,
        createCourse: createMutation.mutateAsync,
        creating: createMutation.isPending,
        deleteCourse: deleteMutation.mutateAsync,
        deleting: deleteMutation.isPending,
    }
}