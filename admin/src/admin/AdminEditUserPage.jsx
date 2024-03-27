import EditUserPageComponent from "./components/EditUserPageComponent";
import axios from "axios";

const fetchUser = async (userId) => {
  const { data } = await axios.get(`/api/users/${userId}`);
  console.log(data);
  return data;
};

const updateUserApiRequest = async (userId, isAdmin, isPremium) => {
  const { data } = await axios.put(`/api/users/admin/${userId}`, {
    isAdmin,
    isPremium,
  });
  return data;
};

const AdminEditUserPage = () => {
  return (
    <EditUserPageComponent
      updateUserApiRequest={updateUserApiRequest}
      fetchUser={fetchUser}
    />
  );
};

export default AdminEditUserPage;
