import { Response } from "express"
import { AuthRequest } from "@middlewares/auth.middleware"
import { CourseService } from "@services/course.service"

export const CourseController = {
    async getAll(req: AuthRequest, res: Response) {
        const courses = await CourseService.getAll()
        return res.json(courses)
    },

    async getById(req: AuthRequest, res: Response) {
        const course = await CourseService.getById(Number(req.params.id))
        if (!course) return res.status(404).json({ message: "Course not found" })
        return res.json(course)
    },

    async create(req: AuthRequest, res: Response) {
        const course = await CourseService.create(req.body)
        return res.status(201).json(course)
    },

    async update(req: AuthRequest, res: Response) {
        const course = await CourseService.update(Number(req.params.id), req.body)
        return res.json(course)
    },

    async remove(req: AuthRequest, res: Response) {
        await CourseService.remove(Number(req.params.id))
        return res.json({ success: true })
    }
}