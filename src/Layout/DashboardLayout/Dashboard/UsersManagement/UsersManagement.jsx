import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import { BiSolidTrashAlt } from "react-icons/bi";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.data;
    },
  });

  const handleUserDelete = (user) => {
    Swal.fire({
      title: `Delete ${user?.displayName}?`,
      text: `This action cannot be undone. ${user.email} will be permanently removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/users/${user._id}`);
          Swal.fire({
            title: "Deleted!",
            text: `${user?.displayName} has been removed successfully.`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          refetch();
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text:
              error?.response?.data?.message ||
              error.message ||
              "Failed to delete user",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50  p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-500">
            Users Management
          </h2>
          <div className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300">
            Total Users:{" "}
            <span className="text-primary text-2xl font-bold">
              {users.length}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-green-600"></span>
          </div>
        )}

        {/* Table / Card View */}
        {!isLoading && (
          <>
            {/* Desktop & Tablet Table */}
            <div className="hidden md:block overflow-x-auto rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <table className="table w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="py-4 px-6 text-left font-semibold">SL</th>
                    <th className="py-4 px-6 text-left font-semibold">User</th>
                    <th className="py-4 px-6 text-left font-semibold">Role</th>
                    <th className="py-4 px-6 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user, index) => (
                    <tr
                      key={user._id || index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-500 dark:text-gray-400">
                        {index + 1}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12 ring-2 ring-green-100 dark:ring-green-900">
                              <img
                                src={
                                  user?.photoURL ||
                                  "https://via.placeholder.com/150"
                                }
                                alt={user?.displayName}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {user?.displayName || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="badge badge-lg badge-outline badge-success font-medium">
                          {user.role ? user.role.toUpperCase() : "USER"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleUserDelete(user)}
                          className="btn btn-ghost btn-circle text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-all"
                          title="Delete User">
                          <BiSolidTrashAlt size={22} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {users.map((user, index) => (
                <div
                  key={user._id || index}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-14 w-14">
                          <img
                            src={
                              user?.photoURL ||
                              "https://via.placeholder.com/150"
                            }
                            alt={user?.displayName}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-lg text-gray-900 dark:text-white">
                          {user?.displayName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleUserDelete(user)}
                      className="text-red-500 hover:text-red-600 p-2 -mr-2 transition-colors">
                      <BiSolidTrashAlt size={24} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Role</div>
                    <span className="badge badge-success badge-outline font-medium px-4 py-1.5">
                      {user.role ? user.role.toUpperCase() : "USER"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && users.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
