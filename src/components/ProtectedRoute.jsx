import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state.user.user);
  return user ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
