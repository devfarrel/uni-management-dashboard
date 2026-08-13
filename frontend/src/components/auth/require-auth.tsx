import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface RequireAuthProps {
    allowedRoles?: string[];
}

export function RequireAuth({ allowedRoles }: RequireAuthProps) {
    const { isAuthenticated, loading, user } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        toast.error("You do not have permission to access this page");
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}