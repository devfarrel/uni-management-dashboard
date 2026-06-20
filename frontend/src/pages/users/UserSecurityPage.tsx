import { useParams, useNavigate } from "react-router-dom"
import { useUsers } from "@/hooks/useUsers"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ChevronRight } from "lucide-react"

export default function UserSecurityPage() {
  const { id }             = useParams()
  const navigate           = useNavigate()
  const { user: authUser } = useAuth()
  const { userQuery }      = useUsers(Number(id))
  const user               = userQuery.data

  const isAdmin      = authUser?.role === "ADMIN"
  const isOwnProfile = authUser?.id === Number(id)
  if (!isAdmin && !isOwnProfile) navigate("/users")

  if (userQuery.isLoading) return <div className="p-6">Loading...</div>
  if (!user) return <div className="p-6">User not found</div>

  return (
    <div className="px-6 space-y-6">
      <Button variant="ghost" onClick={() => navigate(`/users/${id}`)} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Profile
      </Button>

      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Account Security</h1>
        <p className="text-sm text-muted-foreground">
          Manage sensitive account information for {user.name ?? user.username}.
        </p>
      </div>

      <Card className="p-0 gap-0">
        <CardContent className="p-0 divide-y">
          <button
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors"
            onClick={() => navigate(`/users/${id}/security/email`)}
          >
            <div className="text-left">
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>

          <button
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors"
            onClick={() => navigate(`/users/${id}/security/username`)}
          >
            <div className="text-left">
              <p className="text-sm font-medium">Username</p>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>

          <button
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors"
            onClick={() => navigate(`/users/${id}/security/password`)}
          >
            <div className="text-left">
              <p className="text-sm font-medium">Password</p>
              <p className="text-sm text-muted-foreground">••••••••</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </CardContent>
      </Card>
    </div>
  )
}