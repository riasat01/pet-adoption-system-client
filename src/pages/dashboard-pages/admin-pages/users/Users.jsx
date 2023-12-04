import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../custom-hooks/useAxiosSecure";


const Users = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user')
            return res?.data;
        },
    })

    const handleAdmin = (id, role) => {
        console.log(id,role )
        axiosSecure.put(`/user/makeAdmin/${id}`, null)
        .then(res => {
            console.log(res);
            refetch()
        })
        .catch(error => console.log(error));
    }
    return (
        <table className="w-full text-center mt-24">
            <thead>
                <tr>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>User Photo</th>
                    <th>User Role</th>
                </tr>
            </thead>
            <tbody>
                {
                    allUsers?.map(user => <tr key={user?._id}>
                        <td>{user?.name}</td>
                        <td>{user?.email}</td>
                        <td>
                            <img className="h-10 w-10" src={user?.imageURL} alt={`image of ${user?.name}`} />
                        </td>
                        <td>
                            {user?.role === 'admin'
                                ?
                                <p className="text-green-500">{user?.role}</p>
                                :
                                <button onClick={() => handleAdmin(user?._id, user?.role)} className="w-full px-5 py-2 rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">Make Admin</button>
                            }
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    );
};

export default Users;