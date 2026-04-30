import useAuth from "@/hooks/useAuth/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router";

const MyJobs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ["my-jobs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/jobs?email=${user?.email}`);
      return res.data;
    },
  });
  const jobs = data || [];
  console.log(jobs);

  const stripHtml = (html) => {
    return html?.replace(/<[^>]*>?/gm, "") || "";
  };

  return (
    <div>
      <div>
        <h3 className="text-center text-2xl text-primary font-bold">
          My Total Jobs :{" "}
          <span className="text-green-600">({jobs.length})</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header: Job Title & Company */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                  {job.jobTitle}
                </h3>
                <p className="text-pink-600 font-medium">{job.companyName}</p>
              </div>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase">
                {job.jobType}
              </span>
            </div>

            {/* Location & Details */}
            <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <span>
                  📍 {job.location} ({job.workplaceType})
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>💼 {job.experienceLevel} level</span>
              </div>
            </div>

            {/* Cleaned Description */}
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
              {stripHtml(job.description)}
            </p>

            {/* Salary */}
            <div className="mb-6">
              <span className="text-gray-900 font-bold text-lg">
                {job.currency} {job.salaryMin} - {job.salaryMax}
              </span>
              <span className="text-gray-500 text-sm ml-1">/ month</span>
            </div>

            {/* Footer: Recruiter & Action */}
            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-2">
                <img
                  src={job.recruiterPhoto}
                  alt={job.recruiterName}
                  className="w-8 h-8 rounded-full border"
                />
                <div className="text-xs">
                  <p className="font-semibold text-gray-800 leading-none">
                    {job.recruiterName}
                  </p>
                  <p className="text-gray-500">
                    Posted {new Date(job.postedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-green-800 transition-colors">
                <Link to={`/jobs-details/${job._id}`}>View Details</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;
