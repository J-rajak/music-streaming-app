import { useSelector } from "react-redux";
import axios from "axios";

const PaymentDetailsPage = () => {
  const selectedTheme = useSelector((state) => state.theme);

  const submitHandler = async () => {
    const payload = {
      return_url: "http://localhost:5173",
      website_url: "http://localhost:5173",
      amount: 1300,
      purchase_order_id: "test12",
      purchase_order_name: "test",
      customer_info: {
        name: "Khalti Bahadur",
        email: "example@gmail.com",
        phone: "9800000123",
      },
    };
    const response = await axios.post(
      `http://localhost:4000/khalti-checkout`,
      payload
    );
    console.log(response);

    if (response) {
      window.location.href = `${response?.data?.data?.payment_url}`;
    }
  };

  return (
    <div>
      <button
        onClick={submitHandler}
        className={`bg-${selectedTheme} flex text-white justify-center items-center hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-full`}
      >
        Pay via khalti
      </button>
    </div>
  );
};

export default PaymentDetailsPage;
