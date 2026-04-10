import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../../hooks/useAuth/useAuth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import imageIcon from "../../../../assets/image-upload-icon.png";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import WorkStatus from "../WorkStatus/WorkStatus";

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
    setValue, // ✅ Imported setValue to clear the input
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const [showPassword, setShowPassword] = useState(false);

  const { registerWithEmail, updateUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Check file type
    if (file.type !== "image/png") {
      setFileError("Only PNG files are allowed");
      return;
    }

    // Check file size (2MB = 2 * 1024 * 1024)
    if (file.size > 2 * 1024 * 1024) {
      setFileError("File must be less than 2MB");
      return;
    }

    setFileError("");

    // Create preview
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  };

  // ✅ Function to completely clear the image state and input
  const clearImage = () => {
    setPreview(null);
    setFileError("");
    setValue("photo", null); // Clears the file from react-hook-form
  };

  const handleRegister = async (data) => {
    setIsSubmitting(true);
    try {
      const imageFile = data.photo[0];
      const formData = new FormData();
      formData.append("file", imageFile); // REQUIRED
      formData.append("upload_preset", "my_present");
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/dldvozuht/image/upload`,
        formData,
      );
      const photoURL = cloudinaryRes.data.secure_url;
      const res = await registerWithEmail(data.email, data.password);
      // console.log(res.user);
      await updateUser({
        displayName: data.name,
        photoURL: photoURL,
      });

      const userInfo = {
        displayName: data.name,
        email: data.email,
        photoURL: photoURL,
        uid: res.user.uid,
        role: data.workStatus,
        createdAt: new Date(),
      };

      const dbRes = await axiosSecure.post("/users", userInfo);

      if (!dbRes.data.success) {
        throw new Error("DB save failed");
      }

      toast.success(`Welcome ${data.name}`);
      navigate(from, { replace: true });
      reset();
    } catch (error) {
      console.log(error);
      toast.error(`${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Extract onChange from react-hook-form to combine it with our custom handleImageChange
  const { onChange: rhfOnChange, ...restPhotoRegister } = register("photo", {
    required: "Photo is required",
    validate: {
      lessThan2MB: (files) =>
        !files ||
        !files[0] ||
        files[0].size < 2 * 1024 * 1024 ||
        "Max 2MB allowed",
      isPNG: (files) =>
        !files ||
        !files[0] ||
        files[0].type === "image/png" ||
        "Only PNG allowed",
    },
  });

  return (
    <div className="">
      <div className="w-full max-w-md p-6 bg-gradient-to-r from-blue-400 to-purple-300 hover:shadow-2xl hover:shadow-green-950 duration-150 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-center my-3 text-[#0e2c4e]">
          Welcome to Dev Hire
        </h3>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          {/* Photo Upload Section */}
          <div className="flex flex-col items-center justify-center mb-4">
            <label className="block mb-2 text-[#0e2c4e] font-semibold text-center">
              Profile Photo
            </label>

            <div className="relative w-24 h-24 mb-2">
              {preview ? (
                <>
                  {/* Image Preview */}
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                  />
                  {/* Cancel button */}
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-lg hover:bg-red-600 transition">
                    ✕
                  </button>
                </>
              ) : (
                <>
                  {/* ✅ Label acting as the clickable upload button */}
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer w-full h-full rounded-full flex flex-col items-center justify-center bg-white/50 border-2 border-dashed border-blue-500 hover:bg-white/80 transition overflow-hidden relative">
                    <span className="text-red-500 absolute top-1/2 font-bold z-20">
                      No Photo
                    </span>
                    <img
                      src={imageIcon}
                      alt="Upload icon"
                      className="w-10 h-10 object-cover opacity-70"
                    />
                  </label>
                </>
              )}
            </div>

            {/* ✅ Hidden File Input */}
            <input
              id="photo-upload"
              type="file"
              accept="image/png"
              className="hidden"
              {...restPhotoRegister}
              onChange={(e) => {
                handleImageChange(e); // Run custom logic (preview, size validation)
                rhfOnChange(e); // Run react-hook-form logic
              }}
            />

            {fileError && (
              <p className="text-red-500 text-sm text-center">{fileError}</p>
            )}
            {errors.photo && (
              <p className="text-red-500 text-sm text-center">
                {errors.photo.message}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block mb-1 text-[#0e2c4e] font-semibold">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 border rounded-md border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

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

          <WorkStatus register={register} setValue={setValue} />

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
              "Register"
            )}
          </button>
        </form>

        <div className="mt-4 border-t border-gray-400/30 pt-4">
          <SocialLogin />
        </div>

        <div className="my-3">
          <p className="text-[16px] font-bold">
            Already have an account ? please{" "}
            <Link
              state={location?.state}
              className="text-secondary hover:border-b-2"
              to={"/auth/login"}>
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
