import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

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

    update: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const { name, email, password, role } = req.body;

        const updated = await UserService.update(id, { name, email, password, role});
        res.json(updated);
    },

    delete: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        await UserService.delete(id);
        res.json({ message: "User deleted"});
    },
};