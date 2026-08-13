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
import { Users, LayoutDashboard, GraduationCap, BookOpen, School, Building2, BookText, Building } from "lucide-react";
import { NavUserContainer } from "./nav-user-container";
import { useAuth } from "@/hooks/useAuth";
import type { NavGroup } from "@/types/nav";

const data: { navMain: NavGroup[] } = {
  navMain: [
    {
      title: "Main",
      items: [
        { title: "Dashboard", to: "/",          icon: LayoutDashboard },
        { title: "Lecturer",  to: "/lecturers", icon: GraduationCap,  roles: ["ADMIN"] },
        { title: "Student",   to: "/students",  icon: BookOpen,       roles: ["ADMIN", "LECTURER"] },
        { title: "My Classes", to: "/my-classes", icon: BookOpen, roles:["STUDENT"]},
      ],
    },
    {
      title: "Administration",
      items: [
        { title: "User",       to: "/users",       icon: Users,      roles: ["ADMIN"] },
        { title: "Department", to: "/departments", icon: Building2,  roles: ["ADMIN"] },
        { title: "Enrollment", to: "/enrollments", icon: Building,   roles: ["ADMIN"] },
        { title: "Class",      to: "/classes",     icon: School,     roles: ["ADMIN", "LECTURER"] },
        { title: "Course",     to: "/courses",     icon: BookText,   roles: ["ADMIN"] },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const role = user?.role;

  const filteredNav = data.navMain
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => !item.roles || (role && item.roles.includes(role as never))
      ),
    }))
    .filter((group) => group.items.length > 0);

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
        <NavMain groups={filteredNav} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <NavUserContainer />
      </SidebarFooter>
    </Sidebar>
  );
}

