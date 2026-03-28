import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  to: string;
  icon?: LucideIcon;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}
