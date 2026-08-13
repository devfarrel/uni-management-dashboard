import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontalIcon, FilePenLine, UserRoundX, UserRoundSearch, ClipboardClock } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuPortal, 
    DropdownMenuSeparator, 
    DropdownMenuSub, 
    DropdownMenuSubContent, 
    DropdownMenuSubTrigger, 
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    HoverCard, 
    HoverCardContent, 
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import type { Enrollment } from "@/api/enrollment.api"

type ActionsProps = {
    onDrop:      (id: number) => void
    dropping:    boolean
    onGrade:     (id: number, grade: string) => void
    grading:     boolean
    onWaitlist:  (id: number) => void
    waitlisting: boolean
}

export const getRosterColumns = ({ onDrop, dropping, onGrade, grading, onWaitlist, waitlisting }: ActionsProps): ColumnDef<Enrollment>[] => [
    {
        accessorKey: "student",
        filterFn: (row, _columnId, filterValue: string) => {
            const name = row.original.student?.name ?? ""
            return name.toLowerCase().includes(filterValue.toLowerCase())
        },
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
                <HoverCard openDelay={100} closeDelay={100}>
                    <HoverCardTrigger asChild>
                    <Link
                        to={`/users/${student?.id}`}
                        className="text-sm font-medium cursor-pointer hover:underline"
                        >
                        {student?.name || "-"}
                        </Link>
                    </HoverCardTrigger>
                    <HoverCardContent align="center" side="right" alignOffset={20} sideOffset={20}>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Student:</span>
                                <span className="text-sm">{student?.name || "-"}</span>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Student ID:</span>
                                <span className="text-sm">{student?.identifier || "-"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Department:</span>
                                <span className="text-sm">{student?.department?.name || "-"}</span>
                            </div>

                            <span className="text-muted-foreground text-xs">
                                Click student name to view full student profile
                            </span>
                        </div>
                    </HoverCardContent>
                </HoverCard>
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
            const status = row.getValue("status") as string
            return (
                <span className="text-sm font-medium">{status}</span>
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
            const grade = row.getValue("grade") as string
            return (
                <span className="text-sm font-medium">{grade || "-"}</span>
            )
        }
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const enrollment = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-44" align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link to={`/users/${enrollment.studentId}`}>
                                <UserRoundSearch />
                                View Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <FilePenLine />
                                Grade
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuLabel>Set Grade</DropdownMenuLabel>
                                    {["A", "A-", "B+", "B", "B-", "C+", "C", "D", "E"].map((grade) => (
                                    <DropdownMenuItem
                                        key={grade}
                                        disabled={grading}
                                        onClick={() => onGrade(enrollment.id, grade)}
                                    >
                                        {grade}
                                    </DropdownMenuItem>
                                ))}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Enrollment</DropdownMenuLabel>
                        <DropdownMenuItem
                            disabled={waitlisting}
                            onClick={() => onWaitlist(enrollment.id)}
                        >
                            <ClipboardClock />
                            Move to Waitlist
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            disabled={dropping}
                            onClick={() => onDrop(enrollment.id)}
                            variant="destructive"
                        >
                            <UserRoundX />
                            Drop Student
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]