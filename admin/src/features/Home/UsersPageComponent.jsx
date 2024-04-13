import { useEffect, useState } from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../Users/userApiSlice";
import Message from '../../components/Message';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

const UsersPageComponent = () => {

  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("admin/users/getUsers");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setUserData(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    // <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
    //   <thead className="bg-gray-50">
    //     <tr>
    //       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //         username
    //       </th>
    //       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //         premium
    //       </th>
    //       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //         Actions
    //       </th>
    //     </tr>
    //   </thead>
    //   <tbody className="bg-white divide-y divide-gray-200">
    //     {userData.map((user) => (
    //       <tr key={user.id}>
    //         <td className="px-6 py-4 whitespace-nowrap">
    //           <div className="flex items-center">
    //             <div className="flex-shrink-0 h-10 w-10">
    //               <img className="h-10 w-10 rounded-full" src={user.image} />
    //             </div>
    //             <div className="ml-4">
    //               <div className="text-sm font-medium text-gray-900">
    //                 {user.username}
    //               </div>
    //               <div className="text-sm text-gray-500">{user.email}</div>
    //             </div>
    //           </div>
    //         </td>
    //         <td className="px-6 py-4 whitespace-nowrap">
    //           <div className="text-sm text-gray-900">{user.email}</div>
    //         </td>

    //         <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
    //           <button className="rounded-md px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white">
    //             <Link to="/users/edit">Edit</Link>
    //           </button>
    //           <button className="ml-2 rounded-md px-4 py-2 bg-red-600 text-white hover:bg-red-700 hover:text-white">
    //             Delete
    //           </button>
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>

    <>
    <h1 className="text-white mb-4">Users</h1>
    {isLoading ? (
      <Loading />
    ) : error ? (
      <Message variant='danger'>
        {error?.data?.message || error.error}
      </Message>
    ) : (
      <Table striped bordered hover responsive className='table-sm rounded-md' style={{ backgroundColor: 'gray' , width: '100%'}}>
        <thead style={{ textAlign: 'left' }}>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                {user.isAdmin ? (
                  <FaCheck style={{ color: 'green' }} />
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </td>
              <td>
                {!user.isAdmin && (
                  <>
                    <LinkContainer
                      to={`/admin/user/${user._id}/edit`}
                      style={{ marginRight: '10px' }}
                    >
                      <Button variant='light' className='btn-sm'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </>
  );
};

export default UsersPageComponent;
