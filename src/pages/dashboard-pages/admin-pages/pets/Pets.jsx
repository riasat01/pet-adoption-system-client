import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../custom-hooks/useAxiosSecure";


const Pets = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allPets = [], refetch } = useQuery({
        queryKey: ['allPet'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/pets?admin=admin')
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
                    <th>Owner Email</th>
                    <th>Pet Photo</th>
                    <th>Pet Status</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    allPets?.map(pet => <tr key={pet?._id}>
                        <td>{pet?.name}</td>
                        <td>{pet?.email}</td>
                        <td>
                            <img className="h-10 w-10" src={pet?.imageURL} alt={`image of ${pet?.name}`} />
                        </td>
                        <td>
                            <button className="w-full px-5 py-2 rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">Make Adopted</button>
                        </td>
                        <td>
                            <button className="w-full px-5 py-2 rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">Update</button>
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

export default Pets;