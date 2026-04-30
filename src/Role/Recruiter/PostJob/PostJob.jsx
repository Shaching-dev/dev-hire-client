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
import React from "react";
// Alias react-select to ReactSelect
import ReactSelect from "react-select";

const skillOptions = [
  { value: "mongodb", label: "MongoDB" },
  { value: "express", label: "Express.js" },
  { value: "react", label: "React" },
  { value: "node", label: "Node.js" },
];

const PostJob = () => {
  return (
    <div className="min-h-screen px-3 ">
      <div className="mt-20 flex flex-col gap-6">
        {/* Basic Inputs */}
        <div className="flex w-full gap-5">
          <Input className="w-full" type="text" placeholder="Job Title" />
          <Input className="w-full" type="text" placeholder="Company name" />
        </div>

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
            options={skillOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select skills..."
            // Adding styles to match your theme better (optional)
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "8px",
                borderColor: "#e2e8f0", // Adjust based on your Tailwind theme
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
