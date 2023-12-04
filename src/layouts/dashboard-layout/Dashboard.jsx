import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../custom-hooks/useAdmin";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    console.log(isAdmin)
    const [showDrawer, setShowDrawer] = useState(false);

    return (
        <div className="flex font-comforta">
            <section className="p-4 bg-pink-400 flex justify-between items-center lg:hidden absolute h-fit z-20 w-fit">
                <BsFillMenuButtonWideFill onClick={() => setShowDrawer(true)} className={`${showDrawer ? 'hidden' : 'block'} text-slate-800 text-2xl font-bold`}></BsFillMenuButtonWideFill>
                <IoCloseCircleOutline onClick={() => setShowDrawer(false)} className={`text-white text-4xl font-bold justify-self-end ${showDrawer ? 'block' : 'hidden'}`}></IoCloseCircleOutline>
            </section>
            {/* dashboard side bar */}
            <div className={`w-64 min-h-screen h-full bg-slate-700  absolute lg:relative ${showDrawer ? 'left-0 duration-500' : '-left-96 duration-500'} lg:inset-0 z-10`}>

                <ul className="bg-slate-700 p-4 text-white space-y-6 mt-12 lg:mt-0">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/users"
                                    className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}
                                >
                                    Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/pets"
                                    className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}
                                >
                                    Pets
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/admin/donations"
                                    className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}
                                >
                                    Donations
                                </NavLink>
                            </li>

                            <div className="h-[0.125rem] bg-slate-200"></div>

                            <li>
                                <NavLink to="/dashboard/add-a-pet"
                                    className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}>
                                    Add a pet
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard"
                                    className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}>
                                    My added pets
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/create-campaign"
                                    className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}>
                                    Create Donation Campaign
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-campaign"
                                    className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}>
                                    My Donations Campaigns
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/donations"
                                    className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}>
                                    My Donations
                                </NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/add-a-pet"
                                        className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}>
                                        Add a pet
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard"
                                        className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}>
                                        My added pets
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/create-campaign"
                                        className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}>
                                        Create Donation Campaign
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-campaign"
                                        className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}>
                                        My Donations Campaigns
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/donations"
                                        className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}>
                                        My Donations
                                    </NavLink>
                                </li>
                            </>
                    }
                    {/* shared nav links */}
                    <div className="h-[0.125rem] bg-slate-200"></div>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pet-listing/all"
                            className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}
                        >
                            Pet Listing
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/donation-campaigns"
                            className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}
                        >
                            Donation Campaigns
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isPending, isActive }) => isPending ? "pending" : isActive ? 'bg-slate-400 bg-opacity-50 px-8 py-2 duration-500 rounded-lg' : ''}
                        >
                            Dashboard
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-0">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;