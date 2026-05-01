import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  FiEdit3,
  FiMail,
  FiCalendar,
  FiFileText,
  FiAward,
} from "react-icons/fi"; // Added for extra professional touch

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: profileData = [], isLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data.data;
    },
  });

  const profile = profileData[0] || {};

  const joinDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "N/A";

  const completionFields = [
    profile.displayName,
    profile.photoURL,
    profile.description,
    profile.skills?.length > 0,
    profile.resumeUrl,
  ];

  const completion =
    (completionFields.filter(Boolean).length / completionFields.length) * 100;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header/Cover Section */}
          <div className="h-48 bg-[#0f172a] relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            {/* Elegant Green Accent line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500"></div>
          </div>

          <div className="relative px-6 md:px-12 pb-12">
            {/* Avatar - Set with Green Background & Professional Border */}
            {/* Avatar & Header Section */}
            <div className="relative flex flex-col md:flex-row items-center md:items-end px-6 md:px-12 -mt-20 md:-mt-24 mb-6 gap-6">
              {/* Avatar Container */}
              <div className="shrink-0 p-1.5 bg-emerald-500 rounded-3xl shadow-2xl">
                <img
                  src={
                    profile.photoURL ||
                    `https://ui-avatars.com/api/?name=${profile.displayName || "User"}&background=10b981&color=fff`
                  }
                  alt="profile"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-[22px] object-cover border-4 border-white bg-emerald-50"
                />
              </div>

              {/* Name & Role Container */}
              <div className="text-center md:text-left pb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                  {profile.displayName || "Professional User"}
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-2 mt-2 md:mt-1">
                  <span className="px-3 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-md border border-emerald-100">
                    {profile.role || "Member"}
                  </span>
                  <span className="text-slate-400 text-sm flex items-center gap-1">
                    <FiMail className="inline" /> {profile.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Completion Bar */}
            <div className="mb-10 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-slate-700">
                  Profile Strength
                </span>
                <span className="text-sm font-bold text-emerald-600">
                  {Math.round(completion)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-700 ease-out"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column: Stats/Meta */}
              <div className="md:col-span-1 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <FiCalendar />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                        Joined
                      </p>
                      <p className="text-sm font-medium">{joinDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <FiFileText />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                        Resume
                      </p>
                      {profile.resumeUrl ? (
                        <a
                          href={profile.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-emerald-600 hover:text-emerald-700 underline underline-offset-4"
                        >
                          View Document
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-slate-400 italic">
                          Not Provided
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FiAward className="text-emerald-500" /> Key Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills?.length > 0 ? (
                      profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-lg shadow-sm"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        Add skills to stand out
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Bio */}
              <div className="md:col-span-2">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-h-[200px]">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">
                    Professional Summary
                  </h3>
                  {profile.description ? (
                    <div
                      className="text-slate-600 leading-relaxed text-sm md:text-base prose prose-slate"
                      dangerouslySetInnerHTML={{ __html: profile.description }}
                    />
                  ) : (
                    <p className="text-slate-400 italic text-sm">
                      Write a compelling bio to attract more opportunities.
                    </p>
                  )}
                </div>

                <div className="mt-8 flex justify-end">
                  <Link
                    to="/dashboard/edit-profile"
                    className="flex items-center gap-2 px-6 py-3 bg-[#0f172a] hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-900/10"
                  >
                    <FiEdit3 /> Update Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
