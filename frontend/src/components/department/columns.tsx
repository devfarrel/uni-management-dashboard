import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontalIcon } from "lucide-react"
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

import type { Department } from "@/api/department.api"

type ActionsProps = {
    onDelete: (id: number) => void,
    deleting: boolean
}

export const getDepartmentColumns = ({ onDelete, deleting }: ActionsProps ): ColumnDef<Department>[] => [
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
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-3"
            >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            return (
                <span className="font-medium">
                    {row.getValue("name")}
                </span>
            )
        }
    },
    {
        accessorKey: "faculty",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-3"
            >
                Faculty
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            return (
                <span className="font-medium">
                    {row.getValue("faculty")}
                </span>
            )
        }
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const department = row.original
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
                                <DropdownMenuItem asChild>
                                    <Link
                                        to={`/department/${department.id}`}
                                        className="cursor-pointer"
                                    >
                                        Edit
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    onClick={() => onDelete(department.id)}
                                    disabled={deleting}
                                    className="cursor-pointer"
                                >
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