import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { AuthUser } from "@auth/auth.types"

export interface AuthRequest extends Request {
  user?: AuthUser;
}

interface JwtPayload {
  id: number;
  role: AuthUser["role"];
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.access_token

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" })
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    req.user = {
      id: payload.id,
      role: payload.role,
    };

    
    next()
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }
}
