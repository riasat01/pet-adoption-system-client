import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layouts/mainlayout/MainLayout";
import ErrorPage from "../../pages/error-page/ErrorPage";
import Home from "../../pages/mainlayout-pages/home/Home";
import LoginPage from "../../pages/mainlayout-pages/login-page/LoginPage";
import Login from "../../pages/mainlayout-pages/login-page/login/Login";
import Register from "../../pages/mainlayout-pages/login-page/register/Register";
import PetListings from "../../pages/mainlayout-pages/pet-listings/PetListings";
import PetDetails from "../../pages/mainlayout-pages/pet-details/PetDetails";


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
                element: <PetDetails></PetDetails>
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
    }
]) 

export default MainRoute;