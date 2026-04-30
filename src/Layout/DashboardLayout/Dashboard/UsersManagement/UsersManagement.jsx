import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import { BiSolidTrashAlt } from "react-icons/bi";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const limit = 3;

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  // ✅ Correct data extraction
  const users = data?.data || [];
  console.log(users);

  const totalUsers = data?.total || 0;
  const totalPages = data?.totalPages || 1;

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

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between flex-col md:flex-row  items-center  mb-8">
          <h2 className="text-3xl font-bold text-green-600">
            Users Management
          </h2>

          <div className="text-lg font-semibold text-gray-700">
            Total Users:
            <span className="text-primary text-2xl ml-2 font-bold">
              {totalUsers}
            </span>
          </div>
        </div>

        <div className="text-center mb-10">
          <input
            type="text"
            placeholder="Search User"
            className="input input-primary py-5 rounded-full"
          />
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-green-600"></span>
          </div>
        )}

        {/* Table */}
        {!isLoading && (
          <>
            <div className="overflow-x-auto bg-white rounded-xl shadow border">
              <table className="table w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th>SL</th>
                    <th>User</th>
                    <th>Role</th>
                    <th>Created</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{(page - 1) * limit + index + 1}</td>

                      <td>
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              user?.photoURL ||
                              "https://via.placeholder.com/150"
                            }
                            className="w-10 h-10 rounded"
                          />
                          <div>
                            <p className="font-semibold">
                              {user?.displayName || "N/A"}
                            </p>
                            <p className="text-sm">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="badge badge-success badge-outline">
                          {user.role?.toUpperCase() || "USER"}
                        </span>
                      </td>

                      <td>{formatDate(user.createdAt)}</td>

                      <td className="text-center">
                        <button
                          onClick={() => handleUserDelete(user)}
                          className="text-red-500"
                        >
                          <BiSolidTrashAlt size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Pagination */}
            <div className="flex justify-center mt-6 gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="btn"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`btn ${page === i + 1 ? "btn-primary" : ""}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="btn"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Empty */}
        {!isLoading && users.length === 0 && (
          <div className="text-center py-20">
            <p>No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
