import { z } from "zod"
import { api } from "./axios"

// --- Schemas ---
export const RoleSchema = z.enum(["USER", "ADMIN", "LECTURER", "STUDENT"])

export const UserSchema = z.object({
  id:         z.number(),
  identifier: z.string(),
  username:   z.string(),
  name:       z.string().nullable(),
  email:      z.string().email(),
  role:       RoleSchema,
  avatar:     z.string().nullable(),
  address:    z.string().nullable(),
  phone:      z.string().nullable(),
  birthDate:  z.string().nullable(),
  gender:     z.string().nullable(),
  createdAt:  z.string(),
  updatedAt:  z.string(),
})

export const UserArraySchema = z.array(UserSchema)

export const CreateUserSchema = z.object({
  name:     z.string().min(1).max(100),
  email:    z.string().email(),
  password: z.string().min(6).max(100),
  role:     RoleSchema.default("USER"),
})

export const UpdateProfileSchema = z.object({
  name:      z.string().min(1).max(100).optional(),
  address:   z.string().optional(),
  phone:     z.string().optional(),
  birthDate: z.string().optional(),
  gender:    z.string().optional(),
  avatar:    z.string().optional(),
})

export const AdminUpdateProfileSchema = z.object({
  email:           z.string().email().optional(),
  password:        z.string().min(6).optional(),
  username:        z.string().min(3).optional(),
  name:            z.string().min(1).max(100).optional(),
  address:         z.string().optional(),
  phone:           z.string().optional(),
  birthDate:       z.string().optional(),
  gender:          z.string().optional(),
  avatar:          z.string().optional(),
  role:            RoleSchema.optional(),
})

export const UpdateSecuritySchema = z.object({
  email:           z.string().email().optional(),
  password:        z.string().min(6).optional(),
  username:        z.string().min(3).optional(),
  currentPassword: z.string().min(1, "Current password is required"),
})

// --- Types ---
export type User = z.infer<typeof UserSchema>
export type Role = z.infer<typeof RoleSchema>
export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>
export type AdminUpdateProfileInput = z.infer<typeof AdminUpdateProfileSchema>
export type UpdateSecurityInput = z.infer<typeof UpdateSecuritySchema>

// --- API ---
export const UserAPI = {
  getAll: async (): Promise<User[]> => {
    const res = await api.get("/users")
    return UserArraySchema.parse(res.data)
  },

  getById: async (id: number): Promise<User> => {
    const res = await api.get(`/users/${id}`)
    return UserSchema.parse(res.data)
  },

  create: async (data: CreateUserInput): Promise<User> => {
    const validated = CreateUserSchema.parse(data)
    const res = await api.post("/users", validated)
    return UserSchema.parse(res.data)
  },

  update: async (id: number, data: AdminUpdateProfileInput): Promise<User> => {
    const validated = AdminUpdateProfileSchema.parse(data)
    const res = await api.put(`/users/${id}`, validated)
    return UserSchema.parse(res.data)
  },

  updateProfile: async (id: number, data: UpdateProfileInput): Promise<User> => {
    const validated = UpdateProfileSchema.parse(data)
    const res = await api.patch(`/users/${id}/profile`, validated)
    return UserSchema.parse(res.data)
  },

  updateSecurity: async (id: number, data: UpdateSecurityInput): Promise<User> => {
    const validated = UpdateSecuritySchema.parse(data)
    const res = await api.patch(`/users/${id}/security`, validated)
    return UserSchema.parse(res.data)
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`)
  },
}