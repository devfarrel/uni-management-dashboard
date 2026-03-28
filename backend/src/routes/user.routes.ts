import { Router } from "express";
import { UserController } from "@controllers/user.controller.js"
import { requireAuth } from "@middlewares/auth.middleware.js";
import { authorizeRoles } from "@middlewares/role.middleware.js";

const router = Router();
router.use(requireAuth);
router.get("/", authorizeRoles("ADMIN"), UserController.getAll);
router.get("/:id", UserController.getById);
router.post("/", authorizeRoles("ADMIN"), UserController.create);
router.put("/:id", authorizeRoles("ADMIN"), UserController.update);
router.delete("/:id", authorizeRoles("ADMIN"), UserController.delete);
export default router;