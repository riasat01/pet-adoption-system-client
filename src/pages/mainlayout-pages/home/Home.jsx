import About from "./home-sections/about/About";
import CallToAction from "./home-sections/call-to-action/CallToAction";
import FuturePlans from "./home-sections/future-plans/FuturePlans";
import Banner from "./home-sections/home-banner/Banner";
import PetCategory from "./home-sections/pet-category/PetCAtegory";
import OwnerSpeech from "./home-sections/owner-speech/OwnerSpeech"
const Home = () => {
    return (
        <>
            <Banner></Banner>
            <OwnerSpeech></OwnerSpeech>
            <PetCategory></PetCategory>
            <About></About>
            <CallToAction></CallToAction>
            <FuturePlans></FuturePlans>
        </>
    );
};

export default Home;