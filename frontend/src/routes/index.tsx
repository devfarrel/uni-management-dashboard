import { createBrowserRouter } from "react-router-dom";
import UsersPage from "../pages/users/UsersPage";
import AddUserPage from "@/pages/users/AddUserPage";
import Page from "@/components/layout/dashboard-layout";
import { RequireAuth } from "@/components/auth/require-auth";
import LoginPage from "@/pages/login/page";
import DashboardPage from "@/pages/dashboard/page";

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
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
