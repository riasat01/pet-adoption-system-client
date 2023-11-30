import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../custom-hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import PetCard from "./pet-card/PetCard";
import PetBanner from "./pet-banner/PetBanner";
import { useState } from "react";


const PetListings = () => {
    const { category } = useParams();
    const [filter, setFilter] = useState(category);
    const axiosPublic = useAxiosPublic();
    const [name, setName] = useState('');

    const { data: pets = [] } = useQuery({
        queryKey: ["pets", filter, name],
        queryFn: async () => {
            if (name) {
                const res = await axiosPublic.get(`/pets?name=${name}`)
                return res?.data;
            } else if (filter === 'all') {
                const res = await axiosPublic.get('/pets');
                return res?.data;
            } else {
                const res = await axiosPublic.get(`/pets?category=${filter}`)
                return res?.data;
            }
        }
    })
    const handleFilter = e => {
        setName('');
        setFilter(e?.target?.value);
    }
    return (
        <section className="font-comforta">
            <PetBanner setName={setName}></PetBanner>
            <section className="flex justify-end items-center py-8 pr-4 md:pr-12 lg:pr-24">
                <select onChange={handleFilter} name="" id="">
                    <option value={filter}>{filter}</option>
                    <option value="all">All</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Fish">Fish</option>
                </select>
            </section>
            <div className="mx-4 md:mx-12 lg:mx-24 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 rounded-xl">
                {
                    pets?.map(pet => <PetCard key={pet?._id} pet={pet}></PetCard>)
                }
            </div>
        </section>
    );
};

export default PetListings;