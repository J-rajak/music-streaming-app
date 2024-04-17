import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { useDeleteUserMutation, useGetUsersQuery } from "../Users/userApiSlice";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

const UsersPageComponent = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const { isAuthenticated } = useSelector((state) => state.auth);

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
      <h1 className="text-white mb-4">Users</h1>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">NAME</th>
              <th className="px-4 py-2 text-left">EMAIL</th>
              <th className="px-4 py-2 text-left">ADMIN</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-white">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2">{user._id}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">
                  <a
                    href={`mailto:${user.email}`}
                    className="text-white hover:underline"
                  >
                    {user.email}
                  </a>
                </td>
                <td className="px-4 py-2">
                  {user.isAdmin ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </td>
                <td className="px-4 py-2">
                  {!user.isAdmin && (
                    <div className="flex">
                      <LinkContainer
                        to={`/admin/user/${user._id}`}
                        className="mr-2"
                      >
                        <Button variant="light" className="btn-sm">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash className="text-white" />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  ) : null;
};

export default UsersPageComponent;
