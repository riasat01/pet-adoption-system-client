import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../custom-hooks/useAxiosSecure";
import AdoptModal from "./adopt-modal/AdoptModal";


const PetDetails = () => {
    const { id } = useParams();
    const [pet, setPet] = useState({});
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        axiosSecure.get(`/pets/${id}`)
            .then(res => {
                setPet(res?.data);
            })
            .catch(error => console.log(error));
    }, [])

    const { imageURL, name, age, location, date, category } = pet;
    const postedDate = new Date(date);
    return (
        <div className='w-full md:w-1/2 lg:w-1/3 mx-0 md:mx-auto my-24 flex flex-col gap-2 p-4 rounded-lg shadow-xl font-comforta'>
            <img className='h-96 w-full rounded-lg' src={imageURL} alt={`image of ${name} the ${category}`} />
            <h2><span className="font-bold">Name: </span>{name}</h2>
            <p><span className="font-bold">Age: </span>{age}</p>
            <p><span className="font-bold">Address: </span>{location}</p>
            <p><span className="font-bold">Posted at: </span>{postedDate?.toUTCString().slice(0, 16)}</p>
            <p><span className='font-bold'>Time: </span>{postedDate?.toUTCString().slice(17)}</p>
            <button onClick={() => setShowModal(true)} className='px-5 py-1 my-1 rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[0px_5px_2rem_1px_pink] font-comforta'>Adopt</button>
            <AdoptModal showModal={showModal} setShowModal={setShowModal} pet={pet}></AdoptModal>
        </div>
    );
};

export default PetDetails;