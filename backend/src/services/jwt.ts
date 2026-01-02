import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const signToken = (payload: object) =>
    jwt.sign(payload, JWT_SECRET, {expiresIn: "7d"});

export const verifyToken = (token: string) =>
    jwt.verify(token, JWT_SECRET);