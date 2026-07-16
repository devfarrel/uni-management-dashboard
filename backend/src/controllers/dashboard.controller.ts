import { Response } from "express"
import { AuthRequest } from "@middlewares/auth.middleware"
import { DashboardService } from "@services/dashboard.service"

export const DashboardController = {
    async getStats(req: AuthRequest, res: Response) {
        try {
            const stats = await DashboardService.getStats()
            res.json(stats)
        } catch (err: any) {
            res.status(500).json({ message: err.message })
        }
    },

    async getEnrollmentTrend(req: AuthRequest, res: Response) {
        try {
            const trend = await DashboardService.getEnrollmentTrend()
            res.json(trend)
        } catch (err: any) {
            res.status(500).json({ message: err.message })
        }
    },

    async getUserTrend(req: AuthRequest, res: Response) {
        try {
            const trend = await DashboardService.getUserTrend()
            res.json(trend)
        } catch (err: any) {
            res.status(500).json({ message: err.message })
        }
    }
}