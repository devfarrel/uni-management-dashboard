import { z } from "zod"

export const UpdateEmailSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  email:           z.string().email("Invalid email"),
})

export const UpdateUsernameSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  username:        z.string().min(3, "Username must be at least 3 characters"),
})

export const UpdatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  password:        z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export type EmailValues    = z.infer<typeof UpdateEmailSchema>
export type UsernameValues = z.infer<typeof UpdateUsernameSchema>
export type PasswordValues = z.infer<typeof UpdatePasswordSchema>