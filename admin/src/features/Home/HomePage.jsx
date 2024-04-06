import { useEffect } from "react";
import { useLoginSuccessQuery } from "../Auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setProvider } from "../Auth/authSlice";

const HomePage = () => {
  const { provider } = useSelector((state) => state.auth);
  const { isSuccess, isError } = useLoginSuccessQuery(undefined, {
    skip: !provider,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      console.log("✅ Success: Login successful");
      dispatch(setProvider(null));
    } else if (isError) {
      dispatch(setProvider(null));
    }
  }, [isSuccess, isError, dispatch]);

  return <div> this is home HomePage</div>;
};

export default HomePage;
