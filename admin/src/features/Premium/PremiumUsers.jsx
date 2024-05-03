import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { useDeleteUserMutation, useGetUsersQuery } from "../Users/userApiSlice";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

const PremiumUsers = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const selectedTheme = useSelector((state) => state.theme);

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return isAuthenticated ? (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-white mb-4">Users</h1>
        </div>
        <div className="flex-grow">
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <Table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2">Profile</th>
                  <th className="px-4 py-2">NAME</th>
                  <th className="px-4 py-2">EMAIL</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-white">
                {users.map(
                  (user) =>
                    user.isPremium && (
                      <tr key={user._id}>
                        <td className="px-4 py-2 flex justify-center items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img
                              src={user.image} // Assuming user.image is the URL of the user's image
                              alt={user.username}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-2 text-center">
                          {user.username}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </>
  ) : null;
};

export default PremiumUsers;
