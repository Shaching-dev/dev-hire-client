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
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/about",
        Component: About,
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
    element: <DashboardLayout />,
    children: [
      {
        path: "profile",
        Component: <h2>Profile</h2>,
      },
    ],
  },
]);
