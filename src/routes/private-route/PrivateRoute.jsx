import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { UserAuth } from "../../authprovider/AuthProvider";

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(UserAuth);
    const location = useLocation();
    // console.log(location.pathname);
    if(loading){
        <p className="text-center text-lg font-bold font-comforta">loading...</p>
        return;
    }
    if(user){
        return children;
    }
    return (
        <>
            <Navigate state={location.pathname} to={`/login`}></Navigate>
        </>
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;