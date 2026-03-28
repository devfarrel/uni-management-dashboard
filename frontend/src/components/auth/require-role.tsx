import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function RequireRole({ role }: { role: "ADMIN" | "USER" }) {
  const { user } = useAuth();

  if (!user) return null;
  if (user.role !== role) return <Navigate to="/403" replace />;

  return <Outlet />;
}
