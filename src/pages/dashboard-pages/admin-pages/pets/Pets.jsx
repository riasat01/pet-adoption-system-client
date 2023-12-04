import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../custom-hooks/useAxiosSecure";
import swal from "sweetalert";
import { Link } from "react-router-dom";


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

    const handleAdopt = id => {
        axiosSecure.put(`/pets/updatestatus/${id}`)
            .then(res => {
                console.log(res);
                swal('Congratulations', 'successfully updated adoption status', 'success');
                refetch();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleNotAdopt = id => {
        axiosSecure.put(`/pets/makeNotAdopted/${id}`)
            .then(res => {
                console.log(res);
                swal('Congratulations', 'successfully updated adoption status', 'success');
                refetch();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleDelete = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axiosSecure.delete(`/pets/${id}`)
                        .then(res => {
                            console.log(res);
                            swal("Poof! Pet has been deleted!", {
                                icon: "success",
                            });
                            refetch();
                        })
                        .catch(error => console.log(error));
                } else {
                    swal("Your pet is safe!");
                }
            });
    }


    return (
        <table className="w-full text-center mt-24">
            <thead>
                <tr>
                    <th>Pet Name</th>
                    <th>Owner Email</th>
                    <th>Pet Photo</th>
                    <th>Pet Status</th>
                    <th>Pet Status Update</th>
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
                            {
                                pet?.adopted ?
                                    <p className="text-green-500">Adopted</p>
                                    :
                                    <p className="text-red-500">Not adopted</p>
                            }
                        </td>
                        <td>
                            {
                                pet?.adopted ?
                                    <button onClick={() => handleNotAdopt(pet?._id)} className="w-full px-5 py-2 rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">Make Not-adopted</button>
                                    :
                                    <button onClick={() => handleAdopt(pet?._id)} className="w-full px-5 py-2 rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">Make Adopted</button>
                            }

                        </td>
                        <td>
                            <Link to={`/dashboard/update-a-pet/${pet?._id}`}>
                                <button className="w-full px-5 py-2 rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">Update</button>
                            </Link>
                        </td>
                        <td>
                            <button onClick={() => handleDelete(pet?._id)} className="w-full px-5 py-2 rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">Delete</button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    );
};

export default Pets;