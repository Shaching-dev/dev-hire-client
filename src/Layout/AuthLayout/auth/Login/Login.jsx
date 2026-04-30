import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const { signInWithEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // 🔥 Auto-fill email from localStorage (if user chose "Remember me")
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

  const handleLogin = async (data) => {
    setIsSubmitting(true);
    try {
      await signInWithEmail(data.email, data.password);

      // Save email for next time if "Remember me" is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", data.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      toast.success("Login successful! Welcome back 🎉");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-6 md:p-8 lg:p-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0e2c4e]">
          Welcome Back
        </h1>
        <p className="text-[#0e2c4e]/70 mt-2">
          Sign in to continue to Dev Hire
        </p>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block mb-2 text-[#0e2c4e] font-semibold">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            autoComplete="username"
            {...register("email", { required: "Email is required" })}
            className="w-full px-5 py-4 border border-[#0e2c4e]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0e2c4e] bg-white"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block mb-2 text-[#0e2c4e] font-semibold">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-5 py-4 border border-[#0e2c4e]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0e2c4e] bg-white"
          />
          <span
            className="absolute right-5 top-11 cursor-pointer text-[#0e2c4e]/60 hover:text-[#0e2c4e]"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-[#0e2c4e]"
            />
            <span className="text-[#0e2c4e]">Remember me</span>
          </label>
          <Link
            to="/auth/forgot-password"
            className="text-[#0e2c4e] hover:underline text-sm"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-[#0e2c4e] hover:bg-[#1a4b82] text-white font-semibold text-lg rounded-2xl transition-all flex items-center justify-center"
        >
          {isSubmitting ? (
            <span className="animate-spin">
              <AiOutlineLoading3Quarters size={24} />
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Social Login */}
      <div className="my-3 border-t border-gray-200 pt-6">
        <SocialLogin />
      </div>

      <div className="text-center">
        <p className="text-[#0e2c4e]/70">
          Don’t have an account?{" "}
          <Link
            to="/auth/register"
            className="font-semibold text-[#0e2c4e] hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
