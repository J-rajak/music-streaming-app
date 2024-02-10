import { useState } from "react";
import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequests } from "../utils/serverHelpers";
import { useCookies } from "react-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    const data = { email, password };
    const response = await makeUnauthenticatedPOSTRequests("/auth/login", data);
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("Success");
      navigate("/home");
    } else {
      alert("Failure");
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-5 border-b border-solid border-gray-400 w-full flex justify-center">
        <Icon icon="ri:netease-cloud-music-line" width="50" height="50" />
      </div>
      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
        {/* two input fields for email and password */}
        <div className="font-bold mb-4">To continue, log in to Echo Sync.</div>
        <TextInput
          label="Email address or Username"
          placeholder="Email address or Username"
          className="my-6"
          value={email}
          setValue={setEmail}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />
        <div className="w-full flex items-center justify-end my-8">
          <button
            className="bg-green-400 text font-semibold p-3 px-10 rounded-full "
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            LOG IN
          </button>
        </div>
        <div className="w-full border border-solid border-gray-400"></div>
        <div className="my-6 font-semibold text">Don't have an account?</div>
        <div className="border border-gray-600 text-gray-400 w-full flex items-center justify-center py-4 rounded-full text-bold">
          <Link to="/register"> SIGN UP FOR ECHO SYNC</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
