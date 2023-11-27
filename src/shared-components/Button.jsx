import PropTypes from 'prop-types';

const Button = ({text}) => {
    return (
        <button className='px-5 py-1 my-1 rounded-lg bg-transparent hover:bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[0px_5px_2rem_1px_pink] font-comforta'>{text}</button>
    );
};

Button.propTypes = {
    text: PropTypes.string
}

export default Button;