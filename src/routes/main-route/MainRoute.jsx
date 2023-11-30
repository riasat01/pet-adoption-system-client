import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layouts/mainlayout/MainLayout";
import ErrorPage from "../../pages/error-page/ErrorPage";
import Home from "../../pages/mainlayout-pages/home/Home";
import LoginPage from "../../pages/mainlayout-pages/login-page/LoginPage";
import Login from "../../pages/mainlayout-pages/login-page/login/Login";
import Register from "../../pages/mainlayout-pages/login-page/register/Register";
import PetListings from "../../pages/mainlayout-pages/pet-listings/PetListings";
import PetDetails from "../../pages/mainlayout-pages/pet-details/PetDetails";
import PrivateRoute from "../private-route/PrivateRoute";
import Dashboard from "../../layouts/mainlayout/dashboard-layout/Dashboard";


const MainRoute = createBrowserRouter ([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/pet-listing/:category',
                element: <PetListings></PetListings>
            },
            {
                path: '/pet-details/:id',
                element: <PrivateRoute><PetDetails></PetDetails></PrivateRoute>
            },
            {
                path: '/login',
                element: <LoginPage></LoginPage>,
                children: [
                    {
                        path: '/login',
                        element: <Login></Login>
                    },
                    {
                        path: '/login/register',
                        element: <Register></Register>
                    }
                ]
            }
        ]
    },{
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // normal users
            {
                path: '/dashboard/add-a-pet'
            },
            {
                path: '/dashboard/my-pets'
            },
            {
                path: '/dashboard/adoption-request'
            },
            {
                path: '/dashboard/create-campaign'
            },
            {
                path: '/dashboard/my-campaign'
            },
            {
                path: '/dashboard/donations'
            }
        ]
    }
]) 

export default MainRoute;