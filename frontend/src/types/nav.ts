import type { LucideIcon } from "lucide-react";
import type { Role } from "@/api/user.api";

export interface NavItem {
  title: string;
  to: string;
  icon?: LucideIcon;
  /** If set, only users with one of these roles will see this item. */
  roles?: Role[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}
