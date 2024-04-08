import UsersPageComponent from "./UsersPageComponent";

import axios from "axios";

const fetchUsers = async (abctrl) => {
    const { data } = await axios.get("/admin/users/getUsers", {
        signal: abctrl.signal,
    });
    return data
}

const deleteUser = async (userId) => {
    const { data } = await axios.delete(`/admin/users/${userId}`);
    return data
}

const AdminUsersPage = () => {
    return <UsersPageComponent fetchUsers={fetchUsers} deleteUser={deleteUser} />;
};

export default AdminUsersPage;