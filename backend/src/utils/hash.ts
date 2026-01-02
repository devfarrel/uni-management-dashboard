import bycrypt from "bcrypt";

export const hashPassword = async (password: string) => {
    return bycrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hashed: string) => {
    return bycrypt.compare(password, hashed);
};