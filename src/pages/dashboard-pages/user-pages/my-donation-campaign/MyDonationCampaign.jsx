import useAxiosSecure from "../../../../custom-hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { UserAuth } from "../../../../authprovider/AuthProvider";
import { Link } from "react-router-dom";
import { useContext } from "react";


const MyDonationCampaign = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(UserAuth);
    const { data: myDonations = [], refetch } = useQuery({
        queryKey: ['myDonation'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation/${user?.email}`);
            return res?.data;
        }
    })

    const handleState = (id, info) => {
        const update = !info
        console.log(update);

        axiosSecure.put(`/donation/togglePaused/${id}`, {state: update})
        .then(res => {
            console.log(res);
            refetch();
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <table className="w-full overflow-x-auto text-center mt-24">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Max Amount</th>
                    <th>Progress</th>
                    <th>Pause</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {
                    myDonations?.map((donation, i) => {
                        const percentage = parseInt((parseFloat(donation?.donatedAmount) / parseFloat(donation?.maxAmount)) * 100);

                        return (
                        <tr key={donation?._id}>
                            <td>{i + 1}</td>
                            <td>{donation?.name}</td>
                            <td>{donation?.maxAmount}</td>
                            <td>
                                <section className="h-2 w-full rounded-lg bg-slate-400">
                                    <section className={`h-2 w-[${percentage}%] bg-gradient-to-tr from-pink-600 to-pink-400 rounded-lg`}></section>
                                </section>
                            </td>
                            <td>
                                {
                                    donation?.isPaused ?
                                    <button onClick={() => handleState(donation?._id, donation?.isPaused)} className='px-5 py-1 my-1 rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[0px_5px_2rem_1px_pink] font-comforta'>Resume</button>
                                    :
                                    <button onClick={() => handleState(donation?._id, donation?.isPaused)} className='px-5 py-1 my-1 rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[0px_5px_2rem_1px_pink] font-comforta'>Pause</button>
                                }
                                
                            </td>
                            <td>
                                <Link to={`/dashboard/edit-campaign/${donation?._id}`}>
                                    <button className='px-5 py-1 my-1 rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[0px_5px_2rem_1px_pink] font-comforta'>Edit</button>
                                </Link>
                            </td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
};

export default MyDonationCampaign;