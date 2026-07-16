import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { MoreHorizontalIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";

import type { Enrollment, EnrollmentStatus } from "@/api/enrollment.api"
import { useNavigate } from "react-router-dom";

type Props = {
    enrollments: Enrollment[]
    onDrop: (id: number) => void
    onStatusChange: (id: number, status: EnrollmentStatus) => void
    dropping: boolean
    updatingStatus: boolean
}

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    ENROLLED: "default",
    WAITLISTED: "secondary",
    DROPPED: "destructive"
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
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Enrolled At</TableHead>
                <TableHead className="text-center">Actions</TableHead>
            </TableRow>

          </TableHeader>
  
          <TableBody>
            {enrollments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground"
                >
                  No classes found
                </TableCell>
              </TableRow>
            ) : (
              enrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                    <TableCell>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">
                        {enrollment.student?.name ?? "-"}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                        {enrollment.student?.identifier}
                        </span>
                    </div>
                    </TableCell>
                    <TableCell>{enrollment.class?.name}</TableCell>
                    <TableCell>
                    <div className="flex flex-col">
                        <span className="text-sm font-mono">
                        {enrollment.class?.course?.code}
                        </span>
                        <span className="text-xs text-muted-foreground">
                        {enrollment.class?.course?.title}
                        </span>
                    </div>
                    </TableCell>
                    <TableCell>
                    <Badge variant={statusVariant[enrollment.status]}>
                        {enrollment.status}
                    </Badge>
                    </TableCell>
                    <TableCell>{enrollment.grade ?? "-"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                    {new Date(enrollment.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline" aria-label="Open menu" size="icon-sm">
                            <MoreHorizontalIcon />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48" align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Separator className="my-1" />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                            disabled={updatingStatus}
                            onSelect={() => onStatusChange(enrollment.id, "ENROLLED")}
                            >
                            Set Enrolled
                            </DropdownMenuItem>
                            <DropdownMenuItem
                            disabled={updatingStatus}
                            onSelect={() => onStatusChange(enrollment.id, "WAITLISTED")}
                            >
                            Set Waitlisted
                            </DropdownMenuItem>
                            <DropdownMenuItem
                            disabled={updatingStatus}
                            onSelect={() => onStatusChange(enrollment.id, "DROPPED")}
                            >
                            Set Dropped
                            </DropdownMenuItem>
                            <Separator className="my-1" />
                            <DropdownMenuItem
                            variant="destructive"
                            disabled={dropping}
                            onSelect={() => onDrop(enrollment.id)}
                            >
                            Remove
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
}