import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontalIcon, Pencil, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
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
                        <DropdownMenuContent className="w-40" align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <Separator className="my-1" />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Pencil className="h-4 w-4" />
                                    <Link to={`/courses/${course.id}`}>
                                        Edit
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => onDelete(course.id)}
                                    disabled={deleting}
                                    className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    }
]