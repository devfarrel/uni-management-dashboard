import { prisma } from "../prisma"

export const DepartmentService = {
    async getAll() {
        return prisma.department.findMany({
            orderBy: { name: "asc" }
        })
    },

    async getById(id: number) {
        return prisma.department.findUnique({
            where: { id }
        })
    },

    async create(data: { name: string, code: string, faculty: string }) {
        return prisma.department.create({ data })
    },

    async update(id: number, data: { name?: string, code?: string, faculty?: string }) {
        return prisma.department.update({
            where: { id },
            data
        })
    },

    async delete(id: number) {
        return prisma.department.delete({
            where: { id }
        })
    }
}