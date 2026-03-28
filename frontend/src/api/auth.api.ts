import { api } from "./axios";
import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const Login = async (data: LoginInput) => {
    const res = await api.post("/auth/login", data);
    return res.data;
}

export const Logout = async () => {
    await api.post("/auth/logout");
}

export const GetMe = async () => {
    const res = await api.get("/auth/me");
    return res.data;
}