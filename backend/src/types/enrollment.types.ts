import { EnrollmentStatus } from "@prisma/client"

export type CreateEnrollmentInput = {
    studentId: number
    classId:   number
}

export type UpdateEnrollmentInput = {
    status: EnrollmentStatus
    grade?: string
}