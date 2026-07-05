import { IconInnerShadowTop } from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import { Users, LayoutDashboard, GraduationCap, BookOpen, School, Building2, BookText } from "lucide-react";
import { NavUserContainer } from "./nav-user-container";

const data = {
  navMain: [
    {
      title: "Main",
      items: [
        { title: "Dashboard",  to: "/",           icon: LayoutDashboard },
        { title: "Lecturer",   to: "/lecturers",  icon: GraduationCap },
        { title: "Student",    to: "/students",   icon: BookOpen },
      ],
    },
    {
      title: "Administration",
      items: [
        { title: "User",       to: "/users",       icon: Users },
        { title: "Department", to: "/departments", icon: Building2 },
        { title: "Class",      to: "/classes",     icon: School },
        { title: "Course",     to: "/courses",     icon: BookText },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">
                  Bina Sarana Informatika
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <NavUserContainer />
      </SidebarFooter>
    </Sidebar>
  );
}
