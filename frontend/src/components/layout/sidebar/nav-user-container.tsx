import { NavUser} from "@/components/layout/sidebar/nav-user";
import { useAuth } from "@/hooks/useAuth";

export function NavUserContainer() {
    const { user, logout, loading } = useAuth();

    if (loading) return null;
    if (!user) return null;

    console.log("auth user:", user);

    return (
        <NavUser
        user={{
            name: user.name,
            email: user.email,
            avatar: user.image || undefined,
        }}
        onLogout={logout} />
    )
}