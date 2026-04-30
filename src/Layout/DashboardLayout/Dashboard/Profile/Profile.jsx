import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: profileData = [], isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data.data; // ← this is still an array from your backend
    },
  });

  // Extract the single user object (your API always returns array)
  const profile = profileData[0] || {};

  console.log(profile);

  // Format join date nicely
  const joinDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto ">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Profile Header */}
        <div className="h-40 bg-gradient-to-r from-blue-600 to-purple-600"></div>

        <div className="relative px-8 pb-8">
          {/* Avatar */}
          <div className="flex justify-center -mt-20">
            <img
              src={profile.photoURL || "https://via.placeholder.com/160"}
              alt={profile.displayName}
              className="w-40 h-40 rounded-2xl object-cover border-4 border-white shadow-xl"
            />
          </div>

          {/* Name & Role */}
          <div className="text-center mt-4">
            <h1 className="text-4xl font-bold text-gray-800">
              {profile.displayName?.trim() || "User"}
            </h1>
            <div className="flex justify-center mt-3">
              <span className="px-6 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full capitalize shadow-inner">
                {profile.role || "user"}
              </span>
            </div>
            <p className="text-gray-500 mt-2">{profile.email}</p>
          </div>

          {/* Info Cards */}
          <div className="my-5 flex justify-center items-center gap-6">
            {/* Joined Date */}
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                Member Since
              </p>
              <p className="text-xl font-semibold text-gray-700">{joinDate}</p>
            </div>
          </div>

          {/* Extra space for future buttons */}
          <div className="my-5 flex justify-center">
            <Link
              to={`/dashboard/edit-profile`}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-2xl transition-all shadow-lg flex items-center gap-2"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
