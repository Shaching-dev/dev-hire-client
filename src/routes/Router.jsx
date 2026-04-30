import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Components/Home/Home";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "../Layout/AuthLayout/auth/Login/Login";
import Register from "../Layout/AuthLayout/auth/Register/Register";
import Developers from "../Pages/Developers/Developers";
import Jobs from "../Pages/Jobs/Jobs";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import Profile from "../Layout/DashboardLayout/Dashboard/Profile/Profile";
import UsersManagement from "../Layout/DashboardLayout/Dashboard/UsersManagement/UsersManagement";
import PostJob from "../Role/Recruiter/PostJob/PostJob";
import ForbiddenPage from "../hooks/useAxiosSecure/ForbiddenPage";
import JobDetails from "@/Role/Recruiter/JobDetails/JobDetails";
import MyJobs from "@/Role/Recruiter/MyJobs/MyJobs";
import ManageRecruiter from "@/Role/Recruiter/ManageRecruiter/ManageRecruiter";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "/developers",
        element: (
          <PrivateRoute>
            <Developers />
          </PrivateRoute>
        ),
      },
      {
        path: "/jobs",
        Component: Jobs,
      },
      {
        path: "/jobs-details/:id",
        Component: JobDetails,
      },
      {
        path: "/post-job",
        element: <PostJob />,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/about",
        Component: About,
      },

      {
        path: "/forbidden",
        Component: ForbiddenPage,
      },
    ],
  },

  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        Component: Profile,
      },

      {
        path: "users-management",
        Component: UsersManagement,
      },

      {
        path: "my-jobs",
        Component: MyJobs,
      },
      {
        path: "manage-recruiter",
        Component: ManageRecruiter,
      },
    ],
  },
]);
