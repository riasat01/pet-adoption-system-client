import owner from '../../../../../assets/images/owner.jpg';
import SectionTitle from '../../../main-layout-shared-components/section-title/SectionTitle';

const FuturePlans = () => {
    return (
        <section className='mt-24'>
            <SectionTitle title={'Owner Speech'}></SectionTitle>
            <div className="h-fit flex flex-col md:flex-row justify-between items-center p-4 md:p-10 lg:p-16 mx-4 md:mx-12 lg:mx-24 bg-gradient-to-tr from-pink-600 to-pink-600">
                <section className='relative rounded-lg border-pink-300 border-2 w-64 md:w-96 h-64 md:h-96'>
                    <img className='absolute rounded-lg top-0 md:-top-4 hover:-top-2 ring-0 md:-right-4 hover:-right-2 w-64 md:w-96 h-64 md:h-96' src={owner} alt="admin" />
                </section>
                <p className=' text-white text-lg font-semibold font-comforta md:max-w-xs lg:max-w-xl pt-6 md:pt-0 pl-0 md:pl-10'>
                    Hey there! I am the heart and soul behind this pet adoption hub. Picture it as a cozy spot where tails wag, and hearts find their furry matches. My goal? Spreading joy, one adoption at a time. We are not just building homes; we are creating lifelong bonds. So, come on in, explore, and let us make some tails wag together! 🐾💚
                </p>
            </div>
        </section>
    );
};

export default FuturePlans;