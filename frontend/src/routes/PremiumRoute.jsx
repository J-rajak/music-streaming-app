import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component }) => {
  const { isPremium } = useSelector((state) => state.auth);
  return isPremium ? <Component /> : <Navigate to={"/login"} replace />;
};

export default PrivateRoute;
