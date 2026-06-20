import { useUsers } from "../../hooks/useUsers";
import { UsersTable } from "@/components/users/UsersTable";
import { toast } from "sonner";

export default function UsersPage() {
    const {
        usersQuery: { data },
        deleteUser,
        deleting,
    } = useUsers();

    const students = data?.filter((user) => user.role === "STUDENT") ?? [];

    const handleDeleteUser = async (id: number) => {
        await toast.promise(
            deleteUser(id),
            {
                loading: "Deleting user...",
                success: "User deleted successfully!",
                error: "Failed to delete user.",
            }
        )
    }

    return (
        <div className="p-6">
            <UsersTable
                users={students}
                onDelete={handleDeleteUser}
                deleting={deleting}
                title="Students"
                showCreate={false}
            />
        </div>
    );
}