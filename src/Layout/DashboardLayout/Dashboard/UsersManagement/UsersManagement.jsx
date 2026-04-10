import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.data;
    },
  });

  //   console.log(users);

  return (
    <div>
      <h3 className="text-xl md:text-3xl font-bold text-green-500 text-center my-5">
        Deve Hire Total users :{" "}
        <span className="text-primary">{users.length}</span>
      </h3>
    </div>
  );
};

export default UsersManagement;
