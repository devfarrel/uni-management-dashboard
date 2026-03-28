import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "@routes/user.routes.js"
import authRoutes from "@routes/auth.routes.js";

const app = express();

// Middleware order matters - CORS and cookie parser first
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Then your routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

export default app;