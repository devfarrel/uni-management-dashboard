// pages/users/UserDetailPage.tsx
import { useParams, useNavigate } from "react-router-dom"
import { useUsers } from "@/hooks/useUsers"
import { useAuth } from "@/hooks/useAuth"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { UserIcon, ArrowLeft, Shield } from "lucide-react"
import { InlineEditField } from "@/components/users/InlineEditField"
import type { UpdateProfileInput } from "@/api/user.api"

const roleBadgeVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  ADMIN:    "destructive",
  LECTURER: "default",
  STUDENT:  "secondary",
  USER:     "outline",
}

export default function UserDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user: authUser } = useAuth()
  const { userQuery, updateProfile, updatingProfile } = useUsers(Number(id))
  const user = userQuery.data

  const isOwnProfile = authUser?.id === Number(id)
  const isAdmin = authUser?.role === "ADMIN"
  const canEdit = isOwnProfile || isAdmin

  const handleProfileUpdate = async (field: keyof UpdateProfileInput, value: string) => {
    await updateProfile({ [field]: value })
  }

  if (userQuery.isLoading) return <div className="p-6">Loading...</div>
  if (!user) return <div className="p-6">User not found</div>

  return (
    <div className="p-6 space-y-6">

      {/* Back button */}
      <Button variant="ghost" onClick={() => navigate("/users")} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Users
      </Button>

      {/* Profile Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name ?? "avatar"}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            <div className="space-y-1">
              <h1 className="text-xl font-semibold">{user.name ?? user.username}</h1>
              <p className="text-sm text-muted-foreground">{user.identifier}</p>
              <div className="flex items-center gap-2">
                <Badge variant={roleBadgeVariant[user.role]}>
                  {user.role}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InlineEditField
            label="Name"
            value={user.name}
            canEdit={canEdit}
            onSave={(val) => handleProfileUpdate("name", val)}
            saving={updatingProfile}
          />
          <Separator />
          <InlineEditField
            label="Address"
            value={user.address}
            canEdit={canEdit}
            onSave={(val) => handleProfileUpdate("address", val)}
            saving={updatingProfile}
          />
          <Separator />
          <InlineEditField
            label="Phone"
            value={user.phone}
            canEdit={canEdit}
            onSave={(val) => handleProfileUpdate("phone", val)}
            saving={updatingProfile}
          />
          <Separator />
          <InlineEditField
            label="Gender"
            value={user.gender}
            canEdit={canEdit}
            onSave={(val) => handleProfileUpdate("gender", val)}
            saving={updatingProfile}
          />
          <Separator />
          <InlineEditField
            label="Birth Date"
            value={user.birthDate}
            canEdit={canEdit}
            onSave={(val) => handleProfileUpdate("birthDate", val)}
            saving={updatingProfile}
          />
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Username</p>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Password</p>
              <p className="text-sm text-muted-foreground">••••••••</p>
            </div>
          </div>
          {canEdit && (
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => navigate(`/users/${id}/security`)}
            >
              <Shield className="w-4 h-4" />
              Manage Account Security
            </Button>
          )}
        </CardContent>
      </Card>

    </div>
  )
}