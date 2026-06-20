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
}