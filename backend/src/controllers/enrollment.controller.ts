import { Response } from "express"
import { AuthRequest } from "@middlewares/auth.middleware"
import { EnrollmentService } from "@services/enrollment.service"

export const EnrollmentController = {
    async getAll(req: AuthRequest, res: Response) {
        try {
            const enrollments = await EnrollmentService.getAll()
            res.json(enrollments)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    },

    async getMyEnrollments(req: AuthRequest, res: Response) {
        try {
            const enrollments = await EnrollmentService.getByStudent(req.user!.id)
            res.json(enrollments)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    },

    async getByClass(req: AuthRequest, res: Response) {
        try {
            const enrollments = await EnrollmentService.getByClass(Number(req.params.classId))
            res.json(enrollments)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    },

    async enroll(req: AuthRequest, res: Response) {
        try {
            const { studentId, classId } = req.body

            // if student is enrolling themselves, use their own id
            const resolvedStudentId = req.user!.role === "STUDENT"
            ? req.user!.id
            : studentId

            const enrollment = await EnrollmentService.enroll({
                studentId: resolvedStudentId,
                classId: Number(classId),
            })

            res.status(201).json(enrollment)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    },

    async drop(req: AuthRequest, res: Response) {
        try {
            const studentId = req.user!.role === "STUDENT" ? req.user!.id : undefined
            await EnrollmentService.drop(Number(req.params.id), studentId)
            res.json({ success: true })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    },

    async updateStatus(req: AuthRequest, res: Response) {
        try {
            const enrollment = await EnrollmentService.updateStatus(
                Number(req.params.id),
                req.body
            )
            res.json(enrollment)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    },
}