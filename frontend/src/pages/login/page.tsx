import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login/LoginForm"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useEffect } from "react"

export default function LoginPage() {
    const navigate = useNavigate()
    const { login, isAuthenticated, loading } = useAuth()

    useEffect(() => {
      if (!loading && isAuthenticated) {
        navigate("/users", { replace: true })
      }
    }, [isAuthenticated, loading, navigate])

    const handleLogin = async (data: { email: string; password: string }) => {
      await toast.promise(login(data), {
        loading: "Signing in...",
        success: "Welcome back!",
        error: "Invalid email or password",
      })
    }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  )
}
