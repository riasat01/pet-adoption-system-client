import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DonationCard = ({donation}) => {
    const { _id, imageURL, name, maxAmount, donatedAmount} = donation;
    console.log(_id);
    return (
        <div className='flex flex-col gap-2 p-4 rounded-lg shadow-xl font-comforta'>
            <img className='h-64 w-full rounded-lg' src={imageURL} alt={`image of ${name}`} />
            <h2><span className="font-bold">Pet Name: </span>{name}</h2>
            <p><span className="font-bold">Donated: </span>${donatedAmount}</p>
            <p><span className="font-bold">Maximum Donation: </span>${maxAmount}</p>
            <Link to={`/donation-details/${_id}`} className='grid grid-cols-1'>
                <button className='px-5 py-1 my-1 rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[0px_5px_2rem_1px_pink] font-comforta'>Show Details</button>
            </Link>
        </div>
    );
};

DonationCard.propTypes = {
    donation: PropTypes.object
}

export default DonationCard;