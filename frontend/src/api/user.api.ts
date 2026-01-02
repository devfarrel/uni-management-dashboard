import { z } from "zod";
import { api } from "./axios";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["USER", "ADMIN"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const UsersSchema = z.array(UserSchema);

export type User = z.infer<typeof UserSchema>;

export const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return UsersSchema.parse(res.data);
};

export const createUser = async (data: CreateUserInput) => {
  const parsed = CreateUserSchema.parse(data);
  return api.post("/users", parsed);
};

export const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`);
};
