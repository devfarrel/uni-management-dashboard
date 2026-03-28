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
import { Users, LayoutDashboard } from "lucide-react";
import { NavUserContainer } from "./nav-user-container";

const data = {
  navMain: [
    {
      title: "Main",
      icon: LayoutDashboard,
      items: [
        { title: "Dashboard", to: "/" },
        { title: "Teachers", to: "/teachers" },
        { title: "Students", to: "/students" },
      ],
    },
    {
      title: "Administration",
      icon: Users,
      items: [
        { title: "Users", to: "/users" },
        { title: "Courses", to: "/courses" },
        { title: "Classes", to: "/classes" },
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
