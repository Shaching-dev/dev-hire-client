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

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Name</th>
                <th>User Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={user?.photoURL} alt="users-photo" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.displayName}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.role || "user"}</td>
                  <td>
                    <button className="btn btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
