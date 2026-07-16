import { useQuery } from "@tanstack/react-query"
import { api } from "@/api/axios"

export const useDashboard = () => {
  const statsQuery = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn:  async () => {
      const res = await api.get("/dashboard/stats")
      return res.data
    },
  })

  const trendQuery = useQuery({
    queryKey: ["dashboard", "trend"],
    queryFn:  async () => {
      const res = await api.get("/dashboard/trend")
      return res.data
    },
  })

  const userTrendQuery = useQuery({
    queryKey: ["dashboard", "user-trend"],
    queryFn:  async () => {
      const res = await api.get("/dashboard/user-trend")
      return res.data
    },
  })

  return {
    statsQuery,
    trendQuery,
    userTrendQuery,
  }
}