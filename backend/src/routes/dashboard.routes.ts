import { Router } from "express"
import { DashboardController } from "@controllers/dashboard.controller"
import { requireAuth } from "@middlewares/auth.middleware"
import { authorizeRoles } from "@middlewares/role.middleware"

const router = Router()

// router.use(requireAuth)
// router.use(authorizeRoles("ADMIN"))
router.get("/test", (req, res) => {
  res.json({ message: "works" })
})
router.get("/stats", DashboardController.getStats)
router.get("/trend", DashboardController.getEnrollmentTrend)
router.get("/user-trend", DashboardController.getUserTrend)

export default router