import { useGetPlansQuery } from "../features/Users/userApiSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FreePremiumCard = () => {
  const { data: plans, refetch, isLoading, error } = useGetPlansQuery();
  const selectedTheme = useSelector((state) => state.theme);

  return (
    <>
      {plans &&
        plans.map((plan) => (
          <div
            key={plan._id}
            className="flex flex-col items-center bg-gradient-to-br from-blue-100 via-gray-400 to-purple-100 p-8 rounded-lg shadow-lg relative border-8 border-gray-100 max-w-sm mr-10"
          >
            {plan.planType === "Premium" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-20 h-20 absolute -top-11 -left-11 fill-red-400"
              >
                <path
                  fillRule="evenodd"
                  d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
            <p className="mono text-sm absolute -top-4 bg-red-400 text-zinc-100 py-0.5 px-2 font-bold tracking-wider rounded">
              {plan.planType === "Premium" ? "Premium" : ""} Plan
            </p>
            <div>
              <div className="flex gap-4 justify-center">
                <p className="font-extrabold text-3xl mb-2">{plan.title}</p>
              </div>
              <p className="opacity-60 text-center">For {plan.planType}</p>
              <p className="opacity-60 text-center"></p>
              <div className="flex gap-4 justify-center">
                <div className="flex flex-col items-center my-8">
                  <p className="font-extrabold text-4xl"> Rs. {plan.price}</p>
                  <p className="text-sm opacity-60">/month</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              {plan.features.map((feature, index) => (
                <p key={index} className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <b>{feature}</b>
                </p>
              ))}
            </div>
            <div>
              <Link to={`/users/subscription/${plan._id}`}>
                <button
                  className={`bg-gray-300 flex justify-center items-center mb-2 hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-lg mt-8`}
                >
                  <span>Edit</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
    </>
  );
};

export default FreePremiumCard;
