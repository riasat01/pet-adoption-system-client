import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../custom-hooks/useAxiosSecure";
import { useContext } from "react";
import { UserAuth } from "../../../../authprovider/AuthProvider";
import swal from "sweetalert";


const AdoptionRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(UserAuth);

    const { data: allAdoptions = [], refetch } = useQuery({
        queryKey: ['allDonation'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/adopted/${user?.email}`)
                return res?.data;
            } catch (error) {
                console.log(error);
            }

        },
    })

    const handleAccept = (id) => {
        axiosSecure.put(`/pets/${id}`, { adopted: true })
            .then(res => {
                console.log(res);
                axiosSecure.put(`/adopted/${id}`, { adopted: true })
                    .then(res => {
                        console.log(res);
                        refetch();
                        swal('Congrarulations', 'Pet adopted successfully', 'success');
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }

    const handleReject = id => {
        axiosSecure.delete(`/adopted/${id}`)
        .then(res => {
            console.log(res);
            axiosSecure.put(`/pets/makeNotAdopted/${id}`, { adopted: false })
            .then(res => {
                console.log(res);
                refetch();
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }

    return (
        <table className="w-full overflow-x-auto text-center mt-24">
            <thead>
                <tr>
                    <th>Pet Name</th>
                    <th>Person Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    allAdoptions?.map(request => <tr key={request?._id}>
                        <td>{request?.pet?.name}</td>
                        <td>{request?.name}</td>
                        <td>{request?.email}</td>
                        <td>{request?.phone}</td>
                        <td>{request?.location}</td>
                        <td>
                            {
                                request?.pet?.adopted ?
                                    <p className="text-green-500">Adopted</p>
                                    :
                                    <button onClick={() => handleAccept(request?.pet?._id)} className="w-full px-5 py-2 rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">Accept</button>
                            }
                        </td>
                        <td>
                            <button onClick={() => handleReject(request?.pet?._id)} className="w-full px-5 py-2 rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink]">Reject</button>
                        </td>
                    </tr>)
                }
            </tbody>

        </table>
    );
};

export default AdoptionRequests;