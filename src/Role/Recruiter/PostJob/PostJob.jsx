import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";

const PostJob = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const handleJobPost = async (data) => {
    const formattedData = {
      ...data,
      techStack: data.techStack.split(",").map((t) => t.trim()),
    };

    Swal.fire({
      title: "Post this job?",
      text: "Make sure all details are correct before publishing.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, publish it 🚀",
      cancelButtonText: "Review again",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "px-5 py-2 rounded-lg",
        cancelButton: "px-5 py-2 rounded-lg",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.post("/jobs", formattedData);
          //   console.log(res.data);

          if (res.data.success) {
            Swal.fire({
              title: "Job Posted!",
              text: "Your job is now live and visible to developers.",
              icon: "success",
              confirmButtonColor: "#2563eb",
              confirmButtonText: "Go to Dashboard",
              customClass: {
                popup: "rounded-2xl",
                confirmButton: "px-5 py-2 rounded-lg",
              },
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Post a Job 🚀
          </h2>
          <p className="text-gray-500 mt-1">
            Find the best developers for your team
          </p>
        </div>

        <form onSubmit={handleSubmit(handleJobPost)} className="space-y-8">
          {/* 🔹 Basic Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Basic Information
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Title */}
              <div>
                <label className="label">Job Title</label>
                <input
                  {...register("title", { required: "Required" })}
                  className="input"
                  placeholder="Frontend Developer (React)"
                />
                {errors.title && (
                  <p className="error">{errors.title.message}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="label">Company Name</label>
                <input
                  {...register("companyName", { required: "Required" })}
                  className="input"
                />
              </div>

              {/* Job Type */}
              <div>
                <label className="label">Job Type</label>
                <select {...register("jobType")} className="input">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>

              {/* Work Mode */}
              <div>
                <label className="label">Work Mode</label>
                <select {...register("workMode")} className="input">
                  <option>Remote</option>
                  <option>On-site</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          {/* 🔹 Salary */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Salary Details
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="number"
                {...register("minSalary")}
                className="input"
                placeholder="Min Salary"
              />
              <input
                type="number"
                {...register("maxSalary")}
                className="input"
                placeholder="Max Salary"
              />
            </div>
          </div>

          {/* 🔹 Developer Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Developer Requirements
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Tech */}
              <div className="md:col-span-2">
                <label className="label">Tech Stack</label>
                <input
                  {...register("techStack", { required: "Required" })}
                  className="input"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="label">Experience Level</label>
                <select {...register("experienceLevel")} className="input">
                  <option>Junior</option>
                  <option>Mid</option>
                  <option>Senior</option>
                </select>
              </div>

              <div>
                <label className="label">Years of Experience</label>
                <input
                  {...register("experienceYears")}
                  className="input"
                  placeholder="e.g. 2+ years"
                />
              </div>
            </div>
          </div>

          {/* 🔹 Description */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Job Description
            </h3>

            <textarea
              {...register("description", { required: "Required" })}
              rows="6"
              className="input"
              placeholder="Write job responsibilities, requirements..."></textarea>
          </div>

          {/* 🔹 Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition">
              Post Job
            </button>
          </div>
        </form>
      </div>

      {/* Reusable styles */}
      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          padding: 10px 12px;
          border-radius: 10px;
          outline: none;
          transition: 0.2s;
        }
        .input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
        }
        .label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          color: #374151;
        }
        .error {
          color: red;
          font-size: 12px;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
};

export default PostJob;
