import { useParams, useNavigate } from "react-router-dom"
import { useUsers } from "@/hooks/useUsers"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Field, FieldLabel, FieldError, FieldContent, FieldGroup } from "@/components/ui/field"
import { toast } from "sonner"
import { UpdateEmailSchema, type EmailValues } from "@/schemas/user.security.form.schema"

export default function UserSecurityEmailPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const { updateSecurity, updatingSecurity } = useUsers(Number(id))

  const form = useForm<EmailValues>({
    resolver: zodResolver(UpdateEmailSchema),
    defaultValues: { currentPassword: "", email: "" },
  })

  const onSubmit = async (data: EmailValues) => {
    try {
      await toast.promise(
        updateSecurity(data),
        {
          loading: "Updating email...",
          success: "Email updated successfully!",
          error: (err) => err.response?.data?.message ?? "Failed to update email",
        }
      )
      navigate(`/users/${id}/security`)
    } catch {
      // toast handles it
    }
  }

  return (
    <div className="px-6 space-y-6">
      <Button variant="ghost" onClick={() => navigate(`/users/${id}/security`)} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Security
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Change Email</CardTitle>
          <CardDescription>
            Enter your current password and new email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller name="currentPassword" control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel>Current Password</FieldLabel>
                      <Input {...field} type="password" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller name="email" control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel>New Email</FieldLabel>
                      <Input {...field} type="email" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </FieldContent>
                  </Field>
                )}
              />
            </FieldGroup>
            <Button className="mt-6 w-full" type="submit" disabled={updatingSecurity}>
              {updatingSecurity ? "Saving..." : "Update Email"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}