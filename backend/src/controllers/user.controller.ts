import { Request, Response } from "express";
import { UserService } from "@services/user.service.js";
import { AuthRequest } from "@middlewares/auth.middleware";

export const UserController = {
    getAll: async (req: Request, res: Response) => {
        const users = await UserService.getAll();
        res.json(users);
    },

    getById: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const user = await UserService.getById(id);

        if (!user) return res.status(404).json({message: "User not found"});

        res.json(user);
    },

    create: async (req: Request, res: Response) => {
        const { name, email, password, role } = req.body;

        const newUser = await UserService.create({ name, email, password, role });
        res.status(201).json(newUser);
    },

    update: async (req: AuthRequest, res: Response) => {
        try {
            const user = await UserService.update(Number(req.params.id), req.body);
            res.json(user)
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    updateMe: async (req: AuthRequest, res: Response) => {
        try {
            const user = await UserService.updateMe(Number(req.params.id), req.body)
            res.json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    },

    updateSecurityMe: async (req: AuthRequest, res: Response) => {
        try {
            const user = await UserService.updateSecurityMe(Number(req.params.id), req.body);
            res.json(user)
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    delete: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        await UserService.delete(id);
        res.json({ message: "User deleted"});
    },
};