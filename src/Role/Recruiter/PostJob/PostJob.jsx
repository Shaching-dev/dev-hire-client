import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { ImageIcon, ArrowRight, Save } from "lucide-react";
import React, { useState } from "react";
import ReactSelect from "react-select";
import Jobditor from "../JobEditor/Jobditor";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure/useAxiosSecure";

const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
];

const WORKPLACE_TYPES = [
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
];

const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
  { value: "lead", label: "Lead / Principal" },
];

const CURRENCIES = ["USD", "BDT", "EUR", "GBP", "AED", "INR"];
const STEPS = [
  "Company Info",
  "Job Details",
  "Skills & Requirements",
  "Review & Publish",
];

/* ─── Sub-components declared OUTSIDE PostJob ───────────────────────── */

const Card = ({ title, children }) => (
  <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
    <h2 className="text-sm font-bold uppercase tracking-wide mb-5 flex items-center gap-2 text-[#0d1f35]">
      <span className="block w-0.5 h-4 rounded bg-amber-400" />
      {title}
    </h2>
    {children}
  </div>
);

const FieldWrap = ({ label, error, children }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs">{error.message}</p>}
  </div>
);

// ✅ KEY FIX: Declared outside PostJob, receives control + errors as props
const ShadcnField = ({
  name,
  placeholder,
  options,
  label,
  control,
  errors,
}) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      rules={{ required: `${label} is required` }}
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger className="w-full rounded-xl border-slate-200 bg-slate-50 h-11 text-sm">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              {options.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
    {errors?.[name] && (
      <p className="text-red-500 text-xs">{errors[name].message}</p>
    )}
  </div>
);

/* ─── Main Component ─────────────────────────────────────────────────── */

