import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontalIcon, Pen, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

import {
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import type { Course } from "@/api/course.api"

type ActionsProps = {
    onDelete: (id: number) => void
    deleting: boolean
}

export const getCourseColumns = ({ onDelete, deleting }: ActionsProps): ColumnDef<Course> [] => [
    {
        accessorKey: "code",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-3"
            >
                Code
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            return (
                <span className="font-medium">
                    {row.getValue("code")}
                </span>
            )
        }
    },
    {
        accessorKey: "title",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-3"
            >
                Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            return (
                <span className="font-medium">
                    {row.getValue("title")}
                </span>
            )
        }
    },
    {
        accessorKey: "credits",
        header: "Credit",
        cell: ({ row }) => {
            return (
                <span className="font-medium">
                    {row.getValue("credits")}
                </span>
            )
        }
    },
    {
        accessorKey: "semester",
        header: "Semester",
        cell: ({ row }) => {
            return (
                <span className="font-medium">
                    {row.getValue("semester")}
                </span>
            )
        }
    },
    {
        accessorKey: "departmentId",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-3"
            >
                Department
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            return (
                <span className="font-medium">
                    {row.getValue("departmentId")}
                </span>
            )
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const course = row.original
            return (
                <div className="text-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" aria-label="Open menu" size="icon-sm">
                                <MoreHorizontalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-44" align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Pen />
                                    <Link to={`/courses/${course.id}`}>
                                        Edit Course
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => onDelete(course.id)}
                                    disabled={deleting}
                                    variant="destructive"
                                >
                                    <Trash2 />
                                    Delete Course
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    }
]