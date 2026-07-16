import type { Enrollment, EnrollmentStatus } from "@/api/enrollment.api"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { getEnrollmentColumns } from "@/components/enrollment/columns"

type Props = {
    enrollments: Enrollment[]
    onDrop: (id: number) => void
    onStatusChange: (id: number, status: EnrollmentStatus) => void
    dropping: boolean
    updatingStatus: boolean
}

export function EnrollmentsTable({ 
    enrollments,
    onDrop,
    onStatusChange,
    dropping,
    updatingStatus,
}: Props) {
    const navigate = useNavigate()

    return (
        <div className="space-y-4">
            {/* Header / Actions */}
            <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Enrollment</h1>
            <Button onClick={() => navigate("/enrollments/new")}>
                Enroll Student
            </Button>
            </div>

            {/* Table */}
            <DataTable
            data={enrollments}
            columns={getEnrollmentColumns({ onDrop, dropping, onStatusChange, updatingStatus })}
            searchKey="student"
            searchPlaceholder="Search enrollments by student..."
            />
        </div>
    );
}