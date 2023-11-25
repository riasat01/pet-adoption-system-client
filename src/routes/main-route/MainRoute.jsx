import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layouts/mainlayout/MainLayout";
import ErrorPage from "../../pages/error-page/ErrorPage";
import Home from "../../pages/mainlayout-pages/home/Home";


const MainRoute = createBrowserRouter ([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    }
]) 

export default MainRoute;