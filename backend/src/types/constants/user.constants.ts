import { Role } from "@prisma/client";

export const ROLE_PREFIX: Record<Role, string> = {
    STUDENT: "STU",
    LECTURER: "LEC",
    ADMIN: "ADM",
    USER: "USR",
}

export const userSelect = {
    id:         true,
    identifier: true,
    username:   true,
    name:       true,
    email:      true,
    role:       true,
    avatar:     true,
    address:    true,
    phone:      true,
    birthDate:  true,
    gender:     true,
    createdAt:  true,
    updatedAt:  true,
}