import { useEffect, useRef, useState } from 'react';
import bannerBg from '../../../../../assets/images/banner1.png';
import { gsap } from 'gsap';

import dog1 from '../../../../../assets/images/dog1.png'
import dog2 from '../../../../../assets/images/dog2.png'
import cat1 from '../../../../../assets/images/cat1.png'
import cat2 from '../../../../../assets/images/cat2.png'
import rabbit1 from '../../../../../assets/images/rabbit1.png'
import fish1 from '../../../../../assets/images/fish1.png'

const Banner = () => {
    const bannerTitle = useRef()
    const [changeImgLayout, setChangeImgLayout] = useState(0)

    useEffect(() => {
        gsap.from(bannerTitle.current, {
            duration: 1,
            x: '-100%',
            ease: 'power3.out',
        })
        gsap.to(bannerTitle.current, {
            duration: 1,
            x: '0%',
            ease: 'power3.out',
        })
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (changeImgLayout === 5) {
                setChangeImgLayout(0);
            } else {
                setChangeImgLayout(changeImgLayout + 1);
            }
        }, 2000)
    }, [changeImgLayout])


    return (
        <div style={{
            backgroundImage: `url(${bannerBg}), linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))`,
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
        }}
            className="h-[100vh] md:h-[50vh] lg:h-[80vh] flex flex-col md:flex-row justify-center items-center pt-16 px-4 md:px-12 lg:px-20 text-center lg:text-left">

            <h1 ref={bannerTitle} style={{textShadow: '0 0 1rem pink'}} className="h-1/2 md:h-fit my-auto md:w-1/2 text-2xl md:mx-0 md:text-3xl lg:text-6xl font-comforta text-transparent bg-gradient-to-br from-pink-600 to-pink-400 font-extrabold bg-clip-text pt-24 md:pt-0">Whiskers and Wags! Where Furry Friends Find Their Happily Ever After.</h1>
            

            <section className='h-1/2 md:h-full md:w-1/2 p-4 md:p-8 grid grid-cols-3 grid-rows-3 gap-4'>
                <img className={`w-full h-full ${changeImgLayout === 0 || changeImgLayout === 2 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`} src={changeImgLayout === 2 ? cat1 : dog1} alt="" />
                <img className={`w-full h-full ${changeImgLayout === 1 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`} src={dog2} alt="" />
                <img className={`w-full h-full `} src={changeImgLayout === 2 ? dog1 : cat1} alt="" />
                <img className={`w-full h-full ${changeImgLayout === 3 || changeImgLayout === 5 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`} src={changeImgLayout === 5 ? fish1 : cat2} alt="" />
                <img className={`w-full h-full ${changeImgLayout === 4 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`} src={rabbit1} alt="" />
                <img className={`w-full h-full `} src={changeImgLayout === 5 ? cat2 : fish1} alt="" />
            </section>
        </div>
    );
};

export default Banner;