import gsap from 'gsap';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const SectionTitle = ({title}) => {
    const sectionRef1 = useRef()
    const sectionRef2 = useRef()
    useEffect(() => {
        gsap.fromTo(sectionRef1.current, 
            { width: '10%' }, 
            { width: '100%', repeat: -1, duration: 1, yoyo: true }
        );
        gsap.fromTo(sectionRef2.current, 
            { width: '10%' }, 
            { width: '100%', repeat: -1, duration: 1, yoyo: true }
        );
    }, [])
    return (
        <div className='mb-8 flex flex-col justify-center items-center text-4xl font-bold font-comforta w-fit mx-auto'>
            <section ref={sectionRef1} className='h-1 my-2 bg-gradient-to-tr from-pink-600 to-pink-400 rounded-lg'></section>
            <p>{title}</p>
            <section ref={sectionRef2} className='h-1 my-2 bg-gradient-to-tr from-pink-600 to-pink-400 rounded-lg'></section>
        </div>
    );
};

SectionTitle.propTypes = {
    title: PropTypes.string
}

export default SectionTitle;