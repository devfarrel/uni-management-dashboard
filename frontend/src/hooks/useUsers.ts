import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers, createUser } from "../api/user.api";

export const useUsers = () => {
    const queryClient = useQueryClient();

    const usersQuery = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    const createMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    });

    return {
        usersQuery,
        createUser: createMutation.mutateAsync,
        creating: createMutation.isPending,
        deleteUser: deleteMutation.mutateAsync,
        deleting: deleteMutation.isPending,
    };

};