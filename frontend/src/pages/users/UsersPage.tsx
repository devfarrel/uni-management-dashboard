import { useUsers } from "../../hooks/useUsers";
import { UsersTable } from "@/components/users/UsersTable";

export default function UsersPage() {
    const {
        usersQuery: { data, isLoading, error },
    } = useUsers();
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading users</p>;

    return (
        <div className="p-6">
            {/* <h1 className="text-xl font-semibold mb-4">Users</h1> */}
            <UsersTable users={data || []} />
        </div>
    );
}