import { Router } from "express"
import { CourseController } from "@controllers/course.controller"
import { requireAuth } from "@middlewares/auth.middleware"
import { authorizeRoles } from "@middlewares/role.middleware"

const router = Router()
router.use(requireAuth)
router.get("/", CourseController.getAll)
router.get("/:id", CourseController.getById)
router.post("/", authorizeRoles("ADMIN"), CourseController.create)
router.put("/:id", authorizeRoles("ADMIN"), CourseController.update)
router.delete("/:id", authorizeRoles("ADMIN"), CourseController.remove)

export default router