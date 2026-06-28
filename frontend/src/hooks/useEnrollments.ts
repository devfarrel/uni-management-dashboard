import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { EnrollmentAPI, type UpdateEnrollmentInput, type CreateEnrollmentInput } from "@/api/enrollment.api"
import { toast } from "sonner"

export const useEnrollments = (classId?: number) => {
    const queryClient = useQueryClient()

    const enrollmentQuery = useQuery({
        queryKey: ["enrollments"],
        queryFn: EnrollmentAPI.getAll,
    })

    const myEnrollmentQuery = useQuery({
        queryKey: ["enrollments", "my"],
        queryFn: EnrollmentAPI.getMyEnrollments,
    })

    const classEnrollmentsQuery = useQuery({
        queryKey: ["enrollments", "class", classId],
        queryFn: () => EnrollmentAPI.getByClass(classId!),
        enabled: !!classId,
    })

    const enrollMutation = useMutation({
        mutationFn: (data: CreateEnrollmentInput) => EnrollmentAPI.enroll(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["enrollments"] })
            queryClient.invalidateQueries({ queryKey: ["classes"] })
            if (data.status === "WAITLISTED") {
                toast.info("Class is full - you have been added to the waitlist")
            } else {
                toast.success("Enrolled successfully!")
            }
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message ?? "Failed to enroll")
        },
    })

    const dropMutation = useMutation({
        mutationFn: (id: number) => EnrollmentAPI.drop(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["enrollments"] })
            queryClient.invalidateQueries({ queryKey: ["classes"] })
            toast.success("Dropped successfully!")
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message ?? "Failed to drop")
        },
    })

    const updateStatusMutation = useMutation({
        mutationFn: ( {id, data}: {id: number, data: UpdateEnrollmentInput }) => EnrollmentAPI.updateStatus(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["enrollments"] })
            toast.success("Status Updated!")
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message ?? "Failed to update status")
        },
    })

    return {
        enrollmentQuery,
        myEnrollmentQuery,
        classEnrollmentsQuery,
        enroll:         enrollMutation.mutateAsync,
        enrolling:      enrollMutation.isPending,
        drop:           dropMutation.mutateAsync,
        dropping:       dropMutation.isPending,
        updateStatus:   updateStatusMutation.mutateAsync,
        updatingStatus: updateStatusMutation.isPending,
    }
}