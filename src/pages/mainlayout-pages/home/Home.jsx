import About from "./home-sections/about/About";
import Banner from "./home-sections/home-banner/Banner";
import PetCategory from "./home-sections/pet-category/PetCAtegory";

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <PetCategory></PetCategory>
            <About></About>
        </>
    );
};

export default Home;