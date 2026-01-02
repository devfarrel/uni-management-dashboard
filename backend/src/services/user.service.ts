import prisma from "../prisma.js";
import bcrypt from "bcrypt";

export const UserService = {
    getAll: () => {
        return prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    },

    getById: (id: number) => {
        return prisma.user.findUnique({
            where: {id},
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    },

    create: async(data: {
        name: string;
        email: string;
        password: string;
        role?: "USER" | "ADMIN"
    }) => {
        const hashed = await bcrypt.hash(data.password, 10);

        return prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashed,
                role: data.role || "USER",
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        })
    },

    update: async (
        id: number,
        data: { name?: string; email?: string; password?: string; role?: "USER" | "ADMIN" }
      ) => {
        let updateData: any = { ...data };
    
        if (data.password) {
          updateData.password = await bcrypt.hash(data.password, 10);
        }
    
        return prisma.user.update({
          where: { id },
          data: updateData,
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        });
    },

    delete: (id: number) => {
        return prisma.user.delete({where: {id}})
    },
};