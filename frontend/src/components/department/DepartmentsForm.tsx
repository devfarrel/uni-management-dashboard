import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { DepartmentFormSchema, type DepartmentFormValues } from "@/schemas/department.form.schema"
import type { CreateDepartmentInput } from "@/types/department"

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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {
  mode: "create" | "edit"
  initialValues?: Partial<CreateDepartmentInput>
  onSubmit: (data: CreateDepartmentInput) => Promise<void>
}

export function DepartmentForm({ mode, initialValues, onSubmit }: Props) {
  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(DepartmentFormSchema),
    defaultValues: {
        name: "",
        code: "",
        faculty: "",
        ...initialValues,
    },
  })

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>
            {mode === "create" ? "Create Department" : "Edit Department"}
          </CardTitle>
          <CardDescription>
            {mode === "create"
              ? "Fill out the form to create a new department."
              : "Update the department details below."}
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

              {/* Code */}
              <Controller
                name="code"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                    <FieldLabel>Code</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>
                      Enter a valid department code.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    </FieldContent>
                  </Field>
                )}
              />

              {/* Faculty */}
              <Controller
                name="faculty"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                    <FieldLabel>Faculty</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>
                      Enter the faculty this department belongs to.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
