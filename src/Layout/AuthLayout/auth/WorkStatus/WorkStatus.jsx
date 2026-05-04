import React, { useState } from "react";
import { FaBriefcase, FaUsers } from "react-icons/fa";

const WorkStatus = ({ register, setValue }) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (value) => {
    setSelected(value);
    setValue("workStatus", value); // react hook form set value
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">
        Work Status <span className="text-red-500">*</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Job Seeker */}
        <div
          onClick={() => handleSelect("developer")}
          className={`cursor-pointer border rounded-xl p-2 flex items-center gap-4 transition-all
          ${
            selected === "developer"
              ? "border-green-600 bg-green-50"
              : "border-gray-300"
          }`}
        >
          <FaBriefcase className="text-3xl text-green-600" />

          <div>
            <h3 className="font-semibold text-lg">I’m looking for a job</h3>
            <p className="text-gray-500 text-sm">
              Looking great opportunity for my career
            </p>
          </div>
        </div>

        {/* Recruiter */}
        <div
          onClick={() => handleSelect("recruiter")}
          className={`cursor-pointer border rounded-xl p-2 flex items-center gap-4 transition-all
          ${
            selected === "recruiter"
              ? "border-green-600 bg-green-50"
              : "border-gray-300"
          }`}
        >
          <FaUsers className="text-3xl text-green-600" />

          <div>
            <h3 className="font-semibold text-lg">I’m hiring (Recruiter)</h3>
            <p className="text-gray-500 text-sm">
              Looking for talented developers
            </p>
          </div>
        </div>
      </div>

      {/* Hidden input for react hook form */}
      <input type="hidden" {...register("workStatus", { required: true })} />
    </div>
  );
};

export default WorkStatus;
