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
import CreateDonationCampaign from "../../pages/dashboard-pages/user-pages/create-donation-campaign/CreateDonationCampaign";
import MyDonationCampaign from "../../pages/dashboard-pages/user-pages/my-donation-campaign/MyDonationCampaign";
import EditCampaign from "../../pages/dashboard-pages/user-pages/edit-campaign/EditCampaign";
import Donation from "../../pages/mainlayout-pages/donation/Donation";
import DonationDetails from "../../pages/mainlayout-pages/donation-details/DonationDetails";
import Users from "../../pages/dashboard-pages/admin-pages/users/Users";
import AdminRoute from "../admin-route/AdminRoute"
import Pets from "../../pages/dashboard-pages/admin-pages/pets/Pets";
import Donations from "../../pages/dashboard-pages/admin-pages/donations/Donations";

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
                path: '/donation-campaigns',
                element: <Donation></Donation>
            },
            {
                path: '/donation-details/:id',
                element: <PrivateRoute><DonationDetails></DonationDetails></PrivateRoute>
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
                path: '/dashboard/create-campaign',
                element: <PrivateRoute><CreateDonationCampaign></CreateDonationCampaign></PrivateRoute>
            },
            {
                path: '/dashboard/my-campaign',
                element: <PrivateRoute><MyDonationCampaign></MyDonationCampaign></PrivateRoute>
            },
            {
                path: '/dashboard/edit-campaign/:id',
                element: <PrivateRoute><EditCampaign></EditCampaign></PrivateRoute>
            },
            {
                path: '/dashboard/donations'
            },

            // admin only routes
            {
                path: '/dashboard/users',
                element: <AdminRoute><Users></Users></AdminRoute>
            },
            {
                path: '/dashboard/pets',
                element: <AdminRoute><Pets></Pets></AdminRoute>
            },
            {
                path: '/dashboard/admin/donations',
                element: <AdminRoute><Donations></Donations></AdminRoute>
            }
        ]
    }
]) 

export default MainRoute;