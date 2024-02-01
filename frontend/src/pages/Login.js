import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link } from "react-router-dom";

const Login = () => {
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
        />
        <PasswordInput label="Password" placeholder="Password" />
        <div className="w-full flex items-center justify-end my-8">
          <button className="bg-green-400 text font-semibold p-3 px-10 rounded-full ">
            LOG IN
          </button>
        </div>
        <div className="w-full border border-solid border-gray-400"></div>
        <div className="my-6 font-semibold text">Don't have an account?</div>
        <div className="border border-gray-600 text-gray-400 w-full flex items-center justify-center py-4 rounded-full text-bold">
          <Link to="/signup"> SIGN UP FOR ECHO SYNC</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
