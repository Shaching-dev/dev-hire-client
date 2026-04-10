import React from "react";
import { Outlet } from "react-router";
import authImage from "../../assets/sept_lock_gift_box_2.jpg";
import Logo from "../../Components/Logo/Logo";

const AuthLayout = () => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative bg-cover bg-center bg-no-repeat p-4 md:p-6 lg:p-8"
      style={{
        backgroundImage: `url(${authImage})`,
      }}>
      {/* Enhanced Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50 backdrop-blur-[3px]" />

      <div className="relative z-10 w-full max-w-lg mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8 md:mb-10">
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/30">
            <Logo />
          </div>
        </div>

        {/* Glassmorphic Card */}
        <main className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <Outlet />
        </main>

        {/* Subtle footer text (optional) */}
        <p className="text-center text-white/70 text-sm mt-6 font-medium">
          © 2026 Dev Hire • Connecting top developers
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
