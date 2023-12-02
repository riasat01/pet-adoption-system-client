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
import Dashboard from "../../layouts/dashboard-layout/Dashboard";
import AddAPet from "../../pages/dashboard-pages/user-pages/add-a-pet/AddAPet";
import MyPets from "../../pages/dashboard-pages/user-pages/my-pets/MyPets";
import UpdatePet from "../../pages/dashboard-pages/user-pages/update-pet/UpdatePet";

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
                path: '/dashboard/add-a-pet',
                element: <PrivateRoute><AddAPet></AddAPet></PrivateRoute>
            },
            {
                path: '/dashboard/update-a-pet/:id',
                element: <PrivateRoute><UpdatePet></UpdatePet></PrivateRoute>
            },
            {
                path: '/dashboard/my-pets',
                element: <PrivateRoute><MyPets></MyPets></PrivateRoute>
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