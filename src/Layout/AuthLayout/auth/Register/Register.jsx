import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../../hooks/useAuth/useAuth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// import imageIcon from "../../../../assets/developer/";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import WorkStatus from "../WorkStatus/WorkStatus";
import { ImageIcon } from "lucide-react";

const Register = () => {
  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const [showPassword, setShowPassword] = useState(false);

  const { registerWithEmail, updateUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setFileError("File must be less than 2MB");
      return;
    }
    setFileError("");

    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  };

  const clearImage = () => {
    setPreview(null);
    setFileError("");
    setValue("photo", null);
  };

  const handleRegister = async (data) => {
    setIsSubmitting(true);

    try {
      // Step 1: Register with Firebase (this is where duplicate email is caught)
      let firebaseRes;
      try {
        firebaseRes = await registerWithEmail(data.email, data.password);
      } catch (authError) {
        // If your hook properly throws (after you fix it later), this will catch it
        if (authError?.code === "auth/email-already-in-use") {
          toast.error(
            "This email is already registered. Please login instead!",
          );
          return;
        }
        throw authError; // other Firebase errors
      }

      // Safety check in case hook is still swallowing the error
      if (!firebaseRes?.user) {
        toast.error("This email is already registered. Please login instead!");
        return;
      }

      // Step 2: Upload photo to Cloudinary
      const imageFile = data.photo[0];
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "my_present");

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/dldvozuht/image/upload`,
        formData,
      );
      const photoURL = cloudinaryRes.data.secure_url;

      // Step 3: Update Firebase profile
      await updateUser({
        displayName: data.name,
        photoURL: photoURL,
      });

      // Step 4: Save to your database (non-blocking)
      const userInfo = {
        displayName: data.name,
        email: data.email,
        photoURL: photoURL,
        uid: firebaseRes.user.uid,
        role: data.workStatus,
        createdAt: new Date(),
      };

      const saveToDB = async () => {
        try {
          const dbRes = await axiosSecure.post("/users", userInfo);
          if (!dbRes.data.success) {
            console.warn("DB save warning:", dbRes.data.message);
          }
        } catch (dbErr) {
          console.warn("Database save failed (non-blocking):", dbErr);
        }
      };
      saveToDB(); // fire and forget

      // ✅ Success
      toast.success(`Welcome ${data.name}!`);
      navigate(from, { replace: true });
      reset();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { onChange: rhfOnChange, ...restPhotoRegister } = register("photo", {
    required: "Photo is required",
    validate: {
      lessThan2MB: (files) =>
        !files ||
        !files[0] ||
        files[0].size < 2 * 1024 * 1024 ||
        "Max 2MB allowed",
      // isPNG: (files) =>
      //   !files || !files[0] || files[0].type === "image/png" || "image/jpg",
    },
  });

  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="text-center mb-3">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0e2c4e] tracking-tight">
          Join Dev Hire
        </h1>
        <p className="text-[#0e2c4e]/70 mt-2 text-base">
          Create your profile and start getting hired
        </p>
      </div>

      <form onSubmit={handleSubmit(handleRegister)} className="space-y-3">
        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <label className="block mb-3 text-[#0e2c4e] font-semibold text-lg">
            Profile Photo
          </label>

          <div className="relative w-20 h-20 md:w-25 md:h-25">
            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-xl"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-2xl w-8 h-8 flex items-center justify-center text-xl shadow-lg transition"
                >
                  ✕
                </button>
              </>
            ) : (
              <label
                htmlFor="photo-upload"
                className="cursor-pointer w-full h-full rounded-2xl flex flex-col items-center justify-center bg-white/70 border-2 border-dashed border-[#0e2c4e]/40 hover:border-[#0e2c4e] hover:bg-white/90 transition-all duration-200"
              >
                {/* <img
                  src={imageIcon}
                  alt="Upload icon"
                  className="w-12 h-12 opacity-70 mb-1"
                /> */}
                <ImageIcon size={100} />
                <span className="text-[#0e2c4e]/70 text-sm font-medium">
                  Upload Photo
                </span>
              </label>
            )}
          </div>

          <input
            id="photo-upload"
            type="file"
            className="hidden"
            {...restPhotoRegister}
            onChange={(e) => {
              handleImageChange(e);
              rhfOnChange(e);
            }}
          />

          {fileError && (
            <p className="text-red-500 text-sm mt-2">{fileError}</p>
          )}
          {errors.photo && (
            <p className="text-red-500 text-sm mt-2">{errors.photo.message}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block mb-2 text-[#0e2c4e] font-semibold">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-3 py-2 border border-[#0e2c4e]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e2c4e] bg-white text-[#0e2c4e] placeholder:text-[#0e2c4e]/40"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-[#0e2c4e] font-semibold">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            {...register("email", { required: "Email is required" })}
            className="w-full px-3 py-2 border border-[#0e2c4e]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e2c4e] bg-white text-[#0e2c4e] placeholder:text-[#0e2c4e]/40"
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-3 py-2 border border-[#0e2c4e]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e2c4e] bg-white text-[#0e2c4e] placeholder:text-[#0e2c4e]/40"
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

        {/* Work Status */}
        <WorkStatus register={register} setValue={setValue} />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-[#0e2c4e] hover:bg-[#1a4b82] text-white font-semibold text-lg rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="animate-spin">
              <AiOutlineLoading3Quarters size={24} />
            </span>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Social Login */}
      <div className="mt-4 border-t border-gray-200">
        <SocialLogin />
      </div>

      {/* Login Link */}
      <div className="text-center mt-3">
        <p className="text-[#0e2c4e]/70 text-base">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            state={location?.state}
            className="font-semibold text-[#0e2c4e] hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
