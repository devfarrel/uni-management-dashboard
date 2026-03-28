import { Response, NextFunction } from "express";
import { AuthRequest } from "@middlewares/auth.middleware";
import { Role } from "@prisma/client";

export function authorizeRoles(...roles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}
