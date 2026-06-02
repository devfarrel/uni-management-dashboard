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
import { MoreHorizontalIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

import { Link, useNavigate } from "react-router-dom";
import type { User, Role } from "@/api/user.api";

type Props = {
  users: User[]
  onDelete: (id: number) => void
  deleting: boolean
}

const ROLE_BADGE: Record<Role, string> = {
    ADMIN:    "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    LECTURER: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    STUDENT:  "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    USER:     "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
}

export function UsersTable({users, onDelete, deleting}: Props) {
    const navigate = useNavigate();

    return (
        <div className="space-y-4">
        {/* Header / Actions */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Users</h1>
  
          <Button onClick={() => navigate("/users/new")}>
            Create User
          </Button>
        </div>
  
        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Identifier</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
  
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
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
                          <HoverCardContent side="bottom" align="start" className="w-64">
                            <div className="flex items-center gap-3 mb-3">
                              {user.avatar ? (
                                <img
                                  src={user.avatar}
                                  alt={user.name ?? "User avatar"}
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
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-semibold text-muted-foreground">{user.identifier || "-"}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={ROLE_BADGE[user.role]}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
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
                          <DropdownMenuItem
                            onClick={() => navigate(`/users/${user.id}`)}
                          >
                            View Profile
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            variant="destructive"
                            disabled={deleting}
                            onSelect={() => onDelete(user.id)}
                          >
                            Delete
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