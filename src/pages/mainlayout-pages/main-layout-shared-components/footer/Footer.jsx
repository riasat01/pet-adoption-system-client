import { NavLink } from 'react-router-dom';
import logo from '../../../../assets/images/logo1.gif';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
const Footer = () => {
    return (
        <>
            <div className='p-4 md:p-12 lg:p-20 flex flex-col md:flex-row justify-between items-center bg-slate-900'>
                <section className='w-full md:w-1/3 flex flex-col justify-center items-center md:border-r-2 md:pr-2'>
                    <img className='h-36 w-36' src={logo} alt="" />
                    <h1 className='text-white text-5xl font-semibold font-comforta'>Pets<span className='bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-bold text-6xl  text-transparent'>N</span>Pals</h1>
                </section>
                <section className='w-full md:w-2/3 space-y-6'>
                    <ul className='flex gap-6 justify-center items-center flex-wrap font-comforta'>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-lg text-transparent font-semibold duration-500 bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text drop-shadow-lg" : "text-white font-normal duration-500"
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/pet-listing"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-lg text-transparent font-semibold duration-500 bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text drop-shadow-lg" : "text-white font-normal duration-500"
                                }
                            >
                                Pet Listing
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/donation-campaigns"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-lg text-transparent font-semibold duration-500 bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text drop-shadow-lg" : "text-white font-normal duration-500"
                                }
                            >
                                Donation Campaigns
                            </NavLink>
                        </li>
                    </ul>
                    <p className='font-comforta text-white px-6 text-center'>Paws and Whiskers Headquarters, 123 Harmony Lane, Petropolis, PA 54321, United Tailsdom</p>
                    <section className='flex justify-center items-center gap-6 text-white text-3xl'>
                        <FaFacebook></FaFacebook>
                        <FaYoutube></FaYoutube>
                        <FaInstagram></FaInstagram>
                        <FaWhatsapp></FaWhatsapp>
                        <FaLinkedin></FaLinkedin>
                    </section>
                </section>
            </div>
        </>
    );
};

export default Footer;