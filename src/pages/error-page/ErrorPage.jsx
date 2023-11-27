import { Link } from 'react-router-dom';
import errorImg from '../../assets/images/error.png'
import Button from '../../shared-components/Button';

const ErrorPage = () => {
    return (
        <div style={{
            backgroundImage: `url('${errorImg}')`
        }} className='w-screen h-screen bg-cover text-2xl font-comforta flex justify-center items-start'>
            <section className='bg-gradient-to-tr bg-opacity-0 from-slate-600 to-slate-400 px-36 py-5 rounded-tl-full rounded-br-full flex flex-col space-y-5 justify-center items-center mt-10'>
                <p className='text-white'>Something went wrong</p>
                <Link to='/'><Button text='Go to home'></Button></Link>
            </section>

        </div>
    );
};

export default ErrorPage;