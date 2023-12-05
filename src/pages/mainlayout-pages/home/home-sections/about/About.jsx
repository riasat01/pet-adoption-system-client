import about_bg from '../../../../../assets/images/about.jpg'
import SectionTitle from '../../../main-layout-shared-components/section-title/SectionTitle';

const About = () => {
    return (
        <section className='mt-24'>
            <SectionTitle title={'About'}></SectionTitle>
            <div style={{
                backgroundImage: `url(${about_bg}), linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1))`,
                backgroundBlendMode: 'overlay',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed'
            }}
                className="h-fit flex justify-center items-center py-16">

                <p className='mx-4 md:mx-12 lg:mx-24 text-white text-lg font-semibold font-comforta'>
                    Welcome to our heartwarming corner of the web, where tails wag, and hearts find their forever companions. Our mission at PetsNPals is to create a bridge between loving homes and the endearing souls seeking a second chance. Founded with a passion for animal welfare, we envisioned a digital haven where the spirit of adoption thrives. Here, we believe in the transformative power of companionship and the joy that blossoms when a pet finds its perfect match. Navigating our site is your journey to creating moments of pure love, as you discover furry friends awaiting their forever homes. Every adoption tale is a testament to the magic that unfolds when compassion meets connection. Join us in this adventure, where each click brings us one step closer to a world filled with wagging tails, purrs of contentment, and the boundless joy of a shared life with a loyal friend. Welcome to PetsNPals, where happiness finds a home!
                </p>
            </div>
        </section>
    );
};

export default About;