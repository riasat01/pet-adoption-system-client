import gsap from 'gsap';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const ActionCard = ({ info }) => {
    const { text, imageURL } = info;
    const card = useRef();

    useEffect(() => {
        gsap.fromTo(card.current, 
            { x: '100%' }, 
            { x: '-500%', duration: 15, repeat: -1 }
          );
    }, [])
    return (
        <div ref={card} className='w-80 flex flex-col gap-5 p-4 rounded-lg shadow-xl'>
            <img className='h-96 w-full rounded-lg' src={imageURL} alt="" />
            <p className='font-comforta font-semibold'>{text}</p>
        </div>
    );
};

ActionCard.propTypes = {
    info: PropTypes.object
}

export default ActionCard;