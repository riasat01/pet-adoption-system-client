import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../custom-hooks/useAxiosSecure";
import swal from "sweetalert";
import { useContext } from "react";
import { UserAuth } from "../../../../authprovider/AuthProvider";

const MyDonations = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(UserAuth);

    const { data: allDonations = [], refetch } = useQuery({
        queryKey: ['allDonation'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/donator/${user?.email}`)
                return res?.data;
            } catch (error) {
                console.log(error);
            }

        },
    })
    const handleRefund = (id, id2, price) => {
        axiosSecure.delete(`/donator/${id}`)
        .then(res => {
            console.log(res);
            axiosSecure.put(`/donation/donated/${id2}`, { needToAdd: false, amount: price })
            .then(res => {
                console.log(res);
                swal('congratulations', 'refund successful', 'success');
                refetch();
            })
            .catch(error => {
                console.log(error);
            })
        })
        .catch(error => console.log(error));
    }
    return (
        <table className="w-full text-center mt-24">
            <thead>
                <tr>
                    <th>Pet Name</th>
                    <th>Pet Image</th>
                    <th>Donated Amount</th>
                    <th>Ask for refund</th>
                </tr>
            </thead>
            <tbody>
                {
                    allDonations?.map(donation => <tr key={donation?._id}>
                        <td>{donation?.donation?.name}</td>
                        <td>
                            <img className="h-10 w-10" src={donation?.donation?.imageURL} alt="" />
                        </td>
                        <td>{donation?.donatedAmount}</td>

                        <td>
                            <button onClick={() => handleRefund(donation?._id, donation?.donation?._id, donation?.donatedAmount)} className="w-full px-5 py-2 rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">Ask for refund</button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    );
};

export default MyDonations;