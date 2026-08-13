import { NavUser } from "@/components/layout/nav-user";
import { useAuth } from "@/hooks/useAuth";

export function NavUserNavbarContainer() {
    const { user, logout, loading } = useAuth();

    if (loading) return null;
    if (!user) return null;

    return (
        <NavUser
            user={{
                name: user.name,
                email: user.email,
                avatar: user.image || undefined,
            }}
            onLogout={logout}
        />
    );
}
