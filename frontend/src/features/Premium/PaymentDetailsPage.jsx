import { useSelector } from "react-redux";
// import { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import FormContainer from "../../components/FormContainer";
import { useGetUserDetailsQuery } from "../Users/userApiSlice";

const PaymentDetailsPage = () => {
  const { userId } = useSelector((state) => state.auth);
  // const [paymentMethod, setPaymentMethod] = useState("");
  const selectedTheme = useSelector((state) => state.theme);

  const submitHandler = async () => {
    const payload = {
      return_url: "http://localhost:5173/success",
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

    try {
      const response = await axios.post(
        `http://localhost:4000/api/users/khaltiCheckout`,
        payload
      );
      console.log(response);

      if (
        response &&
        response.data &&
        response.data.data &&
        response.data.data.payment_url
      ) {
        window.location.replace(response.data.data.payment_url);
      } else {
        console.log("No payment URL received in the response.");
      }
    } catch (error) {
      console.error("Error during payment checkout:", error);
    }
  };

  const { data: user, isLoading, error } = useGetUserDetailsQuery(userId);

  return (
    <div>
      <FormContainer>
        <h1 className="text-2xl mb-4 text-white">User Details</h1>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger" className="text-white">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form className="w-full max-w-md">
            <Form.Group className="my-2" controlId="name">
              <Form.Label className="block mb-1 text-white">Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                defaultValue={user.username}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label className="block mb-1 text-white">
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue={user.email}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
              <Form.Label className="block mb-1 text-white">Country</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                defaultValue={user.country}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
              <Form.Label className="block mb-1 text-white">Bio</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                defaultValue={user.bio}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              />
            </Form.Group>
          </Form>
        )}
      </FormContainer>

      <Button
        onClick={submitHandler}
        className={`bg-${selectedTheme} mt-10 flex text-white justify-center items-center hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-full`}
        type="submit"
      >
        pay via Khalti
      </Button>
    </div>
  );
};

export default PaymentDetailsPage;
