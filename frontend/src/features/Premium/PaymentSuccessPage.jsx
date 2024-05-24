import { useEffect, useState } from "react";
import axios from "axios";
import {
  useGetPlansQuery,
  usePaidSubscriptionMutation,
} from "../Users/userApiSlice";
import { toast } from "react-toastify";
const khaltiKey = import.meta.env.VITE_KHALTI_SECRET_KEY;

const PaymentSuccessPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const [paidSubscription] = usePaidSubscriptionMutation();
  const { data: plans, isLoading, isError } = useGetPlansQuery();

  const pidx = searchParams.get("pidx");
  console.log(pidx);

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const checkPaymentSuccess = async () => {
      try {
        const res = await axios.post(
          "https://a.khalti.com/api/v2/epayment/lookup/",
          {
            pidx: pidx,
          },
          {
            headers: {
              Authorization: `Key ${khaltiKey}`,
            },
          }
        );

        console.log(res?.data?.status);
        const success = res?.data?.status === "Completed";
        setIsSuccess(success);

        if (success && plans && plans.length > 0) {
          try {
            const response = await toast.promise(
              paidSubscription({ planId: plans[0]._id }).unwrap(),
              {
                pending: "On Progress...",
                success: "You have successfully upgraded to premium",
                error: "An error occurred",
              }
            );
            console.log("Paid subscription response:", response);
          } catch (error) {
            console.error("Error during subscription:", error);
          }
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        setIsSuccess(false); // Assume failure if there's an error
      }
    };

    if (pidx && plans && plans.length > 0) {
      checkPaymentSuccess();
    }
  }, [pidx, paidSubscription, plans]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading plans</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-24 space-y-4 text-white">
      {isSuccess ? (
        <h3>Thank You! Payment has been received.</h3>
      ) : (
        <h3>Oops! Some Problem Occurred. Please Try Again.</h3>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
