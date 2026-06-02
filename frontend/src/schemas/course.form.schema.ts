import { z } from "zod"

export const CourseFormSchema = z.object({
    code:         z.string().min(2, "Code must be at least 2 characters").max(20, "Code must be at most 20 characters").transform((val) => val.toUpperCase()),
    title:        z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be at most 100 characters"),
    description:  z.string().min(3, "Description must be at least 3 characters"),
    credits:      z.number().min(1, "Credits must be at least 1").max(6, "Credits must be at most 6"),
    semester:     z.number().min(1, "Semester must be at least 1").max(14, "Semester must be at most 14"),
    academicYear: z.string().length(9, "Academic year must be 9 characters").regex(/^\d{4}-\d{4}$/, "Academic year must be in format YYYY-YYYY"),
    type:         z.enum(["REQUIRED", "ELECTIVE"]),
    departmentId: z.number().min(1, "Department ID is required"),
    lecturerId:   z.number().nullable(),
    maxStudents:  z.number().nullable(),
})
export type CourseFormValues = z.infer<typeof CourseFormSchema>