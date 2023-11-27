import { useEffect, useRef, useState } from "react";
import useAxiosPublic from "../../../../../custom-routes/useAxiosPublic";
import ActionCard from "./ActionCard";
// import gsap from "gsap";


const CallToAction = () => {
    const axiosPublic = useAxiosPublic();
    const [cardInfo, setCardInfo] = useState([])
    const actionRef = useRef();

    useEffect(() => {
        // gsap.from(actionRef.current, {
        //     x: '100%',
        //     duration: 5,
        // })
        // gsap.to(actionRef.current, {
        //     x: '-100%',
        //     duration: 5
        // })
        // gsap.from(actionRef.current,
        //     {x: '100%', duration: 15, repeat: -1}
        //     // {x: '-75%', duration: 15, repeat: -1}
        // )
    }, [])

    useEffect(() => {
        axiosPublic.get('/call-to-action')
            .then(res => {
                console.log(res?.data);
                setCardInfo(res?.data);
            })
            .catch(error => console.log(error));
    }, [axiosPublic]);
    return (
        // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-24 overflow-hidden" ref={actionRef}>
        <div className="w-full overflow-hidden">
            <div className="mx-auto w-fit flex flex-nowrap gap-6 my-24" ref={actionRef}>
                {
                    // cardInfo?.map(info => <marquee className='w-fit' key={info?._id}><ActionCard info={info}></ActionCard></marquee>)
                    cardInfo?.map(info => <ActionCard key={info?._id} info={info}></ActionCard>)
                }
            </div>
        </div>

    );
};

export default CallToAction;