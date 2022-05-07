import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoutes;
