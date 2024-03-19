import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux"


const AdminRoute = ({ component: Component }) => {
    const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);
  
    return isAuthenticated && isAdmin ? (<Component />) : (<Navigate to={"/login"} replace />); 
  };

  export default AdminRoute;