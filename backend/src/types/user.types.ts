import { Role } from "@prisma/client"

export type CreateUserInput = {
    name: string;
    email: string;
    password: string;
    role?: Role;
}

export type UpdateProfileUserInput = {
    name?:      string
    address?:   string
    phone?:     string
    birthDate?: Date
    gender?:    string
    avatar?:    string
}

export type UpdateSecurityMeInput = {
    email?:             string
    password?:           string
    username?:          string
    currentPassword:    string
}

export type AdminUpdateUserInput = {
    name?:       string
    email?:      string
    username?:   string
    role?:       Role
    address?:    string
    phone?:      string
    birthDate?:  Date
    gender?:     string
    avatar?:     string
}