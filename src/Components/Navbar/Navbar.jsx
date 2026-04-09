import React from "react";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth/useAuth";
import { toast } from "react-toastify";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const { user, userSignOut } = useAuth();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-gray-700 font-semibold border-b-2 border-gray-800"
      : "text-green-600 font-semibold hover:text-primary transition";

  const links = (
    <>
      <li className="relative group">
        <NavLink
          to="/developers"
          className={`${navLinkClass} flex items-center gap-1`}>
          Developers
          <MdKeyboardArrowDown />
        </NavLink>

        {/* DROPDOWN */}
        <ul className="absolute top-10 left-0 mt-2 w-52 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transform group-hover:translate-y-0 translate-y-2 transition-all duration-300 z-50">
          <li>
            <Link
              to="/developers/web"
              className="block px-4 py-2 hover:bg-gray-100">
              Web Developer
            </Link>
          </li>

          <li>
            <Link
              to="/developers/react"
              className="block px-4 py-2 hover:bg-gray-100">
              React Developer
            </Link>
          </li>

          <li>
            <Link
              to="/developers/python"
              className="block px-4 py-2 hover:bg-gray-100">
              Python Developer
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <NavLink to="/jobs" className={navLinkClass}>
          Jobs
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={navLinkClass}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={navLinkClass}>
          Contact
        </NavLink>
      </li>
    </>
  );

  const handleSignOut = async () => {
    try {
      await userSignOut();
      // console.log(res.user);
      toast.success(`Sign out successfully`);
    } catch (error) {
      // console.log(error);
      toast.error(`${error}`);
    }
  };

  return (
    <div className="navbar bg-white/50 shadow-md px-4 sticky top-0 z-50">
      {/* LEFT */}
      <div className="navbar-start">
        {/* MOBILE MENU */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-52">
            {links}
          </ul>
        </div>

        {/* LOGO */}
        <Logo />
      </div>

      {/* CENTER MENU (DESKTOP) */}
      <div className="navbar-center hidden md:flex lg:flex">
        <ul className="menu menu-horizontal gap-4 px-1">{links}</ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-end gap-3">
        {/* AVATAR */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {user ? (
                <img src={user?.photoURL} alt="profile" />
              ) : (
                <p className="text-red-600 font-semibold">No User</p>
              )}
            </div>
          </div>

          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              {user ? (
                <button onClick={handleSignOut} className="text-red-500">
                  Logout
                </button>
              ) : (
                <Link to={"/auth/login"} className="text-green-600">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
