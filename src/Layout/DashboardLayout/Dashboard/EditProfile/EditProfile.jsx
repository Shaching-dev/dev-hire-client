import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure/useAxiosSecure";
import Jobditor from "@/Role/Recruiter/JobEditor/Jobditor";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import axios from "axios";

const EditProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const fileInputRef = useRef(null);

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ─── Fetch profile ─────────────────────────────────
  const { data, isLoading } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data?.data || [];
    },
    enabled: !!user?.email,
  });

  // ─── Fetch skills ──────────────────────────────────
  const { data: skills = [], isLoading: skillsLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await axiosSecure.get("/skills");
      return res.data || [];
    },
  });

  const skillOptions = useMemo(
    () => skills.map((s) => ({ value: s.value, label: s.label })),
    [skills],
  );

  // ─── Form ──────────────────────────────────────────
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      skills: [],
      description: "",
    },
  });

  const profile = data?.[0] ?? null;

  // ─── Reset form when ready ─────────────────────────
  useEffect(() => {
    if (!profile || skillOptions.length === 0) return;

    const preselected = Array.isArray(profile.skills)
      ? skillOptions.filter((opt) => profile.skills.includes(opt.value))
      : [];

    reset({
      skills: preselected,
      description: profile.description || "",
    });
  }, [profile, skillOptions, reset]);

  // ─── Loading ───────────────────────────────────────
  if (isLoading || skillsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0d1f35]" />
      </div>
    );
  }

  // ─── Resume Validation ─────────────────────────────
  const validateAndSetResume = (file) => {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setResumeError("Only PDF or DOC/DOCX files are allowed.");
      setResumeFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setResumeError("File size must be under 10MB.");
      setResumeFile(null);
      return;
    }

    setResumeError("");
    setResumeFile(file);
  };

  // ✅ FIX: Read from event properly and reset input value
  //    so the same file can be re-selected after removal
  const handleResumeChange = (e) => {
    const file = e.target.files?.[0] ?? null;

    // Reset the input value immediately so re-selecting the same
    // file still fires onChange next time
    e.target.value = "";

    validateAndSetResume(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    validateAndSetResume(file);
  };

  // ✅ FIX: Also clear the ref value on remove so user can re-upload
  const removeResume = () => {
    setResumeFile(null);
    setResumeError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // -------------------------------

  const uploadResumeToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_present");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dldvozuht/raw/upload", // 🔥 IMPORTANT (raw)
      formData,
    );

    return res.data.secure_url;
  };

  // ─── Submit ────────────────────────────────────────
  const handleProfileUpdate = async (formData) => {
    if (!profile?._id) return;

    if (!resumeFile && !profile?.resumeUrl) {
      setResumeError("Please upload your resume.");
      return;
    }

    setIsSubmitting(true);

    try {
      let resumeUrl = profile?.resumeUrl || "";

      // 🔥 STEP 1: Upload if new file exists
      if (resumeFile) {
        resumeUrl = await uploadResumeToCloudinary(resumeFile);
        console.log("Uploaded URL:", resumeUrl);
      }

      // 🔥 STEP 2: Prepare clean payload
      const payload = {
        skills: formData.skills?.map((s) => s.value) || [],
        description: formData.description || "",
        resumeUrl, // ✅ NOT file anymore
      };

      console.log("Final Payload:", payload);

      // // 🔥 STEP 3: Send to backend
      const res = await axiosSecure.patch(`/users/${profile._id}`, payload);
      console.log(res.data);

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Select Styles ─────────────────────────────────
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "12px",
      borderColor: errors.skills
        ? "#ef4444"
        : state.isFocused
          ? "#0d1f35"
          : "#e2e8f0",
      boxShadow: "none",
      backgroundColor: "#f8fafc",
      minHeight: "44px",
    }),
  };

  // ─── UI ────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-[#0d1f35]">Edit Profile</h2>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <img
              src={user?.photoURL || "https://via.placeholder.com/80"}
              className="w-20 h-20 rounded-full"
              alt="avatar"
            />
            <div>
              <p>{profile?.displayName || user?.displayName}</p>
              <p className="text-sm text-gray-400">
                {profile?.email || user?.email}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <form onSubmit={handleSubmit(handleProfileUpdate)} className="space-y-6">
        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <Controller
              name="skills"
              control={control}
              rules={{
                validate: (val) =>
                  val?.length > 0 || "At least one skill is required",
              }}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  isMulti
                  options={skillOptions}
                  placeholder="Select skills..."
                  styles={selectStyles}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                />
              )}
            />
            {errors.skills && (
              <p className="text-red-500 text-xs mt-1">
                {errors.skills.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Controller
              name="description"
              control={control}
              rules={{
                required: "Description required",
                validate: (val) =>
                  val?.replace(/<[^>]+>/g, "").trim().length > 10 ||
                  "Too short",
              }}
              render={({ field }) => (
                <Jobditor {...field} value={field.value || ""} />
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Resume */}
        <Card>
          <CardHeader>
            <CardTitle>Resume</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* ✅ FIX: accept attribute added so browser pre-filters,
                and the input is always rendered (never conditionally
                removed) so the ref is always valid */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={handleResumeChange}
            />

            {/* Drop zone — only shown when no file is selected */}
            {!resumeFile && (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                className={`border-dashed border-2 rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? "border-[#0d1f35] bg-slate-100"
                    : "border-slate-300 hover:border-[#0d1f35] hover:bg-slate-50"
                }`}
              >
                <p className="text-slate-500 text-sm">
                  Drag & drop your resume here, or{" "}
                  <span className="text-[#0d1f35] font-semibold underline">
                    browse
                  </span>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  PDF, DOC, DOCX · max 10 MB
                </p>
              </div>
            )}

            {/* ✅ Selected file preview with remove button */}
            {resumeFile && (
              <div className="flex items-center justify-between border rounded-xl px-4 py-3 bg-slate-50">
                <div className="flex items-center gap-2 text-sm text-slate-700 truncate">
                  <span>📄</span>
                  <span className="truncate max-w-xs">{resumeFile.name}</span>
                  <span className="text-slate-400 text-xs whitespace-nowrap">
                    ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={removeResume}
                  className="ml-4 text-red-500 hover:text-red-700 text-xs font-medium shrink-0"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Show existing resume URL if no new file picked */}
            {!resumeFile && profile?.resumeUrl && (
              <p className="text-xs text-slate-500">
                Current resume:{" "}
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0d1f35] underline"
                >
                  View
                </a>
              </p>
            )}

            {resumeError && (
              <p className="text-red-500 text-xs">{resumeError}</p>
            )}
          </CardContent>
        </Card>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
