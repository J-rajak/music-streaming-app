// import { useState } from "react";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
// import EditUserModal from "./EditUserModal";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import { useGetAllUsersQuery } from "../Users/userApiSlice";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const { data: users, isLoading, isError, error } = useGetAllUsersQuery();
  // const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMsg error={error} />;
  }

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 bg-black">
              <thead className="bg-black">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user?.image ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.image}
                              alt=""
                            />
                          ) : (
                            <FaUser className="w-full h-full pt-4 rounded-full object-cover text-gray-400" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.username}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.bio}</div>
                      <div className="text-sm text-gray-500">
                        {user.country}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex flex-col items-end sm:flex-row sm:justify-end gap-4 mt-4 text-sm">
                        <div className="flex flex-col items-end sm:flex-row sm:justify-end gap-4 mt-4 text-sm">
                          <Link
                            to={`/admin/editUser/${user._id}`}
                            className={`bg-${selectedTheme} hover:bg-${selectedTheme}-50 active:bg-opacity-80 font-bold py-1 px-2 sm:py-2 sm:px-4 rounded`}
                          >
                            Edit
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex flex-col items-end sm:flex-row sm:justify-end gap-4 mt-4 text-sm">
                        {/* <EditUserModal
                          closeModal={closeModal}
                          isModalOpen={isModalOpen}
                          user={user}
                        >
                          <button
                            onClick={openModal}
                            className={`bg-${selectedTheme} hover:bg-${selectedTheme}-50 active:bg-opacity-80 font-bold py-1  px-2 sm:py-2 sm:px-4 rounded`}
                          >
                            Delete
                          </button>
                        </EditUserModal> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;