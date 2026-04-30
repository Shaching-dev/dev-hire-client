import useAxiosSecure from "@/hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ManageRecruiter = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["recruiter"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?role=recruiter`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <h3 className="text-3xl text-center min-h-screen">Page is loading</h3>
    );
  }

  const recruiters = data?.data || [];
  //   console.log(recruiters);

  return (
    <div>
      <h3 className="text-2xl text-primary text-center mb-10 font-bold">
        Total Recruiter :
        <span className="text-green-600">({recruiters.length})</span>
      </h3>
    </div>
  );
};

export default ManageRecruiter;
