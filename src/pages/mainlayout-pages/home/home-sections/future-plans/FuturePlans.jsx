import future_bg from '../../../../../assets/images/future-bg.jpg';

const FuturePlans = () => {
    return (
        <section className='mt-16'>
            <div style={{
                backgroundImage: `url(${future_bg}), linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1))`,
                backgroundBlendMode: 'overlay',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed'
            }}
                className="h-fit flex justify-center items-center py-16">

                <p className='mx-4 md:mx-12 lg:mx-24 text-white text-lg font-semibold font-comforta'>
                In envisioning the future of our pet adoption platform, we are dedicated to continuously enhancing the user experience and expanding our impact on animal welfare. Our upcoming plans involve the implementation of advanced search features, allowing users to find their perfect furry companion with even greater ease. We are also working on establishing partnerships with local veterinary clinics and pet supply stores to provide exclusive discounts and services for our adopters. Furthermore, we aim to launch community events, both virtual and in-person, fostering a sense of community among pet lovers and facilitating knowledge-sharing on pet care. Ultimately, our goal is to create a comprehensive ecosystem that not only connects pets with loving homes but also supports and educates pet owners throughout their journey. Stay tuned for exciting updates as we continue to evolve and grow in our mission to make a positive impact on the lives of pets and their adoptive families.
                </p>
            </div>
        </section>
    );
};

export default FuturePlans;