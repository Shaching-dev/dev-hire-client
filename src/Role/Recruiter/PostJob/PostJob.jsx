import { Input } from "@/Components/ui/input";
import {
  Select as ShadcnSelect, // Renamed to avoid conflict
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import React, { useState } from "react";
// Alias react-select to ReactSelect
import ReactSelect from "react-select";
import Jobditor from "../JobEditor/Jobditor";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure/useAxiosSecure";
import { useForm } from "react-hook-form";
import { ImageIcon } from "lucide-react";

const PostJob = () => {
  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState("");
  const [description, setDescription] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    setValue,
    register,
    formState: { errors },
  } = useForm();

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

  const handleSubmit = () => {
    console.log(description);
  };

  const { data: skills = [] } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await axiosSecure.get("/skills");
      return res.data;
    },
  });

  const skillOptions = skills.map((skill) => ({
    value: skill.value,
    label: skill.label,
  }));

  const { onChange: rhfOnChange, ...restPhotoRegister } = register("photo", {
    required: "Photo is required",
    validate: {
      lessThan2MB: (files) =>
        !files ||
        !files[0] ||
        files[0].size < 4 * 1024 * 1024 ||
        "Max 2MB allowed",
    },
  });

  return (
    <div className="min-h-screen px-3 ">
      <div className="mt-20 flex flex-col gap-6">
        <div className="flex flex-col items-center">
          <label className="block mb-3 text-[#0e2c4e] font-semibold text-lg">
            Upload Company Logo
          </label>

          <div className="relative w-28 h-28 md:w-32 md:h-32">
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

        {/* Basic Inputs */}
        <div className="flex w-full gap-5">
          <Input className="w-full" type="text" placeholder="Job Title" />
          <Input className="w-full" type="text" placeholder="Company name" />
        </div>

        <Jobditor value={description} onChange={setDescription} />
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit Job
        </button>

        {/* Shadcn UI Select - Good for Single Choice (e.g. Job Type) */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Workplace Type</label>
          <ShadcnSelect>
            <SelectTrigger className="w-full ">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Workplace</SelectLabel>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectGroup>
            </SelectContent>
          </ShadcnSelect>
        </div>

        {/* React Select - Good for Multi-Select (e.g. Skills) */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Required Skills</label>
          <ReactSelect
            isMulti
            options={skillOptions} // Use the transformed options
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select skills..."
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "8px",
                borderColor: "#e2e8f0",
                padding: "2px",
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostJob;
