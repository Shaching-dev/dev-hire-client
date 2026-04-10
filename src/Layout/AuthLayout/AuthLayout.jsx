import React from "react";
import { Outlet } from "react-router";
import authImage from "../../assets/sept_lock_gift_box_2.jpg";
import Logo from "../../Components/Logo/Logo";

const AuthLayout = () => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage: `url(${authImage})`,
      }}>
      {/* Darker Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/90 p-3 rounded-xl shadow-lg">
            <Logo />
          </div>
        </div>

        {/* Main Card Container */}
        <main className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          {/* The form from Outlet will render here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
