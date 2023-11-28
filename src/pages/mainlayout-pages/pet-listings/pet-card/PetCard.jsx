import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../../../../shared-components/Button';

const PetCard = ({ pet }) => {
    const { _id, imageURL, name, age, location, date, category } = pet;
    const postedDate = new Date(date);
    return (
        <div className='flex flex-col gap-2 p-4 rounded-lg shadow-xl font-comforta'>
            <img className='h-64 w-full rounded-lg' src={imageURL} alt={`image of ${name} the ${category}`} />
            <h2><span className="font-bold">Name: </span>{name}</h2>
            <p><span className="font-bold">Age: </span>{age}</p>
            <p><span className="font-bold">Address: </span>{location}</p>
            <p><span className="font-bold">Posted at: </span>{postedDate?.toUTCString().slice(0, 16)}</p>
            <p><span className='font-bold'>Time: </span>{postedDate?.toUTCString().slice(17)}</p>
            <Link to={`/pet-details/${_id}`} className='grid grid-cols-1'>
                <Button text={'Show Details'}></Button>
            </Link>
        </div>
    );
};

PetCard.propTypes = {
    pet: PropTypes.object
}

export default PetCard;