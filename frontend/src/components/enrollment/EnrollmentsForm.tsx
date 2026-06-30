import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field, FieldLabel, FieldError, FieldGroup, FieldContent,
} from "@/components/ui/field"
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle,
} from "@/components/ui/card"

import { useUsers } from "@/hooks/useUsers"
import { useClasses } from "@/hooks/useClasses"

const enrollmentFormSchema = z.object({
    studentId: z.number({ error: "Please select a student." }),
    classId: z.number({ error: "Please select a class." })
})

type EnrollmentFormValues = z.infer<typeof enrollmentFormSchema>

type Props = {
  onSubmit: (data: EnrollmentFormValues) => Promise<void>
}

export function EnrollmentsForm({ onSubmit }: Props) {
  const { usersQuery }   = useUsers()
  const { classesQuery } = useClasses()

  const students = usersQuery.data?.filter((u) => u.role === "STUDENT")
  const classes  = classesQuery.data

  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentFormSchema),
    defaultValues: {
        studentId: undefined,
        classId: undefined,
    },
  })

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full sm:max-w-2xl">
        <CardHeader>
          <CardTitle>
            Enroll Student
          </CardTitle>
          <CardDescription>
            Assign a student to a class manually.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>

              {/* Student */}
              <Controller
                name="studentId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel>Student</FieldLabel>
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(v) => field.onChange(Number(v))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                          {students?.map((s) => (
                            <SelectItem key={s.id} value={String(s.id)}>
                              <span>{s.name ?? s.username}</span>
                              <span className="text-muted-foreground ml-2 text-xs">
                                {s.identifier}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </FieldContent>
                  </Field>
                )}
              />

              {/* Class */}
              <Controller
                name="classId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel>Class</FieldLabel>
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(v) => field.onChange(Number(v))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes?.map((c) => (
                            <SelectItem key={c.id} value={String(c.id)}>
                              <span>{c.name}</span>
                              <span className="text-muted-foreground ml-2 text-xs">
                                {c.course?.code} · {c.day} {c.startTime}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </FieldContent>
                  </Field>
                )}
              />

            </FieldGroup>

            <Button
              className="mt-9 w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Enrolling..." : "Enroll Student"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}