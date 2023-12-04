import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../custom-hooks/useAxiosSecure";


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
                            <button className="w-full px-5 py-2 rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">Pause</button>
                        </td>
                        <td>
                            <button className="w-full px-5 py-2 rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">Edit</button>
                        </td>
                        <td>
                            <button className="w-full px-5 py-2 rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">Delete</button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    );
};

export default Donations;