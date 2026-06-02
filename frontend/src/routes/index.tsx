import { createBrowserRouter } from "react-router-dom";
import UsersPage from "@/pages/users/UsersPage";
import UserDetailPage from "@/pages/users/UserDetailPage";
import UserSecurityPage from "@/pages/users/UserSecurityPage";
import AddUserPage from "@/pages/users/AddUserPage";
import Page from "@/components/layout/dashboard-layout";
import { RequireAuth } from "@/components/auth/require-auth";
import LoginPage from "@/pages/login/page";
import DashboardPage from "@/pages/dashboard/page";
import DepartmentsPage from "@/pages/department/index";
import CreateDepartmentPage from "@/pages/department/create";
import CoursesPage from "@/pages/course/index";
import CreateCoursePage from "@/pages/course/create";

export const router = createBrowserRouter([
  {
    element: <Page />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/",
            element: <DashboardPage />,
          },
          {
            path: "/users",
            element: <UsersPage />,
          },
          {
            path: "/users/new",
            element: <AddUserPage />,
          },
          {
            path: "/users/:id",
            element: <UserDetailPage />,
          },
          {
            path: "/users/:id/security",
            element: <UserSecurityPage />,
          },
          {
            path: "/departments",
            element: <DepartmentsPage />,
          },
          {
            path: "/departments/new",
            element: <CreateDepartmentPage />,
          },
          {
            path: "/courses",
            element: <CoursesPage />,
          },
          {
            path: "/courses/new",
            element: <CreateCoursePage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
