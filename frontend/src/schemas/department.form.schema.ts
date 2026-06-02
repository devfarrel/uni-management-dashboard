import { z } from "zod";

export const DepartmentFormSchema = z.object({
  name:    z.string().min(3, "Name must be at least 3 characters").max(100),
  code:    z.string().min(2, "Code must be at least 2 characters").max(10).toUpperCase(),
  faculty: z.string().min(3, "Faculty must be at least 3 characters").max(100),
})

export type DepartmentFormValues = z.infer<typeof DepartmentFormSchema>