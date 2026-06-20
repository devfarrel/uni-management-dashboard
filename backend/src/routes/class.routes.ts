import { Router } from "express"
import { ClassController } from "@controllers/class.controller"
import { requireAuth } from "@middlewares/auth.middleware"
import { authorizeRoles } from "@middlewares/role.middleware"

const router = Router()

router.use(requireAuth)

router.get("/", ClassController.getAll)
router.get("/my", authorizeRoles("LECTURER"), ClassController.getMyClasses)
router.get("/:id", ClassController.getById)
router.post("/", authorizeRoles("ADMIN"), ClassController.create)
router.put("/:id", authorizeRoles("ADMIN"), ClassController.update)
router.delete("/:id", authorizeRoles("ADMIN"), ClassController.remove)

export default router