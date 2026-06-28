import { useParams, useNavigate } from "react-router-dom"
import { useEnrollments } from "@/hooks/useEnrollments"
import { useClasses } from "@/hooks/useClasses"
import { useAuth } from "@/hooks/useAuth"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ClassRosterTable } from "@/components/class/ClassRosterTable"
import { toast } from "sonner"

export default function ClassRosterPage() {
    const { id }                                    = useParams()
    const navigate                                  = useNavigate()
    const { user: authUser }                        = useAuth()
    const { classQuery }                            = useClasses(Number(id))
    const { classEnrollmentsQuery, drop, dropping } = useEnrollments(Number(id))

    const cls         = classQuery.data
    const enrollments = classEnrollmentsQuery.data ?? []
    const isAdmin     = authUser?.role === 'ADMIN'

    const handleDrop = async (enrollmentId: number) => {
        try {
            await toast.promise(
                drop(enrollmentId),
                {
                    loading: "Dropping student...",
                    success: "Student dropped successfully!",
                    error:   (err) => err.response?.data?.message ?? "Failed to drop student",
                }
            )
        } catch {
            // toast handle it
        }
    }

    if (classQuery.isLoading || classEnrollmentsQuery.isLoading) {
        return <div className="p-6">Loading...</div>
    }

    if (!cls) return <div className="p-6">Class not found</div>

    return (
        <div className="p-6 space-y-6">

            {/* Header */}
            <Button variant="ghost" onClick={() => navigate("/classes")} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Classes
            </Button>

            <div className="flex items-start justify-between">
                <div className="space-y-1">
                <h1 className="text-2xl font-semibold">{cls.name} — Roster</h1>
                <p className="text-sm text-muted-foreground">
                    {cls.course?.code} {cls.course?.title} · {cls.day} {cls.startTime}–{cls.endTime}
                </p>
                <p className="text-sm text-muted-foreground">
                    <span>{enrollments.filter(e => e.status === "ENROLLED").length} enrolled</span>
                    {cls.maxStudents && <span> / {cls.maxStudents} max</span>}
                    <span> · {enrollments.filter(e => e.status === "WAITLISTED").length} waitlisted</span>
                </p>
                </div>
            </div>

            {/* Table */}
            <ClassRosterTable
                enrollments={enrollments}
                isAdmin={isAdmin}
                onDrop={handleDrop}
                dropping={dropping}
            />
        </div>
    )
}