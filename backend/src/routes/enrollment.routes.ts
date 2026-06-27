import { Router } from "express"
import { EnrollmentController } from "@controllers/enrollment.controller"
import { requireAuth } from "@middlewares/auth.middleware"
import { authorizeRoles } from "@middlewares/role.middleware"

const router = Router()

router.use(requireAuth)

router.get("/",           authorizeRoles("ADMIN"), EnrollmentController.getAll)
router.get("/my",         authorizeRoles("STUDENT"), EnrollmentController.getMyEnrollments)
router.get("/class/:classId", authorizeRoles("ADMIN", "LECTURER"), EnrollmentController.getByClass)
router.post("/",          authorizeRoles("ADMIN", "STUDENT"), EnrollmentController.enroll)
router.delete("/:id",     authorizeRoles("ADMIN", "STUDENT"), EnrollmentController.drop)
router.patch("/:id/status", authorizeRoles("ADMIN"), EnrollmentController.updateStatus)

export default router