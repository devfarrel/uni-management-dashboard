import { prisma } from "../prisma";
import { CreateClassInput, UpdateClassInput } from "@customTypes/class.types"

const classInclude = {
    course:     { select: { id: true, code: true, title: true } },
    lecturer:   { select: { id: true, name: true, email: true, identifier: true } },
    _count:     { select: { enrollments: true } },
}

export const ClassService = {
    getAll: () => {
        return prisma.class.findMany({
            orderBy: { createdAt: "desc" },
            include: classInclude,
        })
    },

    getById: (id: number) => {
        return prisma.class.findUnique({
            where: { id },
            include: classInclude,
        })
    },

    getByLecturer: (lecturerId: number) => {
        return prisma.class.findMany({
            where: { lecturerId },
            include: classInclude,
        })
    },

    create: (data: CreateClassInput) => {
        return prisma.class.create({
            data,
            include: classInclude,
        })
    },

    update: (id: number, data: UpdateClassInput) => {
        return prisma.class.update({
            where: { id },
            data,
            include: classInclude
        })
    },

    remove: (id: number) => {
        return prisma.class.delete({
            where: { id }
        })
    }
}