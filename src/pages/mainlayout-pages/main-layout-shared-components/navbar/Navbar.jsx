import logo from '../../../../assets/images/logo1.gif';
import { Link, NavLink } from 'react-router-dom';
import { BiSolidFoodMenu } from 'react-icons/bi';
import { useContext, useState } from 'react';
import swal from 'sweetalert';
import { BsMoonStarsFill, BsSun } from 'react-icons/bs';
import { useEffect } from 'react';
import { UserAuth } from '../../../../authprovider/AuthProvider';
import Button from '../../../../shared-components/Button';

const Navabar = () => {
    // state to show or hide navbar on mobiles
    const [show, setShow] = useState(false);
    // toggler
    const [toggle, setToggle] = useState(true);
    // auth info and functions
    const { user, logOut, loading, toggleTheme, theme } = useContext(UserAuth);


    // sign out User
    const handleSignOut = () => {
        logOut()
            .then(() => {
                swal(`${user.displayName} logged out`)
            })
            .catch(error => {
                swal(`Error`, error.message, `error`);
            });
    }
    const handleTheme = () => {
        toggleTheme();
    }

    // navlinks
    const navLlinks = <>
        <li onClick={handleTheme} className='text-center my-2 md:my-0'>
            {
                toggle ?
                    <BsSun onClick={() => setToggle(!toggle)} className='w-fit text-white text-xl font-semibold'></BsSun>
                    :
                    <BsMoonStarsFill onClick={() => setToggle(!toggle)} className='w-fit text-white text-xl font-semibold'></BsMoonStarsFill>
            }
        </li>
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
                to="/pet-listing/all"
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
    </>
    useEffect(() => { }, [theme]);
    return (
        <section className='fixed w-full inset-0 z-10 h-fit font-comforta'>
            <div className="flex justify-between items-center px-4 py-3 bg-slate-800 bg-opacity-60">
                <section className='flex justify-between items-center w-full md:w-fit'>
                    <section className='flex gap-4 justify-center items-center'>
                        <img src={logo} alt="logo" className='h-16' />
                        <h1 className='text-white text-xl font-semibold'>Pets<span className='bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-bold text-2xl  text-transparent'>N</span>Pals</h1>
                    </section>
                    <section className='block md:hidden'>
                        <BiSolidFoodMenu onClick={() => setShow(!show)} className='text-3xl text-white '></BiSolidFoodMenu>
                        <ul className={`absolute ${show ? 'top-20' : '-top-96'} right-4 text-right duration-500 bg-slate-700 bg-opacity-70 p-4 rounded-xl`}>
                            {
                                navLlinks
                            }
                            {
                                loading ?
                                    <span className="loading loading-infinity loading-lg"></span>
                                    :
                                    user ?
                                        <section className="flex gap-6 items-center">
                                            <details className="dropdown dropdown-end">
                                                <summary className="p-0 btn bg-transparent hover:bg-transparent border-0">
                                                    {
                                                        user?.photoURL ?
                                                            <img className="h-14 w-14 rounded-full" src={user?.photoURL} alt={`image of ${user.displayName}`} />
                                                            :
                                                            <div className="avatar online placeholder">
                                                                <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                                                    <span className="text-xl">{user?.displayName}</span>
                                                                </div>
                                                            </div>
                                                    }

                                                </summary>
                                                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                                    <li><p>{user.displayName}</p></li>
                                                    <li><button onClick={handleSignOut} className='px-5 py-1 my-1 rounded-lg bg-transparent hover:bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[0px_5px_2rem_1px_pink] '>Log Out</button></li>
                                                </ul>
                                            </details>
                                        </section>
                                        :
                                        <li>
                                            <Link to='/login'><Button text='Login'></Button></Link>
                                        </li>
                            }
                        </ul>
                    </section>
                </section>

                <section className='hidden md:block'>
                    <ul className='flex gap-6 justify-center items-center'>
                        {
                            navLlinks
                        }
                    </ul>
                </section>
                <section className=' hidden md:block'>
                    {
                        loading ?
                            <span className="loading loading-infinity loading-lg"></span>
                            :
                            user ?
                                <section className="flex gap-6 items-center">
                                    <details className="dropdown dropdown-end">
                                        <summary className="p-0 btn bg-transparent hover:bg-transparent border-0">
                                            {
                                                user?.photoURL ?
                                                    <img className="h-14 w-14 rounded-full" src={user?.photoURL} alt={`image of ${user.displayName}`} />
                                                    :
                                                    <div className="avatar online placeholder">
                                                        <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                                            <span className="text-xl">{user?.displayName}</span>
                                                        </div>
                                                    </div>
                                            }

                                        </summary>
                                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                            <li><p>{user.displayName}</p></li>
                                            <li><button onClick={handleSignOut} className='px-5 py-1 my-1 rounded-lg bg-slate-400 bg-opacity-50 hover:bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[0px_5px_2rem_1px_pink] '>Log Out</button></li>
                                        </ul>
                                    </details>
                                </section>
                                :
                                <Link to='/login'><button className='px-5 py-2 rounded-lg bg-transparent hover:bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] '>Login</button></Link>
                    }
                </section>
            </div>
        </section>
    );
};

export default Navabar;