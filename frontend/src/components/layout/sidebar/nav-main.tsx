import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import type { NavGroup } from "@/types/nav";
import { SearchForm } from "./search-form";

export function NavMain({ groups }: { groups: NavGroup[] }) {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent>
          <SearchForm className="data-[state=open]:bg-transparent pt-2" />
        </SidebarGroupContent>
      </SidebarGroup>

      {groups.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.to} end>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        data-active={isActive}
                      >
                        <span className="flex items-center gap-2">
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.title}</span>
                        </span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
