import { z } from "zod"
import { api } from "./axios"
import { CourseSchema } from "./course.api"
import { UserSchema } from "./user.api"

// --- Schema ---
export const ClassSchema = z.object({
    id:           z.number(),
    name:         z.string(),
    room:         z.string().nullable(),
    day:          z.string(),
    startTime:    z.string(),
    endTime:      z.string(),
    academicYear: z.string(),
    semester:     z.number(),
    courseId:     z.number(),
    course:       CourseSchema.pick({ id: true, code: true, title: true }).optional(),
    lecturerId:   z.number().nullable(),
    lecturer:     UserSchema.pick({ id: true, name: true, email: true, identifier: true }).nullable(),
    _count:       z.object({ enrollments: z.number() }).optional(),
    createdAt:    z.string(),
    updatedAt:    z.string(),
})

export const ClassArraySchema = z.array(ClassSchema)

export const ClassInputSchema = z.object({
    name:         z.string().min(1).max(50),
    room:         z.string().optional(),
    day:          z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
    startTime:    z.string().min(1, "Start time is required"),
    endTime:      z.string().min(1, "End time is required"),
    academicYear: z.string().length(9).regex(/^\d{4}-\d{4}$/),
    semester:     z.number().min(1).max(14),
    courseId:     z.number(),
    lecturerId:   z.number().optional(),
})

// --- Types ---
export type Class       = z.infer<typeof ClassSchema>
export type ClassInput  = z.infer<typeof ClassInputSchema>

// --- API ---
export const ClassAPI = {
    getAll: async (): Promise<Class[]> => {
        const res = await api.get("/classes")
        return ClassArraySchema.parse(res.data)
    },

    getById: async (id: number): Promise<Class> => {
        const res = await api.get(`/classes/${id}`)
        return ClassSchema.parse(res.data)
    },

    getMyClasses: async (): Promise<Class[]> => {
        const res = await api.get("/classes/my")
        return ClassArraySchema.parse(res.data)
    },

    create: async (data: ClassInput): Promise<Class> => {
    const validated = ClassInputSchema.parse(data)
    const res = await api.post("/classes", validated)
    return ClassSchema.parse(res.data)
    },

    update: async (id: number, data: ClassInput): Promise<Class> => {
        const validated = ClassInputSchema.parse(data)
        const res = await api.put(`/classes/${id}`, validated)
        return ClassSchema.parse(res.data)
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/classes/${id}`)
    },
}