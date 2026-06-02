import { z } from "zod"
import { api } from "./axios"

// --- Schemas ---
export const DepartmentSchema = z.object({
  id:        z.number(),
  name:      z.string(),
  code:      z.string(),
  faculty:   z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const CreateDepartmentInputSchema = z.object({
  name:    z.string().min(2).max(100),
  code:    z.string().min(2).max(10).toUpperCase(),
  faculty: z.string().min(3).max(100),
})

export const DepartmentArraySchema = z.array(DepartmentSchema)

// --- Types ---
export type Department = z.infer<typeof DepartmentSchema>
export type CreateDepartmentInput = z.infer<typeof CreateDepartmentInputSchema>

// --- API ---
export const DepartmentAPI = {
  getAll: async (): Promise<Department[]> => {
    const res = await api.get("/departments")
    return DepartmentArraySchema.parse(res.data)
  },

  getById: async (id: number): Promise<Department> => {
    const res = await api.get(`/departments/${id}`)
    return DepartmentSchema.parse(res.data)
  },

  create: async (data: CreateDepartmentInput): Promise<Department> => {
    const validated = CreateDepartmentInputSchema.parse(data)
    const res = await api.post("/departments", validated)
    return DepartmentSchema.parse(res.data)
  },

  update: async (id: number, data: CreateDepartmentInput): Promise<Department> => {
    const validated = CreateDepartmentInputSchema.parse(data)
    const res = await api.put(`/departments/${id}`, validated)
    return DepartmentSchema.parse(res.data)
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/departments/${id}`)
  },
}