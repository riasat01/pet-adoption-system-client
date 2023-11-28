import { useRef } from 'react';
import petBannerImg from '../.../../../../../assets/images/pet-listing-banner.png';
import Proptypes from 'prop-types';

const PetBanner = ({setName}) => {
    const searchRef = useRef();
    const handleSearch = () => {
        const text = searchRef?.current?.value;
        const name = text?.slice(0,1).toUpperCase() + text?.slice(1).toLowerCase();
        // console.log(name);
        setName(name);
        searchRef.current.value = '';
    }
    return (
        <div style={{
            backgroundImage: `url(${petBannerImg}), linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))`,
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
        }}
            className="h-[50vh] lg:h-[80vh] flex flex-col justify-center items-center gap-6 pt-16 px-4 md:px-12 lg:px-20">
            <input className='w-full md:w-1/2 lg:w-1/3 text-white rounded-lg py-2 px-4 bg-slate-600 bg-opacity-70' type="search" name="search" id="" placeholder='Enter name' ref={searchRef} />
            <button onClick={handleSearch} className='px-5 py-1 my-1 rounded-lg bg-transparent hover:bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[0px_5px_2rem_1px_pink] font-comforta'>Search</button>
        </div>
    );
};

PetBanner.propTypes = {
    setName: Proptypes.func
}

export default PetBanner;