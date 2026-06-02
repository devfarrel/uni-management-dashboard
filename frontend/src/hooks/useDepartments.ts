import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { DepartmentAPI } from "@/api/department.api"

export const useDepartments = () => {
    const queryClient = useQueryClient();

    const departmentsQuery = useQuery({
        queryKey: ["departments"],
        queryFn: DepartmentAPI.getAll,
    });

    const createMutation = useMutation({
        mutationFn: DepartmentAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["departments"] })
        },
    });

    const deleteMutation = useMutation({
        mutationFn: DepartmentAPI.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["departments"] })
        },
    });

    return {
        departmentsQuery,
        createDepartment: createMutation.mutateAsync,
        creating: createMutation.isPending,
        deleteDepartment: deleteMutation.mutateAsync,
        deleting: deleteMutation.isPending,
    };
}