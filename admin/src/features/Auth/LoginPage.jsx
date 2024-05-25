import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoginUserMutation } from "./authApiSlice";
import { FaMusic } from "react-icons/fa";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { loginSchema } from "../../utils/schema";
import { setProvider } from "./authSlice";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const selectedTheme = useSelector((state) => state.theme);
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, isError, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error } = loginSchema.validate(formData, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: false,
    });

    if (error) {
      const errors = {};
      error.details.forEach(
        (detail) => (errors[detail.path[0]] = detail.message)
      );
      setValidationErrors(errors);
      return;
    }

    try {
      // const recaptchaToken = await recaptchaRef.current.executeAsync();
      // recaptchaRef.current.reset();
      const { error } = await login({ ...formData });
      if (error) {
        console.error(error);
      } else {
        if (location?.state?.from === "/signup") {
          navigate("/");
        } else {
          navigate(-1);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = (provider) => {
    dispatch(setProvider(provider));
  };

  return (
    <section className=" text-gray-100 h-full">
      <div className="flex flex-col justify-center h-full max-w-[450px] m-auto">
        <div className="mb-8">
          <span
            className={`text-xs flex gap-1 items-center mb-2 tracking-widest drop-shadow-md font-bold contrast-100`}
          >
            <span className=" filter-none">
              <FaMusic className={`text-${selectedTheme} `} />
            </span>
            <span className="saturate-200">Echosync</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-bold">Log in</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 p-1">
          <div className="email flex-grow">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-gray-200 rounded-md focus:outline-none focus:outline-gray-600 focus:-outline-offset-1 p-2  text-primary"
                  required
                />
                {validationErrors.email && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {validationErrors.email}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Password</label>
                <div className="relative w-full rounded-md">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full bg-gray-200 rounded-md focus:outline-none focus:outline-gray-600 focus:-outline-offset-1 p-2  text-primary"
                    required
                  />
                  <div
                    className="absolute right-2 top-1/3 text-black text-xl"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEye className="text-gray-900" />
                    ) : (
                      <AiOutlineEyeInvisible className="text-gray-500" />
                    )}
                  </div>
                </div>
                {validationErrors.password && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {validationErrors.password}
                  </span>
                )}
              </div>
              <div className="mb-6">
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
                    `Log in`
                  )}
                </button>
                {isError && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {error?.data?.message ||
                      error?.data?.error?.details[0].message}
                  </span>
                )}
              </div>
              <div className="text-center">
                <span>Already have an account?</span>{" "}
                <Link
                  to={{
                    pathname: `/signup`,
                    state: { from: location.pathname },
                  }}
                  className={`text-${selectedTheme}-50`}
                >
                  sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
