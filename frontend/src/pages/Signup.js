import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import avatar from "../assets/profile-user.png";
import { Icon } from "@iconify/react";
import convertToBase64 from "../helper/convert";
import { registerValidation } from "../helper/validate";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequests } from "../utils/serverHelpers";
import styles from "../styles/Username.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signUp = async () => {
    const data = { email, username, password, file };
    // const response = await makeUnauthenticatedPOSTRequests(
    //   "/auth/register",
    //   data
    // );
    // if (response && !response.err) {
    //   const token = response.token;
    //   const date = new Date();
    //   date.setDate(date.getDate() + 30);
    //   setCookie("token", token, { path: "/", expires: date });
    //   alert("success");
    //   navigate("/home");
    // } else {
    //   alert("failure");
    // }
    console.log(data);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <section className="min-h-screen flex items-stretch text-white ">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div
        className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="w-full px-24 z-10">
          <h1 className="text-5xl font-bold text-left tracking-wide">
            Keep it special
          </h1>
          <p className="text-3xl my-4">Where words fail, music speaks</p>
        </div>
        <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
          <span>
            <svg
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </span>
          <span>
            <svg
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </span>
          <span>
            <svg
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </span>
        </div>
      </div>
      <div
        className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
        style={{ backgroundColor: "#161616" }}
      >
        <div
          className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        </div>
        <div className="w-full py-6 z-20">
          <div className="logo p-3 mb-4 border-b border-solid border-white w-full flex justify-center">
            <Icon icon="ri:netease-cloud-music-line" width="50" height="50" />
          </div>

          <form
            className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
            onSubmit={formik.handleSubmit}
          >
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>

              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>
            <div className="pb-2 pt-4">
              <div>
                <input
                  {...formik.getFieldProps("email")}
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                  type="text"
                  placeholder="Email*"
                />
              </div>
            </div>
            <div className="pb-2 pt-4">
              <input
                {...formik.getFieldProps("username")}
                className="block w-full p-4 text-lg rounded-sm bg-black"
                type="text"
                placeholder="Username*"
              />
            </div>
            <div className="pb-2 pt-4">
              <div>
                <input
                  {...formik.getFieldProps("password")}
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                  type="text"
                  placeholder="Password*"
                />
              </div>
            </div>
            <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
              <Link to="/">Forgot your password?</Link>
            </div>
            <div className="text-right text-gray-400 hover:underline hover:text-gray-100"></div>
            <div className="px-4 pb-2 pt-4">
              <button
                className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                type="submit"
              >
                sign up
              </button>
            </div>
            <p className="text-gray-100 mt-4">Already have an account??</p>
            <div className="px-4 pb-2 pt-4">
              <button
                className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                onClick={() => navigate("/login")}
              >
                LOG IN INSTEAD
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
