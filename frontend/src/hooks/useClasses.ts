import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ClassAPI, type ClassInput } from "@/api/class.api"
import { toast } from "sonner"

export const useClasses = (id?: number) => {
    const queryClient = useQueryClient()

    const classesQuery = useQuery({
        queryKey: ["classes"],
        queryFn: ClassAPI.getAll,
    })

    const classQuery = useQuery({
        queryKey: ["classes", id],
        queryFn: () => ClassAPI.getById(id!),
        enabled: !!id
    })

    const createMutation = useMutation({
        mutationFn: (data: ClassInput) => ClassAPI.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classes"] })
            toast.success("Class created successfully!")
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message ?? "Failed to create class")
        },
    })

    const updateMutation = useMutation({
        mutationFn: (data: ClassInput) => ClassAPI.update(id!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classes"] })
            queryClient.invalidateQueries({ queryKey: ["classes", id]})
            toast.success("Class updated successfully!")
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message ?? "Failed to update class")
        },
    })

    const deleteMutation = useMutation({
        mutationFn: (id: number) => ClassAPI.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classes"] })
            toast.success("Class deleted successfully!")
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message ?? "Failed to delete class")
        }
    })

    return {
        classesQuery,
        classQuery,
        createClass: createMutation.mutateAsync,
        creating: createMutation.isPending,
        updateClass: updateMutation.mutateAsync,
        updating: updateMutation.isPending,
        deleteClass: deleteMutation.mutateAsync,
        deleting: deleteMutation.isPending,
    }
}