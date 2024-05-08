
import { useEffect, useState } from "react";
import axios from "axios";

const PaymentSuccessPage = () => {

    const searchParams = new URLSearchParams(window.location.search);
    const pidx = searchParams.get("pidx");
    console.log(pidx);
  
    const [isSuccess, setIsSuccess] = useState(true);
  
    useEffect(() => {
      const checkPaymentSuccess = async () => {
        const res = await axios.post(
          "https://a.khalti.com/api/v2/epayment/lookup/",
          {
            pidx: pidx,
          },
          {
            headers: {
              Authorization: "Key 81b9177bdcca4513a76b663cc56d68b9",
            },
          }
        );
        console.log(res?.data?.status);
        setIsSuccess(res?.data?.status === "Completed");
      };
      checkPaymentSuccess();
    }, []);
return (

    <div className="flex min-h-screen flex-col items-center p-24 space-y-4">
      {isSuccess ? (
        <h3>Thank You! Payment has been received.</h3>
      ) : (
        <h3>Oops! Some Problem Occured. Please Try again.</h3>
      )}
    </div>
)

}

export default PaymentSuccessPage