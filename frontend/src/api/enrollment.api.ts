import { z } from "zod"
import { api } from "./axios";

// --- Schemas ---
export const EnrollmentStatusSchema = z.enum(["ENROLLED", "WAITLISTED", "DROPPED"])

export const EnrollmentSchema = z.object({
    id:        z.number(),
    studentId: z.number(),
    classId:   z.number(),
    grade:     z.string().nullable(),
    status:    EnrollmentStatusSchema,
    student: z.object({
        id:         z.number(),
        name:       z.string().nullable(),
        email:      z.string(),
        identifier: z.string(),
    }).optional(),
    class: z.object({
        id:          z.number(),
        name:        z.string(),
        day:         z.string(),
        startTime:   z.string(),
        endTime:     z.string(),
        room:        z.string().nullable(),
        academicYear: z.string(),
        semester:    z.number(),
        course: z.object({
        id:    z.number(),
        code:  z.string(),
        title: z.string(),
        }).optional(),
    }).optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const EnrollmentArraySchema = z.array(EnrollmentSchema)

export const CreateEnrollmentSchema = z.object({
    classId: z.number(),
    studentId: z.number().optional(),
})

export const UpdateEnrollmentSchema = z.object({
    status: EnrollmentStatusSchema,
    grade: z.string().optional(),
})

// --- Types ---
export type Enrollment = z.infer<typeof EnrollmentSchema>
export type EnrollmentStatus = z.infer<typeof EnrollmentStatusSchema>
export type CreateEnrollmentInput = z.infer<typeof CreateEnrollmentSchema>
export type UpdateEnrollmentInput = z.infer<typeof UpdateEnrollmentSchema>

// --- API ---
export const EnrollmentAPI = {
    getAll: async (): Promise<Enrollment[]> => {
        const res = await api.get("/enrollments")
        return EnrollmentArraySchema.parse(res.data)
    },

    getMyEnrollments: async (): Promise<Enrollment[]> => {
        const res = await api.get("/enrollments/my")
        return EnrollmentArraySchema.parse(res.data)
    },

    getByClass: async (classId: number): Promise<Enrollment[]> => {
        const res = await api.get(`/enrollments/class/${classId}`)
        return EnrollmentArraySchema.parse(res.data)
    },

    enroll: async (data: CreateEnrollmentInput): Promise<Enrollment> => {
        const validated = CreateEnrollmentSchema.parse(data)
        const res = await api.post("/enrollments", validated)
        return EnrollmentSchema.parse(res.data)
    },

    drop: async (id: number): Promise<void> => {
        await api.delete(`/enrollments/${id}`)
    },

    updateStatus: async (id: number, data: UpdateEnrollmentInput): Promise<Enrollment> => {
        const validated = UpdateEnrollmentSchema.parse(data)
        const res = await api.patch(`/enrollments/${id}/status`, validated)
        return EnrollmentSchema.parse(res.data)
    },
}