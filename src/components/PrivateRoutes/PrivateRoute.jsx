import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContex";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (user) {
    return children;
  }

  // redirect to register/login if not authenticated
  return <Navigate to="/register" state={{ from: location }} replace />;
};

export default PrivateRoute;
