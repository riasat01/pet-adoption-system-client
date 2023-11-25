import { Outlet } from "react-router-dom";
import Navabar from "../../pages/mainlayout-pages/main-layout-shared-components/navbar/Navbar";
import Footer from "../../pages/mainlayout-pages/main-layout-shared-components/footer/Footer";


const MainLayout = () => {
    return (
        <div>
            <Navabar></Navabar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;