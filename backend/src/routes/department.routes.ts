import { Router } from "express";
import { requireAuth } from "@middlewares/auth.middleware";
import { authorizeRoles } from "@middlewares/role.middleware";
import { DepartmentController } from "@controllers/department.controller";

const router = Router();
router.use(requireAuth);
router.get("/", authorizeRoles("ADMIN"), DepartmentController.getAll);
router.get("/:id", DepartmentController.getById);
router.post("/", authorizeRoles("ADMIN"), DepartmentController.create);
router.put("/:id", authorizeRoles("ADMIN"), DepartmentController.update);
router.delete("/:id", authorizeRoles("ADMIN"), DepartmentController.delete);

export default router;