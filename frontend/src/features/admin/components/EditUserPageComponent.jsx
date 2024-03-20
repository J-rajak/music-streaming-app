// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EditUserPageComponent = ({ updateUserApiRequest, fetchUser }) => {
  const selectedTheme = useSelector((state) => state.theme);
  // const [validated, setValidated] = useState(false);
  const [user, setUser] = useState([]);
  const [isAdminState, setIsAdminState] = useState(false);
  const [isPremiumState, setIsPremiumState] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    message: "",
    error: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const username = form.username.value;
    const email = form.email.value;
    const isAdmin = form.isAdmin.checked;
    const isPremium = form.isPremium.checked;

    console.log(username);

    updateUserApiRequest(id, username, email, isAdmin, isPremium)
      .then((data) => {
        if (data === "user updated") {
          navigate("/admin");
        }
      })
      .catch((er) => {
        setUpdateUserResponseState({
          error: er.response.data.message
            ? er.response.data.message
            : er.response.data,
        });
      });

    // setValidated(true);
  };

  useEffect(() => {
    fetchUser(id)
      .then((data) => {
        setUser(data);
        setIsAdminState(data.isAdmin);
        setIsPremiumState(data.isPremium);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="sm:w-1/3 w-full py-6 z-20">
        <div className="logo p-3 mb-4 border-b border-solid border-white w-full flex justify-center"></div>
        <form className="w-full px-4 lg:px-0 mx-auto" onSubmit={handleSubmit}>
          <div className="pb-2 pt-4">
            <label className="block text-white mb-1">Username</label>
            <input
              className="block w-full p-4 text-lg rounded-sm bg-black text-white"
              type="text"
              name="username"
              value={user.username}
              placeholder="username"
              required
              disabled
            />
          </div>
          <div className="pb-2 pt-4">
            <label className="block text-white mb-1">Email</label>
            <input
              className="block w-full p-4 text-lg rounded-sm bg-black text-white"
              type="text"
              name="email"
              value={user.email}
              placeholder="email"
              required
              disabled
            />
          </div>
          <div className="pb-2 pt-4">
            <label className="block text-white mb-1">Country</label>
            <input
              className="block w-full p-4 text-lg rounded-sm bg-black text-white"
              type="text"
              placeholder="Country"
              value={user.country}
              required
              disabled
            />
          </div>
          <div className="pb-2 pt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={isAdminState}
                onChange={(e) => setIsAdminState(e.target.checked)}
              />
              <span className="ml-2 text-white">Admin</span>
            </label>
          </div>
          <div className="pb-2 pt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={isPremiumState}
                onChange={(e) => setIsPremiumState(e.target.checked)}
              />
              <span className="ml-2 text-white">Premium</span>
            </label>
          </div>
          <div className="px-4 pb-2 pt-4">
            <button
              type="submit"
              className={`bg-${selectedTheme} hover:bg-${selectedTheme}-50 active:translate-y-[1px] bg-opacity-50 w-full text-white text-center font-bold py-2 px-4 rounded `}
            >
              Update
            </button>
          </div>
          {updateUserResponseState.error}
        </form>
      </div>
    </div>
  );
};

export default EditUserPageComponent;
