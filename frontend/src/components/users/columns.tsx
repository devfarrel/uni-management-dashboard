import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontalIcon, Trash2, UserIcon, UserRoundSearch } from "lucide-react"
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
    DropdownMenuSeparator, 
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    HoverCard, 
    HoverCardContent, 
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import type { User, Role } from "@/api/user.api"

const ROLE_BADGE: Record<Role, string> = {
    ADMIN:    "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    LECTURER: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    STUDENT:  "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    USER:     "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
}

type ActionsProps = {
    onDelete: (id: number) => void
    deleting: boolean
}

export const getUserColumns = ({ onDelete, deleting }: ActionsProps): ColumnDef<User>[] => [
    {
        accessorKey: "name",
        header: ({ column }) => (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-3"
        >
            Profile
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        ),
        cell: ({ row }) => {
        const user = row.original
        return (
            <div className="flex items-center space-x-3">
            {user.avatar ? (
                <img
                src={user.avatar}
                alt={user.name ?? "User avatar"}
                className="w-10 h-10 rounded-full object-cover"
                />
            ) : (
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <UserIcon className="w-4 h-4" />
                </div>
            )}
            <div className="flex flex-col">
                <HoverCard openDelay={10} closeDelay={100}>
                <HoverCardTrigger asChild>
                    <Link
                    to={`/users/${user.id}`}
                    className="text-sm font-medium cursor-pointer hover:underline"
                    >
                    {user.name ?? user.username}
                    </Link>
                </HoverCardTrigger>
                <HoverCardContent side="top" align="start" className="w-64">
                    <div className="flex items-center gap-3 mb-3">
                    {user.avatar ? (
                        <img
                        src={user.avatar}
                        alt={user.name ?? "avatar"}
                        className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <UserIcon className="w-5 h-5" />
                        </div>
                    )}
                    <div>
                        <p className="text-sm font-medium">{user.name ?? user.username}</p>
                        <p className="text-xs text-muted-foreground">{user.identifier}</p>
                    </div>
                    </div>
                    <Separator className="my-1" />
                    <div className="flex flex-col gap-1 text-xs pt-1">
                    <span>{user.email}</span>
                    <span>{user.phone ?? "No phone number"}</span>
                    <span>{user.address ?? "No address"}</span>
                    </div>
                </HoverCardContent>
                </HoverCard>
                <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
            </div>
        )
        },
    },

    {
        accessorKey: "identifier",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-3"
            >
                Identifier
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <span className="text-xs font-semibold text-muted-foreground font-mono">
                {row.getValue("identifier") || "-"}
            </span>
        ),
    },

    {
        accessorKey: "role",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-3"
            >
                Role
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const role = row.getValue("role") as Role
            return (
                <Badge className={ROLE_BADGE[role]}>
                    {role}
                </Badge>
            )
        },
    },

    {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const user = row.original
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
                                    <Link to={`/users/${user.id}`} className="flex items-center gap-2">
                                        <UserRoundSearch />
                                        View Profile
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    variant="destructive"
                                    disabled={deleting}
                                    onSelect={() => onDelete(user.id)}
                                >
                                    <Trash2 />
                                    Delete User
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]