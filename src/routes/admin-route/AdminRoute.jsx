import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types"
import { useContext } from "react";
import { UserAuth } from "../../authprovider/AuthProvider";
import useAdmin from "../../custom-hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(UserAuth);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <p className="text-center text-lg font-bold font-comforta">loading...</p>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={location.pathname} replace></Navigate>

};

AdminRoute.propTypes = {
    children: PropTypes.object
}

export default AdminRoute;