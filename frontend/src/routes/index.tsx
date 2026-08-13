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
import UserSecurityEmailPage from "@/pages/users/security/UserSecurityEmailPage";
import UserSecurityPasswordPage from "@/pages/users/security/UserSecurityPasswordPage";
import UserSecurityUsernamePage from "@/pages/users/security/UserSecurityUsernamePage";
import LecturersPage from "@/pages/lecturer/LecturersPage";
import StudentsPage from "@/pages/lecturer/StudentsPage";
import ClassesPage from "@/pages/class/index";
import CreateClassPage from "@/pages/class/create";
import ClassRosterPage from "@/pages/roster";
import EnrollmentsPage from "@/pages/enrollment/index";
import CreateEnrollmentPage from "@/pages/enrollment/create";
import MyClassesPage from "@/pages/my-classes";
import DepartmentDetailPage from "@/pages/department/detail";

export const router = createBrowserRouter([
  {
    element: <Page />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          // Admin only
          {
            element: <RequireAuth allowedRoles={["ADMIN"]} />,
            children: [
              { path: "/users", element: <UsersPage /> },
              { path: "/users/new", element: <AddUserPage /> },
              { path: "/departments", element: <DepartmentsPage /> },
              { path: "/departments/new", element: <CreateDepartmentPage /> },
              { path: "/enrollments", element: <EnrollmentsPage /> },
              { path: "/enrollments/new", element: <CreateEnrollmentPage /> },
            ],
          },

          // Admin & Lecturer only
          {
            element: <RequireAuth allowedRoles={["ADMIN", "LECTURER"]} />,
            children: [
              { path: "/classes", element: <ClassesPage /> },
              { path: "/classes/new", element: <CreateClassPage /> },
              { path: "/classes/:id/roster", element: <ClassRosterPage /> },
              { path: "/courses", element: <CoursesPage /> },
              { path: "/courses/new", element: <CreateCoursePage /> },
              { path: "/students", element: <StudentsPage /> },
              { path: "/departments/:id", element: <DepartmentDetailPage /> },
            ],
          },

          // Student only
          {
            element: <RequireAuth allowedRoles={["STUDENT"]} />,
            children: [{ path: "/my-classes", element: <MyClassesPage /> }],
          },

          // Authenticated users
          {
            element: <RequireAuth />,
            children: [
              { path: "/", element: <DashboardPage /> },
              { path: "/users/:id", element: <UserDetailPage /> },
              { path: "/users/:id/security", element: <UserSecurityPage /> },
              {
                path: "/users/:id/security/email",
                element: <UserSecurityEmailPage />,
              },
              {
                path: "/users/:id/security/username",
                element: <UserSecurityUsernamePage />,
              },
              {
                path: "/users/:id/security/password",
                element: <UserSecurityPasswordPage />,
              },
              { path: "/lecturers", element: <LecturersPage /> },
            ],
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
