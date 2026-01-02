import { LayoutDashboard, Users } from "lucide-react"
import type { NavItem } from "@/types/nav"

export const navMain: NavItem[] = [
  { title: "Dashboard", to: "/", icon: LayoutDashboard },
  { title: "Users", to: "/users", icon: Users },
]
