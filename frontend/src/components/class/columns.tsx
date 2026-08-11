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
import {
    HoverCard, 
    HoverCardContent, 
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import type { Class } from "@/api/class.api"

type ActionsProps = {
    onDelete: (id: number) => void
    deleting: boolean
}

export const getClassColumns = ({ onDelete, deleting }: ActionsProps): ColumnDef<Class>[] => [
    {
        accessorKey: "name",
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
            const cls = row.original
            return (
                <HoverCard openDelay={100} closeDelay={100}>
                    <HoverCardTrigger asChild>
                    <Link
                        to={`/classes/${cls.id}/roster`}
                        className="text-sm font-medium cursor-pointer hover:underline"
                        >
                        {cls.name || "-"}
                        </Link>
                    </HoverCardTrigger>
                    <HoverCardContent align="center" side="right" alignOffset={20} sideOffset={20}>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Code:</span>
                                <span className="text-sm">{cls.name || "-"}</span>
                            </div>
                            <Separator />
                            <div className="flex flex-col">
                                <span className="text-xs font-medium">Room: {row.original.room}</span>
                                <span className="text-xs font-medium">Day: {row.original.day}</span>
                                <span className="text-xs font-medium">Time: {row.original.startTime.slice(0, 5)} - {row.original.endTime.slice(0, 5)}</span>
                            </div>
                            <span className="text-muted-foreground text-xs">
                                Click code to view full class schedule
                            </span>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            )
        }
    },

    {
        accessorKey: "room",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-3"
            >
                Room
                <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex flex-col">
                    <span>{row.getValue("room")}</span>
                </div>
            )
        }
    },

    {
        accessorKey: "day",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-3"
            >
                Day
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const startTime = row.original.startTime.slice(0, 5)
            const endTime = row.original.endTime.slice(0, 5)
            return (
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{row.getValue("day")}</span>
                    <span className="text-xs text-muted-foreground">{startTime} - {endTime}</span>
                </div>
            )
        }
    },

    {
        accessorKey: "lecturer",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-3"
            >
                Lecturer
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const lecturer = row.original.lecturer
            return (
                <HoverCard openDelay={100} closeDelay={100}>
                    <HoverCardTrigger asChild>
                    <Link
                        to={`/users/${lecturer?.id}`}
                        className="text-sm font-medium cursor-pointer hover:underline"
                        >
                        {lecturer?.name || "-"}
                        </Link>
                    </HoverCardTrigger>
                    <HoverCardContent align="center" side="left">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Lecturer:</span>
                                <span className="text-sm">{lecturer?.name || "-"}</span>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Room:</span>
                                <span className="text-sm">{row.original.room}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Day:</span>
                                <span className="text-sm">{row.original.day}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Time:</span>
                                <span className="text-sm">{row.original.startTime} - {row.original.endTime}</span>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            )
        }
    },

    {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const cls = row.original
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
                                    <Link to={`/users/${cls.lecturer?.id}`}>View Lecturer Profile</Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    variant="destructive"
                                    disabled={deleting}
                                    onSelect={() => onDelete(cls.id)}
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]