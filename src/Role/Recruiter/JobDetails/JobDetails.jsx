import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import useAuth from "@/hooks/useAuth/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure/useAxiosSecure";
import FirebaseLoading from "@/utils/FirebaseLoading/FirebaseLoading";
import ApplyModal from "@/utils/Modal/ApplyModal";
import AuthModal from "@/utils/Modal/AuthModal";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const JobDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // state -----

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const { data: profileData = [] } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data.data;
    },
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["job-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/jobs/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <FirebaseLoading />;

  const job = data?.data || {};

  const handleJobDelete = (job) => {
    Swal.fire({
      title: "Delete this post?",
      text: "You are confirming to delete the post",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "red", // green
      cancelButtonColor: "#6b7280", // gray
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/jobs/${job._id}`);
          //   console.log(res.data);
          if (res.data?.data.deletedCount) {
            Swal.fire({
              title: "Your job post has been deleted",
              text: "Confirm",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            refetch();
            navigate(`/jobs`);
          }
        } catch (error) {
          console.log(error);

          Swal.fire({
            title: "Something went wrong",
            text: "Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  const profile = profileData[0];

  // console.log(user);

  const handleApplyJobs = (job) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setSelectedJob(job);
    setShowApplyModal(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* 🔷 Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{job.jobTitle}</h1>
        <p className="text-lg text-pink-600 font-medium mt-1">
          {job.companyName}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
          <span>
            📍 {job.location} ({job.workplaceType})
          </span>
          <span>💼 {job.jobType}</span>
          <span>⭐ {job.experienceLevel} level</span>
          <span>
            💰 {job.currency} {job.salaryMin} - {job.salaryMax} / month
          </span>
        </div>

        <p className="text-gray-400 text-sm mt-2">
          Posted on {new Date(job.postedAt).toLocaleDateString()}
        </p>
      </div>

      {/* 🔷 Skills */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border mb-6">
        <h2 className="text-xl font-semibold mb-4">Required Skills</h2>

        <div className="flex flex-wrap gap-2">
          {job.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill.label || skill.value}
            </span>
          ))}
        </div>
      </div>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />

      <ApplyModal
        open={showApplyModal}
        onOpenChange={setShowApplyModal}
        job={selectedJob}
        user={user}
        profile={profile}
      />

      {/* 🔷 Description */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border mb-6">
        <h2 className="text-xl font-semibold mb-4">Job Description</h2>

        <div
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </div>

      {/* 🔷 Recruiter Info */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={job.recruiterPhoto}
            alt={job.recruiterName}
            className="w-14 h-14 rounded-full border"
          />
          <div>
            <p className="font-semibold text-gray-900">{job.recruiterName}</p>
            <p className="text-gray-500 text-sm">{job.recruiterEmail}</p>
          </div>
        </div>

        {/* --------------------------------- */}
        <button
          onClick={() => handleApplyJobs(job)}
          className="bg-black text-white px-3 py-2 rounded-lg font-semibold hover:bg-black/30 transition cursor-pointer"
        >
          Apply
        </button>
        {/* ----------------- */}
      </div>

      <div className="text-center mt-5">
        <button
          onClick={() => handleJobDelete(job)}
          className="bg-red-700 text-white px-3 py-2 rounded-lg font-semibold hover:bg-red-800 transition cursor-pointer"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
