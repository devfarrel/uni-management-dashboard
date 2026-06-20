import { Response } from "express"
import { AuthRequest } from "@middlewares/auth.middleware"
import { ClassService } from "@services/class.service"

export const ClassController = {
    async getAll(req: AuthRequest, res: Response) {
        try {
            const classes = await ClassService.getAll()
            res.json(classes)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    },

    async getById(req: AuthRequest, res: Response) {
        try {
            const classItem = await ClassService.getById(Number(req.params.id))
            if (!classItem) return res.status(400).json({ message: "Class not found" })
            res.json(classItem)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    },

    async getMyClasses(req: AuthRequest, res: Response) {
        try {
            const classes = await ClassService.getByLecturer(req.user!.id)
            res.json(classes)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    },

    async create(req: AuthRequest, res: Response) {
        try {
            const classItem = await ClassService.create(req.body)
            res.status(201).json(classItem)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    },

    async update(req: AuthRequest, res: Response) {
        try {
            const classItem = await ClassService.update(Number(req.params.id), req.body)
            res.json(classItem)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    },

    async remove(req: AuthRequest, res: Response) {
        try {
            await ClassService.remove(Number(req.params.id))
            res.json({ success: true })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    },
}