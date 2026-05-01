import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ApplyModal = ({ open, onOpenChange, job, user, profile }) => {
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = () => {
    if (!coverLetter.trim()) {
      alert("Please write a cover letter");
      return;
    }

    if (!profile?.resumeUrl) {
      alert("Please upload your resume first");
      return;
    }

    const applicationData = {
      jobId: job?._id,
      applicantId: profile?._id,
      applicantEmail: profile?.email,
      applicantName: profile?.displayName,
      resumeUrl: profile?.resumeUrl,
      coverLetter,
    };

    console.log("Submitting:", applicationData);

    onOpenChange(false); // close modal
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply for {job?.title || "Job"}</DialogTitle>
        </DialogHeader>

        {/* Name */}
        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
          className="w-full border rounded-md p-2 mb-3"
        />

        {/* Email */}
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="w-full border rounded-md p-2 mb-3"
        />

        {/* Resume */}
        {profile?.resumeUrl ? (
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 text-sm underline mb-3 block"
          >
            View Resume
          </a>
        ) : (
          <p className="text-red-500 text-sm mb-3">No resume uploaded</p>
        )}

        {/* Cover Letter */}
        <textarea
          placeholder="Write your cover letter..."
          className="w-full border rounded-md p-2 min-h-[120px]"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Apply Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyModal;
