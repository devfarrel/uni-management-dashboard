import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";

import { ROLE_PREFIX, userSelect } from "@constants/user.constants";
import { CreateUserInput, AdminUpdateUserInput, UpdateProfileUserInput, UpdateSecurityMeInput } from "@customTypes/user.types";

const generateIdentifier = async (role: Role): Promise<string> => {
    const year = new Date().getFullYear()

    const count = await prisma.user.count({
        where: {
            role,
            identifier: { startsWith: `${ROLE_PREFIX[role]}-${year}` }
        }
    })

    const sequence = String(count + 1).padStart(6, "0")
    return `${ROLE_PREFIX[role]}-${year}-${sequence}`
}

export const UserService = {
    getAll: () => {
        return prisma.user.findMany({
            select: userSelect,
        });
    },

    getById: (id: number) => {
        return prisma.user.findUnique({
            where: {id},
            select: userSelect,
        });
    },

    create: async(data: CreateUserInput) => {
        const hashed = await bcrypt.hash(data.password, 10);
        const role = data.role || "USER";
        const identifier = await generateIdentifier(role);
        const username = data.email.split("@")[0];

        return prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashed,
                role,
                identifier,
                username,
            },
            select: userSelect
        })
    },

    update: async (
        id: number,
        data: AdminUpdateUserInput
    ) => {
        return prisma.user.update({
            where: {id},
            data,
            select: userSelect
        })
    },

    updateMe: async (
        id: number,
        data: UpdateProfileUserInput
    ) => {
        return prisma.user.update({
            where: {id},
            data,
            select: userSelect
        })
    },

    updateSecurityMe: async (id: number, data: UpdateSecurityMeInput) => {
        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) throw new Error("User not found")

        const isMatch = await bcrypt.compare(data.currentPassword, user.password)
        if (!isMatch) throw new Error("Invalid current password")

        const { currentPassword, ...rest } = data

        if (rest.password) {
            rest.password = await bcrypt.hash(rest.password, 10)
        }

        return prisma.user.update({
            where: { id },
            data: rest,
            select: userSelect,
        })
    },

    delete: (id: number) => {
        return prisma.user.delete({where: {id}})
    },
};