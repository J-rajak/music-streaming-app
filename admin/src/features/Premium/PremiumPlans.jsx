import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { usePostPlanMutation } from "../Users/userApiSlice";

const PremiumPlans = () => {
  // const { id: userId } = useParams();
  const [title, setTitleName] = useState("");
  const [planType, setPlanType] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [price, setPrice] = useState(0);

  const [postPlan, { isLoading, isError, error }] = usePostPlanMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await postPlan({
        title,
        planType,
        description,
        features,
        price,
      });

      toast.success("Plan created successfully");
      window.location.reload(); // Reload the page
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <Link
        to="/users/premium"
        className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded my-3 inline-block"
      >
        Go Back
      </Link>
      <FormContainer>
        <h1 className="text-2xl mb-4 text-white">Create Plan</h1>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger" className="text-white">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler} className="w-full max-w-md">
            <Form.Group className="my-2" controlId="title">
              <Form.Label className="block mb-1 text-white">Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter title"
                value={title}
                required
                onChange={(e) => setTitleName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="planType">
              <Form.Label className="block mb-1 text-white">
                Plan type
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter plan type"
                value={planType}
                required
                onChange={(e) => setPlanType(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="description">
              <Form.Label className="block mb-1 text-white">
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="features">
              <Form.Label className="block mb-1 text-white">
                Features
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter features"
                value={features.join(",")}
                required
                onChange={(e) => setFeatures(e.target.value.split(","))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="price">
              <Form.Label className="block mb-1 text-white">Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                required
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              />
            </Form.Group>
            <Button
              type="submit"
              variant="danger"
              className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default PremiumPlans;
