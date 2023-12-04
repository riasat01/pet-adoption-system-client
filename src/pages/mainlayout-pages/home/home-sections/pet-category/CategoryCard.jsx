import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryCard = ({ img, name }) => {
    return (
        <Link to={`/pet-listing/${name}`}>
            <div style={{
                backgroundImage: `url(${img}), linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))`,
                backgroundBlendMode: 'overlay',
                backgroundSize: 'cover'
            }}
                className="h-[40vh] rounded-xl">

            </div>
        </Link>
    );
};

CategoryCard.propTypes = {
    img: PropTypes.string,
    name: PropTypes.string
}

export default CategoryCard;