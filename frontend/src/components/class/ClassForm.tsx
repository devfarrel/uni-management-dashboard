import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ClassFormSchema, type ClassFormValues } from "@/schemas/class.form.schema"
import type { ClassInput } from "@/api/class.api"
import { useClasses } from "@/hooks/useClasses"
import { useCourses } from "@/hooks/useCourses"
import { useUsers } from "@/hooks/useUsers"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
  FieldGroup,
  FieldContent,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {
  mode: "create" | "edit"
  initialValues?: Partial<ClassInput>
  onSubmit: (data: ClassInput) => Promise<void>
}

export function ClassForm({ mode, initialValues, onSubmit }: Props) {
    const { coursesQuery } = useCourses()
    const { usersQuery } = useUsers()
    const lecturers = usersQuery.data?.filter((u) => u.role === "LECTURER")
    const form = useForm<ClassFormValues>({
        resolver: zodResolver(ClassFormSchema),
        defaultValues: {
            name: "",
            room: "",
            day: undefined,
            startTime: "",
            endTime: "",
            academicYear: "",
            semester: 1,
            courseId: undefined,
            lecturerId: undefined,
            ...initialValues,
        },
    })

    return (
    <div className="flex items-center justify-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>
            {mode === "create" ? "Create Class" : "Edit Class"}
          </CardTitle>
          <CardDescription>
            {mode === "create"
              ? "Fill out the form to create a new class."
              : "Update the class details below."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>

              {/* Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel>Name</FieldLabel>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />
                      <FieldDescription>
                        This is your public display name.
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              {/* Room */}
              <Controller
                name="room"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel>Room (optional)</FieldLabel>
                      <Input
                        {...field}
                        placeholder="e.g. Lab 301"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </FieldContent>
                  </Field>
                )}
              />

              {/* Day & Semester side by side */}
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="day"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldContent>
                        <FieldLabel>Day</FieldLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent>
                            {DAYS.map((day) => (
                              <SelectItem key={day} value={day}>{day}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </FieldContent>
                    </Field>
                  )}
                />

                <Controller
                  name="semester"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldContent>
                        <FieldLabel>Semester</FieldLabel>
                        <Select
                          value={String(field.value)}
                          onValueChange={(v) => field.onChange(Number(v))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select semester" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5,6,7,8].map((s) => (
                              <SelectItem key={s} value={String(s)}>
                                Semester {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </FieldContent>
                    </Field>
                  )}
                />
              </div>

              {/* Start Time & End Time side by side */}
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="startTime"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldContent>
                        <FieldLabel>Start Time</FieldLabel>
                        <Input
                          {...field}
                          type="time"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </FieldContent>
                    </Field>
                  )}
                />

                <Controller
                  name="endTime"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldContent>
                        <FieldLabel>End Time</FieldLabel>
                        <Input
                          {...field}
                          type="time"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </FieldContent>
                    </Field>
                  )}
                />
              </div>

              {/* Academic Year */}
              <Controller
                name="academicYear"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel>Academic Year</FieldLabel>
                      <Input
                        {...field}
                        placeholder="e.g. 2024-2025"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </FieldContent>
                  </Field>
                )}
              />

              {/* Course */}
              <Controller
                name="courseId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel>Course</FieldLabel>
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(v) => field.onChange(Number(v))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          {coursesQuery.data?.map((c) => (
                            <SelectItem key={c.id} value={String(c.id)}>
                              {c.code} — {c.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </FieldContent>
                  </Field>
                )}
              />

              {/* Lecturer */}
              <Controller
                name="lecturerId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel>Lecturer (optional)</FieldLabel>
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(v) => field.onChange(Number(v))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select lecturer" />
                        </SelectTrigger>
                        <SelectContent>
                          {lecturers?.map((l) => (
                            <SelectItem key={l.id} value={String(l.id)}>
                              {l.name ?? l.username}
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
              {mode === "create" ? "Create Department" : "Update Department"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
