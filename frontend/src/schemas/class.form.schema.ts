import { z } from "zod"

export const ClassFormSchema = z.object({
  name:         z.string().min(1, "Name is required").max(50),
  room:         z.string().optional(),
  day:          z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], {
                  error: "Please select a day"
                }),
  startTime:    z.string().min(1, "Start time is required"),
  endTime:      z.string().min(1, "End time is required"),
  academicYear: z.string()
                  .length(9, "Format must be YYYY-YYYY")
                  .regex(/^\d{4}-\d{4}$/, "Format must be YYYY-YYYY"),
  semester:     z.number().min(1).max(14),
  courseId:     z.number({ error: "Please select a course" }),
  lecturerId:   z.number().optional(),
})

export type ClassFormValues = z.infer<typeof ClassFormSchema>