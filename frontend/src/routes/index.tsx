import { createBrowserRouter } from "react-router-dom";
import UsersPage from "../pages/users/UsersPage";
import AddUserPage from "@/pages/users/AddUserPage";
import Page from "@/components/layout/dashboard-layout";

export const router = createBrowserRouter([
    {
        element: <Page />,
        children: [
            {
                path: "/users",
                element: <UsersPage />,
            },
            {
                path: "/users/new",
                element: <AddUserPage />,
            },
        ]
    }
]);