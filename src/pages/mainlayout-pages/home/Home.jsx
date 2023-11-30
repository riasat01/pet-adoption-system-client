import About from "./home-sections/about/About";
import CallToAction from "./home-sections/call-to-action/CallToAction";
import Banner from "./home-sections/home-banner/Banner";
import PetCategory from "./home-sections/pet-category/PetCAtegory";
const Home = () => {
    return (
        <>
            <Banner></Banner>
            <PetCategory></PetCategory>
            <About></About>
            <CallToAction></CallToAction>
        </>
    );
};

export default Home;