import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetMe, Login, Logout } from "@/api/auth.api";

export function useAuth() {
  const queryClient = useQueryClient();

  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: GetMe,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: Login,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["me"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
    },
  });

  return {
    user: meQuery.data,
    isAuthenticated: !!meQuery.data,
    loading: meQuery.isLoading,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };
}
