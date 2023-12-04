import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../custom-hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import swal from "sweetalert";


const Donations = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allDonations = [], refetch } = useQuery({
        queryKey: ['allDonation'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/donation')
                return res?.data;
            } catch (error) {
                console.log(error);
            }

        },
    })

    const handleState = (id, info) => {
        const update = !info
        console.log(update);

        axiosSecure.put(`/donation/togglePaused/${id}`, { state: update })
            .then(res => {
                console.log(res);
                refetch();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleDelete = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this donation!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axiosSecure.delete(`/donation/${id}`)
                        .then(res => {
                            console.log(res);
                            swal("Poof! Donation has been deleted!", {
                                icon: "success",
                            });
                            refetch();
                        })
                        .catch(error => console.log(error));
                } else {
                    swal("Your donation is safe!");
                }
            });
    }

    return (
        <table className="w-full text-center mt-24">
            <thead>
                <tr>
                    <th>Pet Name</th>
                    <th>Creator Email</th>
                    <th>Max Amount</th>
                    <th>Donated Amount</th>
                    <th>Pause</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    allDonations?.map(donation => <tr key={donation?._id}>
                        <td>{donation?.name}</td>
                        <td>{donation?.email}</td>
                        <td>{donation?.maxAmount}</td>
                        <td>{donation?.donatedAmount}</td>
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
                                <button className="w-full px-5 py-2 rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">Edit</button>
                            </Link>
                        </td>
                        <td>
                            <button onClick={() => handleDelete(donation?._id)} className="w-full px-5 py-2 rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">Delete</button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    );
};

export default Donations;