const PostJob = () => {
  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState("");
  const [description, setDescription] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobTitle: "",
      companyName: "",
      jobType: "",
      workplaceType: "",
      experienceLevel: "",
      currency: "USD",
      salaryMin: "",
      salaryMax: "",
      location: "",
      skills: [],
    },
  });

  const { onChange: rhfOnChange, ...restPhotoRegister } = register("photo", {
    required: "Company logo is required",
    validate: {
      lessThan2MB: (files) =>
        !files?.[0] || files[0].size < 2 * 1024 * 1024 || "Max 2 MB allowed",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setFileError("File must be less than 2 MB");
      return;
    }
    setFileError("");
    setPreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setPreview(null);
    setFileError("");
    setValue("photo", null);
  };

  const { data: skills = [] } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await axiosSecure.get("/skills");
      return res.data;
    },
  });

  const skillOptions = skills.map((s) => ({ value: s.value, label: s.label }));

  const onSubmit = (data) => {
    console.log("Job payload:", { ...data, description });
  };

  return (
    <div className="min-h-screen" style={{ background: "#f0ede8" }}>
      <div className="flex min-h-screen">
        <aside
          className="hidden lg:flex flex-col gap-2 sticky top-0 h-screen p-10 bg-[#0d1f35]"
          style={{ width: 280, flexShrink: 0 }}
        >
          <p className="text-white text-2xl font-extrabold mb-8 tracking-tight">
            Job<span className="text-amber-400">Post</span>
          </p>
          {STEPS.map((step, i) => (
            <div
              key={step}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium"
              style={{
                background: i === 1 ? "rgba(244,163,0,0.12)" : "transparent",
                color:
                  i === 0
                    ? "rgba(255,255,255,0.7)"
                    : i === 1
                      ? "#f4a300"
                      : "rgba(255,255,255,0.35)",
              }}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background:
                    i === 0
                      ? "#22c55e"
                      : i === 1
                        ? "#f4a300"
                        : "rgba(255,255,255,0.08)",
                  color: i <= 1 ? "#0d1f35" : "inherit",
                }}
              >
                {i === 0 ? "✓" : i + 1}
              </span>
              {step}
            </div>
          ))}
        </aside>

        <main className="flex-1 p-6 md:p-12 overflow-y-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-[#0d1f35]">
              Post a New Job
            </h1>
            <p className="text-slate-500 text-sm">
              The more specific you are, the better candidates you'll attract.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card title="Company Branding">
              <div className="flex items-center gap-6 mb-6">
                <div className="relative w-24 h-24 flex-shrink-0">
                  {preview ? (
                    <>
                      <img
                        src={preview}
                        alt="Logo preview"
                        className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-xl"
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-xl w-7 h-7 flex items-center justify-center text-sm shadow-md transition"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <label
                      htmlFor="photo-upload"
                      className="cursor-pointer w-full h-full rounded-2xl flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-300 hover:border-[#0d1f35] hover:bg-white transition-all gap-1"
                    >
                      <ImageIcon size={28} className="text-slate-400" />
                      <span className="text-slate-400 text-[11px] font-medium">
                        Upload
                      </span>
                    </label>
                  )}
                </div>
                <div className="text-sm text-slate-500 leading-relaxed">
                  <p className="font-semibold text-slate-700 mb-0.5">
                    Company Logo
                  </p>
                  PNG or JPG, max 2 MB.
                  <br />
                  Square format recommended (200×200px).
                </div>
              </div>
              <input
                id="photo-upload"
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                {...restPhotoRegister}
                onChange={(e) => {
                  handleImageChange(e);
                  rhfOnChange(e);
                }}
              />
              {fileError && (
                <p className="text-red-500 text-xs mb-4">{fileError}</p>
              )}
              {errors.photo && (
                <p className="text-red-500 text-xs mb-4">
                  {errors.photo.message}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FieldWrap label="Job Title" error={errors.jobTitle}>
                  <Input
                    placeholder="e.g. Senior React Developer"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50 text-sm"
                    {...register("jobTitle", {
                      required: "Job title is required",
                    })}
                  />
                </FieldWrap>
                <FieldWrap label="Company Name" error={errors.companyName}>
                  <Input
                    placeholder="e.g. Acme Corp"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50 text-sm"
                    {...register("companyName", {
                      required: "Company name is required",
                    })}
                  />
                </FieldWrap>
              </div>
            </Card>

            <Card title="Job Classification">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ShadcnField
                  name="jobType"
                  label="Job Type"
                  placeholder="Select type"
                  options={JOB_TYPES}
                  control={control}
                  errors={errors}
                />
                <ShadcnField
                  name="workplaceType"
                  label="Workplace"
                  placeholder="Select workplace"
                  options={WORKPLACE_TYPES}
                  control={control}
                  errors={errors}
                />
                <ShadcnField
                  name="experienceLevel"
                  label="Experience Level"
                  placeholder="Select level"
                  options={EXPERIENCE_LEVELS}
                  control={control}
                  errors={errors}
                />
              </div>
            </Card>

            <Card title="Compensation & Location">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Salary Range
                  </label>
                  <div className="flex items-center gap-2">
                    <Controller
                      name="currency"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-24 flex-shrink-0 rounded-xl border-slate-200 bg-slate-50 h-11 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CURRENCIES.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Input
                      type="number"
                      placeholder="Min"
                      min={0}
                      className="h-11 rounded-xl border-slate-200 bg-slate-50 text-sm"
                      {...register("salaryMin")}
                    />
                    <span className="text-slate-400 text-sm flex-shrink-0">
                      —
                    </span>
                    <Input
                      type="number"
                      placeholder="Max"
                      min={0}
                      className="h-11 rounded-xl border-slate-200 bg-slate-50 text-sm"
                      {...register("salaryMax", {
                        validate: (val, formValues) =>
                          !val ||
                          !formValues.salaryMin ||
                          Number(val) >= Number(formValues.salaryMin) ||
                          "Max must be ≥ Min",
                      })}
                    />
                  </div>
                  {errors.salaryMax && (
                    <p className="text-red-500 text-xs">
                      {errors.salaryMax.message}
                    </p>
                  )}
                  <p className="text-slate-400 text-xs">
                    Annual salary. Leave blank if negotiable.
                  </p>
                </div>
                <FieldWrap label="Location" error={errors.location}>
                  <Input
                    placeholder="e.g. Dhaka, Bangladesh or Worldwide"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50 text-sm"
                    {...register("location", {
                      required: "Location is required",
                    })}
                  />
                  <p className="text-slate-400 text-xs mt-1">
                    City, Country — or type 'Worldwide'
                  </p>
                </FieldWrap>
              </div>
            </Card>

            <Card title="Required Skills">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Skills
                </label>
                <Controller
                  name="skills"
                  control={control}
                  rules={{ required: "At least one skill is required" }}
                  render={({ field }) => (
                    <ReactSelect
                      isMulti
                      options={skillOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Search and select skills..."
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          borderRadius: "12px",
                          borderColor: state.isFocused ? "#0d1f35" : "#e2e8f0",
                          boxShadow: state.isFocused
                            ? "0 0 0 3px rgba(13,31,53,0.08)"
                            : "none",
                          backgroundColor: "#f8fafc",
                          padding: "2px 4px",
                          minHeight: "44px",
                          fontSize: "14px",
                        }),
                        multiValue: (base) => ({
                          ...base,
                          backgroundColor: "#0d1f35",
                          borderRadius: "6px",
                        }),
                        multiValueLabel: (base) => ({
                          ...base,
                          color: "#fff",
                          fontSize: "12.5px",
                          padding: "2px 6px",
                        }),
                        multiValueRemove: (base) => ({
                          ...base,
                          color: "rgba(255,255,255,0.6)",
                          borderRadius: "0 6px 6px 0",
                          ":hover": {
                            backgroundColor: "#f4a300",
                            color: "#0d1f35",
                          },
                        }),
                        menu: (base) => ({
                          ...base,
                          borderRadius: "12px",
                          fontSize: "14px",
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "#0d1f35"
                            : state.isFocused
                              ? "#f0f4f8"
                              : "transparent",
                        }),
                      }}
                    />
                  )}
                />
                {errors.skills && (
                  <p className="text-red-500 text-xs">
                    {errors.skills.message}
                  </p>
                )}
              </div>
            </Card>

            <Card title="Job Description">
              <Jobditor value={description} onChange={setDescription} />
            </Card>

            <div className="flex justify-end items-center gap-3 pt-2 pb-8">
              <button
                type="button"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#0d1f35] text-[#0d1f35] text-sm font-semibold hover:bg-[#0d1f35]/5 transition"
              >
                <Save size={15} /> Save Draft
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-sm font-semibold bg-[#0d1f35] text-white hover:bg-amber-400 hover:text-[#0d1f35] transition"
              >
                Publish Job <ArrowRight size={15} />
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default PostJob;
