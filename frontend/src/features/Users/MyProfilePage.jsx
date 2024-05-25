import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  useUploadImageMutation,
  useGetCurrentUserQuery,
  useCancelSubscriptionMutation,
} from "./userApiSlice";
import { useLogoutUserMutation } from "../Auth/authApiSlice";
import EditUserModal from "./EditUserModal";
import ErrorMsg from "../../components/ErrorMsg";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { format, differenceInDays } from "date-fns";

const MyProfilePage = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const { isPremium } = useSelector((state) => state.auth);
  const [cancelSubscription] = useCancelSubscriptionMutation();
  // const [daysLeft, setDaysLeft] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: user,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    error: currentUserError,
  } = useGetCurrentUserQuery();
  const imageRef = useRef(null);
  const [uploadImage, { isError, error }] = useUploadImageMutation();
  const [logOut, { isLoading }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const handleImageInputClick = () => {
    imageRef.current.click();
  };

  console.log(user);

  if (isCurrentUserLoading) {
    return <Loading />;
  }

  if (isCurrentUserError) {
    return <ErrorMsg error={currentUserError} />;
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      await toast.promise(uploadImage(formData).unwrap(), {
        pending: "Uploading...",
        success: "Upload successful",
        error: "An error occurred",
      });
      if (isError) {
        console.error(error);
      }
    }
  };

  const cancelHandler = async () => {
    if (window.confirm("Are you sure")) {
      try {
        const { error } = await toast.promise(cancelSubscription().unwrap(), {
          pending: "On Progress...",
          success: "You have cancelled subscription",
          error: "An error occurred",
        });
        if (error) {
          console.error(error);
        } else {
          navigate("/");
          console.log("You have cancelled subscription");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const calculateDaysLeft = () => {
    const startDate = new Date(user.membershipStartDate);
    const endDate = new Date(user.membershipEndDate);
    const today = new Date();

    console.log(startDate);

    return differenceInDays(endDate, today);
  };

  const daysLeft = calculateDaysLeft();

  const handleLogOut = async () => {
    const { error } = await logOut().unwrap();
    if (error) {
      console.error(error);
      return;
    }
    navigate("/");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className=" text-gray-100">
      <div
        className={`w-full h-28 md:h-48  bg-gradient-to-r from-transparent via-${selectedTheme} to-transparent relative`}
      ></div>
      <div className="-translate-y-14 md:-translate-y-24 translate-x-5 absolute">
        <div
          className="w-28 h-28 md:w-48 md:h-48 rounded-full relative bg-secondary-100 shadow-lg  shadow-secondary-100 overflow-hidden"
          onClick={handleImageInputClick}
        >
          {user?.image ? (
            <img
              src={user.image}
              alt=""
              className="w-full h-full rounded-full object-cover cursor-pointer"
            />
          ) : (
            <FaUser className="w-full h-full pt-4 rounded-full object-cover text-gray-400 cursor-pointer" />
          )}
          <span className="absolute left-0 bottom-0 text-center w-full p-1 text-sm sm:text-base bg-secondary-200 bg-opacity-50 cursor-pointer">
            Upload
          </span>
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            ref={imageRef}
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        <h1 className="text-xl md:text-3xl font-semibold text-center m-2">
          {user.username}
        </h1>
      </div>

      <div className="flex flex-col items-end sm:flex-row sm:justify-end gap-4 mt-4 text-sm">
        <EditUserModal
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          user={user}
        >
          <button
            onClick={openModal}
            className={`bg-${selectedTheme} hover:bg-${selectedTheme}-50 active:bg-opacity-80 font-bold py-1  px-2 sm:py-2 sm:px-4 rounded`}
          >
            Edit
          </button>
        </EditUserModal>
        <button
          className={`bg-transparent  border hover:bg-${selectedTheme} active:bg-opacity-80 font-bold py-1  px-2 sm:py-2 sm:px-4 rounded  ${
            isLoading && "cursor-not-allowed"
          }`}
          onClick={handleLogOut}
          disabled={isLoading}
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin m-auto text-lg text-gray-400" />
          ) : (
            `Log out`
          )}
        </button>
      </div>

      <div className="mt-14 md:mt-36 md:w-3/4">
        <div className="px-4 py-6 rounded-lg bg-secondary-100 shadow-sm shadow-gray-700">
          <h2 className="flex gap-8 font-semibold">
            <span className="text-gray-300">Bio: </span>
            <span>{user.bio}</span>
          </h2>
        </div>
        <div className="px-4 py-6 mt-4 rounded-md bg-secondary-100 shadow-sm shadow-gray-700">
          <h2 className="flex gap-8 font-semibold">
            <span className="text-gray-300">Country: </span>
            <span>{user.country}</span>
          </h2>
        </div>
        {isPremium ? (
          <div className="px-4 py-6 mt-4 rounded-md bg-secondary-100 shadow-sm shadow-gray-700">
            <h2 className="flex gap-8 font-semibold">
              <span className="text-gray-300">Membership: </span>
              <span>{`${daysLeft} days left`}</span>
            </h2>
          </div>
        ) : (
          <div>
            <Link to="/premium">
              <button
                className={`bg-${selectedTheme} mt-4 flex text-white justify-center items-center hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-sm`}
              >
                Explore Premium
              </button>
            </Link>
          </div>
        )}
        {user.isPremium && user.membershipStartDate && (
          <div className="px-4 py-6 mt-3 rounded-lg bg-secondary-100 shadow-sm shadow-gray-700">
            <h2 className="flex gap-8 font-semibold">
              Membership started on{" "}
              {format(new Date(user.membershipStartDate), "MMMM dd, yyyy")}
            </h2>
          </div>
        )}
        {user.isPremium && (
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => cancelHandler()}
              variant="danger"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Cancel Subscription
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyProfilePage;
