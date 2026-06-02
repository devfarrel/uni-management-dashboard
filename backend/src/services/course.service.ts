import { prisma } from "../prisma";

export interface CourseInput {
    code: string
    title: string
    description: string
    credits: number
    semester: number
    academicYear: string
    type: "REQUIRED" | "ELECTIVE"
    departmentId: number
    lecturerId?: number
    prerequisiteIds?: number[]
    maxStudents?: number
}

export const CourseService = {
    async getAll() {
        return prisma.course.findMany({
            orderBy: { title: "asc" },
            include: {
                department: true,
                lecturer: { select: { id: true, name: true, email: true } },
            },
        })
    },

    async getById(id: number) {
        return prisma.course.findUnique({
            where: { id },
            include: {
                department: true,
                lecturer: { select: {id: true, name: true, email: true } },
            },
        })
    },

    async create(data: CourseInput) {
        return prisma.course.create({
            data
        })
    },

    async update(id: number, data: Partial<CourseInput>) {
        return prisma.course.update({
            where: { id },
            data
        })
    },

    async remove(id: number) {
        return prisma.course.delete({
            where: { id }
        })
    }
}