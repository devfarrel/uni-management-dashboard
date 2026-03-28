import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { navMain } from "@/lib/nav";
import { NavUserContainer } from "./nav-user-container";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useLocation, Link } from "react-router-dom";

export function SiteHeader() {
  const location = useLocation();

  const parentNav =
    navMain.find(
      (item) => item.to !== "/" && location.pathname.startsWith(item.to),
    ) ?? navMain.find((item) => item.to === location.pathname);

  const isNested = parentNav && location.pathname !== parentNav.to;

  // e.g. "/users/new" -> "New"  or  "/users/123/edit" -> "Edit"
  const childLabel = isNested
    ? location.pathname.split("/").pop()?.replace(/-/g, " ")
    : null;

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <Breadcrumb>
          <BreadcrumbList>
            {isNested ? (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link to={parentNav!.to}>{parentNav!.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">
                    {childLabel}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {parentNav?.title ?? "Dashboard"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto flex items-center gap-2">
          <NavUserContainer />
        </div>
      </div>
    </header>
  );
}
