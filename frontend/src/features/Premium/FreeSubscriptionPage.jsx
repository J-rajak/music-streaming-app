import { useSelector } from "react-redux";
// import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import FormContainer from "../../components/FormContainer";
import {
  useGetUserDetailsQuery,
  useFreeSubscriptionMutation,
} from "../Users/userApiSlice";
import { toast } from "react-toastify";

const FreeSubscriptionPage = () => {
  const { userId } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  // const [paymentMethod, setPaymentMethod] = useState("");
  const selectedTheme = useSelector((state) => state.theme);
  const { data: user, isLoading, error } = useGetUserDetailsQuery(userId);
  const [freeSubscription] = useFreeSubscriptionMutation();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const { error } = await toast.promise(freeSubscription(id).unwrap(), {
        pending: "On Progress...",
        success: "You have successfully upgraded to premium",
        error: "User's trial period is over",
      });
      if (error) {
        console.error(error);
      } else {
        navigate("/");
        console.log("You have upgraded to premium");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
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
                <Form.Label className="block mb-1 text-white">
                  Country
                </Form.Label>
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
          disabled={isLoading}
          className={`bg-${selectedTheme} mt-10 flex text-white justify-center items-center hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-full`}
          type="submit"
        >
          Start your free Subscription
        </Button>
      </div>
    </>
  );
};

export default FreeSubscriptionPage;
