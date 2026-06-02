import { Response } from "express"
import { AuthRequest } from "@middlewares/auth.middleware"
import { DepartmentService } from "@services/department.service"

export const DepartmentController = {
    async getAll(req: AuthRequest, res: Response) {
        const departments = await DepartmentService.getAll()
        res.json(departments)
    },

    async getById(req: AuthRequest, res: Response) {
        const { id } = req.params
        const department = await DepartmentService.getById(Number(id))

        if (!department) return res.status(404).json({ message: "Department not found" })

        res.json(department)
    },

    async create(req: AuthRequest, res: Response) {
        const department = await DepartmentService.create(req.body)
        res.status(201).json(department)
    },

    async update(req: AuthRequest, res: Response) {
        const { id } = req.params
        const department = await DepartmentService.update(Number(id), req.body)
        res.json(department)
    },

    async delete(req: AuthRequest, res: Response) {
        const { id } = req.params
        await DepartmentService.delete(Number(id))
        res.json({ success: true })
    }
}