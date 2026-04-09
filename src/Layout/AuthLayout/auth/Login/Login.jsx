import React, { useState } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  // const from = location.state?.from || "/";
  const from = location?.state?.from || "/";
  const navigate = useNavigate();

  // console.log("in the login page", location);

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signInWithEmail } = useAuth();

  const handleLoginWithEmail = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await signInWithEmail(data.email, data.password);
      // console.log(res.user);
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-gradient-to-r from-blue-400 to-purple-300 hover:shadow-2xl hover:shadow-green-950 duration-150 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-center mb-6 text-[#0e2c4e]">
          Welcome to Dev Hire
        </h3>

        <form
          onSubmit={handleSubmit(handleLoginWithEmail)}
          className="space-y-4">
          {/* Photo Upload Section */}

          {/* Email */}
          <div>
            <label className="block mb-1 text-[#0e2c4e] font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border rounded-md border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 text-[#0e2c4e] font-semibold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full   px-3 py-2 border rounded-md border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
            />

            <span
              className="absolute cursor-pointer right-4 top-1/2"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>
          <span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </span>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-[#0e2c4e] text-white py-3 my-3 font-semibold rounded-md hover:bg-[#1a4b82] transition duration-200 flex items-center justify-center">
            {isSubmitting ? (
              <span className="animate-spin">
                <AiOutlineLoading3Quarters size={20} />
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-4 border-t border-gray-400/30 pt-4">
          <SocialLogin />
        </div>

        <div className="max-w-sm mx-auto my-3">
          <p className="text-[16px] font-bold">
            New to DevHire ? please{" "}
            <Link
              state={location?.state}
              to={"/auth/register"}
              className="text-secondary hover:border-b-2">
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
