import { useState } from "react";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordRequestMutation } from "./authApiSlice";
// import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ForgottenPasswordPage = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const [request, { isLoading, isError, error }] = useForgotPasswordRequestMutation();
  const [formData, setFormData] = useState({
    email: "",
    redirectURL: "http://localhost:5173/resetPassword"
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { error } = await request({ ...formData });
      if (error) {
        console.error(error);
      } else {
        navigate("/emailSent");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="min-h-screen flex items-stretch text-white ">
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
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 256 256"
            >
              <path
                fill="#fff"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              />
              <path
                fill="#fff"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              />
              <path
                fill="#fff"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
              />
              <path
                fill="#fff"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              />
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
        <div className="sm:w-2/3 w-full py-6 z-20">
          <div className="logo p-3 mb-4 border-b border-solid border-white w-full flex justify-center">
            <Icon icon="ri:netease-cloud-music-line" width="50" height="50" />
          </div>

          <form className="w-full px-4 lg:px-0 mx-auto" onSubmit={handleSubmit}>
            <div className="pb-2 pt-4">
              <div>
                <input
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                  type="email"
                  name="email"
                  placeholder="Email*"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                {/* {validationErrors.email && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {validationErrors.email}
                  </span>
                )} */}
              </div>
            </div>
            <div className="text-right text-gray-400 hover:underline hover:text-gray-100"></div>
            <div className="px-4 pb-2 pt-4">
              <button
                type="submit"
                className={`bg-${selectedTheme} ${
                  !isLoading
                    ? `hover:bg-${selectedTheme}-50 active:translate-y-[1px]`
                    : `bg-opacity-50 cursor-not-allowed`
                } w-full text-white font-bold py-2 px-4 rounded`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="animate-spin m-auto text-2xl text-gray-400" />
                ) : (
                  `Submit`
                )}
              </button>
              {isError && (
                <span className="block text-sm mt-2 saturate-100 text-red-500">
                  {error?.data?.message ||
                    error?.data?.error?.details[0].message}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgottenPasswordPage;
