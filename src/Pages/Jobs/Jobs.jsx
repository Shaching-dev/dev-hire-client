import useAxiosSecure from "@/hooks/useAxiosSecure/useAxiosSecure";
import FirebaseLoading from "@/utils/FirebaseLoading/FirebaseLoading";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Jobs = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/jobs");
      return res.data;
    },
  });

  if (isLoading) {
    return <FirebaseLoading />;
  }

  const jobs = data || [];

  // Helper function to remove HTML tags
  const stripHtml = (html) => {
    return html?.replace(/<[^>]*>?/gm, "") || "";
  };

  const handleShowJobDetails = (job) => {
    console.log(job);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Available Opportunities
        </h1>
        <p className="text-gray-500 mt-2">
          Find your next career move at Dev Hire
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer ">
        {jobs.map((job) => (
          <div
            onClick={() => handleShowJobDetails(job)}
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
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-pink-600 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
