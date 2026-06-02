import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserAPI, type UpdateProfileInput, type AdminUpdateProfileInput, type UpdateSecurityInput } from "../api/user.api";
import { toast } from "sonner";

export const useUsers = (id?: number) => {
    const queryClient = useQueryClient();

    const userQuery = useQuery({
        queryKey: ["users", id],
        queryFn: () => UserAPI.getById(id!),
        enabled: !!id,
    });

    const usersQuery = useQuery({
        queryKey: ["users"],
        queryFn: UserAPI.getAll,
    });

    const createMutation = useMutation({
        mutationFn: UserAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    });

    const updateProfileMutation = useMutation({
        mutationFn: (data: UpdateProfileInput) => UserAPI.updateProfile(id!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users", id] })
            queryClient.invalidateQueries({ queryKey: ["users"] })
            toast.success("Profile updated successfully!")
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message ?? "Failed to update profile")
        },
    })

    const updateSecurityMutation = useMutation({
        mutationFn: (data: UpdateSecurityInput) => UserAPI.updateSecurity(id!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users", id] })
            toast.success("Security updated successfully!")
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message ?? "Failed to update security settings")
        },
    })

    const adminUpdateMutation = useMutation({
        mutationFn: (data: AdminUpdateProfileInput) => UserAPI.update(id!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users", id] })
            queryClient.invalidateQueries({ queryKey: ["users"] })
            toast.success("Profile updated successfully!")
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message ?? "Failed to update profile")
        },
    })

    const deleteMutation = useMutation({
        mutationFn: UserAPI.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    });

    return {
        userQuery,
        usersQuery,
        createUser: createMutation.mutateAsync,
        creating: createMutation.isPending,
        updateProfile: updateProfileMutation.mutateAsync,
        updatingProfile: updateProfileMutation.isPending,
        updateSecurity: updateSecurityMutation.mutateAsync,
        updatingSecurity: updateSecurityMutation.isPending,
        adminUpdate: adminUpdateMutation.mutateAsync,
        adminUpdating: adminUpdateMutation.isPending,
        deleteUser: deleteMutation.mutateAsync,
        deleting: deleteMutation.isPending,
    };

};