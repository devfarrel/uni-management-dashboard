// pages/users/UserSecurityPage.tsx
import { useParams, useNavigate } from "react-router-dom"
import { useUsers } from "@/hooks/useUsers"
import { useAuth } from "@/hooks/useAuth"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import {
  Field, FieldLabel, FieldError,
  FieldContent, FieldGroup
} from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const SecurityFormSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  email:           z.string().email("Invalid email").optional().or(z.literal("")),
  username:        z.string().min(3, "Username must be at least 3 characters").optional().or(z.literal("")),
  password:        z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
  confirmPassword: z.string().optional().or(z.literal("")),
}).refine((data) => {
  if (data.password && data.password !== data.confirmPassword) {
    return false
  }
  return true
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type SecurityFormValues = z.infer<typeof SecurityFormSchema>

export default function UserSecurityPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user: authUser } = useAuth()
  const { userQuery, updateSecurity, updatingSecurity } = useUsers(Number(id))
  const user = userQuery.data

  const isAdmin = authUser?.role === "ADMIN"
  const isOwnProfile = authUser?.id === Number(id)

  // redirect if neither admin nor own profile
  if (!isAdmin && !isOwnProfile) {
    navigate("/users")
  }

  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(SecurityFormSchema),
    defaultValues: {
      currentPassword: "",
      email:           "",
      username:        "",
      password:        "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: SecurityFormValues) => {
    // only send fields that were filled in
    const payload: any = {
      currentPassword: data.currentPassword,
    }
    if (data.email)    payload.email    = data.email
    if (data.username) payload.username = data.username
    if (data.password) payload.password = data.password

    try {
      await toast.promise(
        updateSecurity(payload),
        {
          loading: "Updating security settings...",
          success: "Security settings updated!",
          error: (err) => err.response?.data?.message ?? "Failed to update",
        }
      )
      form.reset()
      navigate(`/users/${id}`)
    } catch {
      // toast handles the error
    }
  }

  if (userQuery.isLoading) return <div className="p-6">Loading...</div>
  if (!user) return <div className="p-6">User not found</div>

  return (
    <div className="p-6 flex flex-col items-center gap-6">

      {/* Back button */}
      <Button
        variant="ghost"
        onClick={() => navigate(`/users/${id}`)}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Profile
      </Button>

      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
          <CardDescription>
            Update sensitive account information for {user.name ?? user.username}.
            Current password is required to make any changes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>

              {/* Current Password — always required */}
              <Controller
                name="currentPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel>Current Password</FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              <Separator className="my-2" />

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel>New Email</FieldLabel>
                      <Input
                        {...field}
                        type="email"
                        placeholder={user.email}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              {/* Username */}
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel>New Username</FieldLabel>
                      <Input
                        {...field}
                        placeholder={user.username}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              <Separator className="my-2" />

              {/* New Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel>New Password</FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              {/* Confirm Password */}
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel>Confirm New Password</FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

            </FieldGroup>

            <Button
              className="mt-6 w-full"
              type="submit"
              disabled={updatingSecurity}
            >
              {updatingSecurity ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}