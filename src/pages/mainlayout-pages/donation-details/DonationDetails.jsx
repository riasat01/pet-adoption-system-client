import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../custom-hooks/useAxiosSecure";
import { useEffect, useState } from "react";


const DonationDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [donation, setDonation] = useState({})

    useEffect(() => {
        axiosSecure.get(`/donation/id/${id}`)
            .then(res => {
                console.log(res?.data);
                setDonation(res?.data);
            })
            .catch(error => console.log(error));
    }, [])
    return (
        <div className='w-full md:w-1/2 lg:w-1/3 mx-4 md:mx-auto my-24 flex flex-col gap-2 p-4 rounded-lg shadow-xl font-comforta'>
            <img className='h-64 w-full rounded-lg' src={donation?.imageURL} alt={`image of ${donation?.name}`} />
            <h2><span className="font-bold">Pet Name: </span>{donation?.name}</h2>
            <p><span className="font-bold">Donated: </span>${donation?.donatedAmount}</p>
            <p><span className="font-bold">Maximum Donation: </span>${donation?.maxAmount}</p>
            <button className='px-5 py-1 my-1 rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[0px_5px_2rem_1px_pink] font-comforta'>Show Details</button>
        </div>
    );
};

export default DonationDetails;