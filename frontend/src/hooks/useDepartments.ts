import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DepartmentAPI } from "@/api/department.api";

export const useDepartments = (id?: number) => {
  const queryClient = useQueryClient();

  const departmentsQuery = useQuery({
    queryKey: ["departments"],
    queryFn: DepartmentAPI.getAll,
  });

  const departmentQuery = useQuery({
    queryKey: ["departments", id],
    queryFn: () => DepartmentAPI.getById(id!),
    enabled: !!id,
  });

  const createMutation = useMutation({
    mutationFn: DepartmentAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: DepartmentAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  return {
    departmentQuery,
    departmentsQuery,
    createDepartment: createMutation.mutateAsync,
    creating: createMutation.isPending,
    deleteDepartment: deleteMutation.mutateAsync,
    deleting: deleteMutation.isPending,
  };
};
