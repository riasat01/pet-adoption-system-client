import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../custom-routes/useAxiosSecure";


const PetDetails = () => {
    const { id } = useParams();
    const [pet, setPet] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/pets/${id}`)
            .then(res => {
                setPet(res?.data);
            })
            .catch(error => console.log(error));
    }, [])
    const { _id, imageURL, name, age, location, date, category } = pet;
    const postedDate = new Date(date);
    return (
        <div className='w-full md:w-1/2 lg:w-1/3 mx-4 md:mx-auto my-24 flex flex-col gap-2 p-4 rounded-lg shadow-xl font-comforta'>
            <img className='h-96 w-full rounded-lg' src={imageURL} alt={`image of ${name} the ${category}`} />
            <h2><span className="font-bold">Name: </span>{name}</h2>
            <p><span className="font-bold">Age: </span>{age}</p>
            <p><span className="font-bold">Address: </span>{location}</p>
            <p><span className="font-bold">Posted at: </span>{postedDate?.toUTCString().slice(0, 16)}</p>
            <p><span className='font-bold'>Time: </span>{postedDate?.toUTCString().slice(17)}</p>
            {/* <Button text={'Adopt'}></Button> */}
        </div>
    );
};

export default PetDetails;