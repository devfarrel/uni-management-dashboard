import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontalIcon, UserIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import {
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    HoverCard, 
    HoverCardContent, 
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import type { Enrollment, EnrollmentStatus } from "@/api/enrollment.api"

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  ENROLLED:   "default",
  WAITLISTED: "secondary",
  DROPPED:    "destructive",
}

type ActionsProps = {
    onDrop: (id: number) => void
    dropping: boolean
    onStatusChange: (id: number, status: EnrollmentStatus) => void
    updatingStatus: boolean
}

export const getEnrollmentColumns = ({ onDrop, dropping, onStatusChange, updatingStatus }: ActionsProps): ColumnDef<Enrollment>[] => [
    {
        id: "student",
        accessorFn: (row) => row.student?.name ?? "",
        filterFn: "includesString",
        header: ({ column }) => (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-3"
            >
            Student
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const student = row.original.student

            return (
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <UserIcon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                <HoverCard openDelay={10} closeDelay={100}>
                    <HoverCardTrigger asChild>
                    <Link
                        to={`/users/${student?.id}`}
                        className="text-sm font-medium cursor-pointer hover:underline"
                    >
                        {student?.name ?? "-"}
                    </Link>
                    </HoverCardTrigger>
                    <HoverCardContent side="top" align="start" className="w-64">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <UserIcon className="w-5 h-5" />
                        </div>
                        <div>
                        <p className="text-sm font-medium">{student?.name ?? "-"}</p>
                        <p className="text-xs text-muted-foreground">{student?.department?.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{student?.identifier}</p>
                        </div>
                    </div>
                    <Separator className="my-1" />
                    <div className="flex flex-col gap-1 text-xs pt-1">
                        <span>{student?.email}</span>
                        <span className="text-muted-foreground">
                        Click name to view full profile
                        </span>
                    </div>
                    </HoverCardContent>
                </HoverCard>
                <span className="text-xs text-muted-foreground">{student?.email}</span>
                </div>
            </div>
            )
        }
    },

    {
        accessorKey: "class",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-3"
            >
                Class
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const enrollment = row.original

            return (
                <span className="font-medium">
                    {enrollment.class?.name}
                </span>
            )
        }
    },

    {
        accessorKey: "course",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-3"
            >
                Course
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const enrollment = row.original

            return (
                <span className="font-medium">
                    {enrollment.class?.course?.code}
                </span>
            )
        }
    },

    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-3"
            >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const status = row.original.status
            return (
                <Badge variant={statusVariant[status ?? ""] ?? "outline"}>
                    {status ?? "—"}
                </Badge>
            )
        }
    },

    {
        accessorKey: "grade",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-3"
            >
                Grade
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const enrollment = row.original

            return (
                <span className="font-medium">
                    {enrollment.grade ?? "-"}
                </span>
            )
        }
    },

    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-3"
            >
                Enrolled At
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const enrollment = row.original

            return (
                <span className="font-medium">
                    {new Date(enrollment.createdAt).toLocaleDateString()}
                </span>
            )
        }
    },

    {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const enrollment = row.original
            return (
                <div className="text-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" aria-label="Open menu" size="icon-sm">
                                <MoreHorizontalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <Separator className="my-1" />
                            <DropdownMenuContent className="w-40" align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
                            </DropdownMenuGroup>
                            <Separator className="my-1" />
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <Link to={`/users/${enrollment.student?.id}`}>View Student Profile</Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuGroup>
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
                </div>
            )
        },
    },
]