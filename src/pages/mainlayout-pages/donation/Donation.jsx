import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../custom-hooks/useAxiosPublic";
import DonationCard from "./donation-card/DonationCard";


const Donation = () => {
    const axiosPublic = useAxiosPublic();

    const {data: donations = []} = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosPublic.get('/donation');
            return res?.data;
        }
    })
    return (
        <div className="mx-4 md:mx-12 lg:mx-24 mt-4 py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 rounded-xl">
            {
                donations?.map(donation => <DonationCard key={donation?._id} donation={donation}></DonationCard>)
            }
        </div>
    );
};

export default Donation;