import { z } from "zod"
import { api } from "./axios"
import { DepartmentSchema } from "./department.api"
import { UserSchema } from "./user.api"

// --- Schemas ---
export const CourseTypeSchema = z.enum(["REQUIRED", "ELECTIVE"])

export const CourseSchema = z.object({
  id:               z.number(),
  code:             z.string(),
  title:            z.string(),
  description:      z.string(),
  credits:          z.number(),
  semester:         z.number(),
  academicYear:     z.string(),
  type:             CourseTypeSchema,
  departmentId:     z.number(),
  department:       DepartmentSchema.optional(),
  lecturerId:       z.number().nullable(),
  lecturer:         UserSchema.optional().nullable(),
  maxStudents:      z.number().nullable(),
  createdAt:        z.string(),
  updatedAt:        z.string(),
})

export const CourseArraySchema = z.array(CourseSchema)

export const CourseInputSchema = z.object({
  code:         z.string().min(2).max(20).transform((val) => val.toUpperCase()),
  title:        z.string().min(3).max(100),
  description:  z.string().min(3),
  credits:      z.number().min(1).max(6),
  semester:     z.number().min(1).max(14),
  academicYear: z.string().length(9).regex(/^\d{4}-\d{4}$/),
  type:         CourseTypeSchema,
  departmentId: z.number(),
  lecturerId:   z.number().nullable(),
  maxStudents:  z.number().nullable(),
})

// export const CourseUpdateSchema = CourseInputSchema.partial()

// --- Types ---
export type Course = z.infer<typeof CourseSchema>
export type CourseType = z.infer<typeof CourseTypeSchema>
export type CourseInput = z.infer<typeof CourseInputSchema>

// --- API ---
export const CourseAPI = {
    getAll: async (): Promise<Course[]> => {
        const res = await api.get("/courses")
        console.log("status:", res.status)
        console.log("raw response:", JSON.stringify(res.data))
        try {
            return CourseArraySchema.parse(res.data)
        } catch (err) {
            console.error("Zod parse error:", err)
            return []
        }
    },  

    getById: async (id: number): Promise<Course> => {
        const res = await api.get(`/courses/${id}`)
        return CourseSchema.parse(res.data)
    },

    create: async (data: CourseInput): Promise<Course> => {
        const validated = CourseInputSchema.parse(data)
        const res = await api.post('/courses', validated)
        return CourseSchema.parse(res.data)
    },

    update: async (id: number, data: CourseInput): Promise<Course> => {
        const validated = CourseInputSchema.parse(data)
        const res = await api.put(`/courses/${id}`, validated)
        return CourseSchema.parse(res.data)
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/courses/${id}`)
    },
}