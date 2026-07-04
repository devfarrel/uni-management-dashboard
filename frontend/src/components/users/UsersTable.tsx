import type { User } from "@/api/user.api"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { getUserColumns } from "@/components/users/columns"

type Props = {
    users: User[]
    onDelete: (id: number) => void
    deleting: boolean
    title?: string
    showCreate?: boolean
    createPath?: string
}

export function UsersTable({
    users,
    onDelete,
    deleting,
    title = "Users",
    showCreate = true,
    createPath = "/users/new",
}: Props ) {
    const navigate = useNavigate()
    const columns = getUserColumns({ onDelete, deleting })

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">{title}</h1>
                {showCreate && (
                    <Button onClick={() => navigate(createPath)}>
                    Create User
                    </Button>
                )}
            </div>

            <DataTable
                columns={columns}
                data={users}
                searchKey="name"
                searchPlaceholder="Search by name..."
            />
        </div>
    )
}