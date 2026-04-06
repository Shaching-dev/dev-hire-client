import React from "react";
import { Outlet } from "react-router";

import authImage from "../../assets/sept_lock_gift_box_2.jpg";
import auth from "../../assets/auth.jpg";
import Logo from "../../Components/Logo/Logo";

const AuthLayout = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${authImage})`,
      }}>
      <div className="absolute inset-0 bg-black/5"></div>

      <div className="relative z-10 w-full container mx-auto">
        <div className=" hidden md:block">
          <Logo />
        </div>

        <div className="flex justify-between items-center gap-10">
          <div className="flex-1 hidden md:block">
            <img src={auth} alt="auth-image" className="rounded-2xl" />
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Logo Centered */}
            <div className="mb-6 block md:hidden">
              <Logo />
            </div>

            {/* Form / Outlet */}
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
