import PropTypes from 'prop-types';
import { useContext } from 'react';
import { UserAuth } from '../../../../authprovider/AuthProvider';
import useAxiosSecure from '../../../../custom-hooks/useAxiosSecure';
import swal from 'sweetalert';

const AdoptModal = ({ showModal, setShowModal, pet }) => {
    const { user } = useContext(UserAuth);
    const { imageURL } = pet;
    const axiosSecure = useAxiosSecure()

    const handleAdoption = e => {
        e?.preventDefault();
        const adoptInfo = {
            name: user?.displayName,
            email: user?.email,
            phone: e?.target?.phone?.value,
            location: e?.target?.address?.value,
            pet: pet,
            adoptedDate: new Date()
        }
        axiosSecure.post('/adopted', adoptInfo)
        .then(res => {
            console.log(res?.data);
            swal('congratulations', `${user?.displayName} you have successfully submitted adoption request ${pet?.name}`, 'success');
        })
        .catch(error => console.log(error));
        setShowModal(false);
    }
    return (
        <>
            {
                showModal &&
                <div style={{
                    backgroundImage: `url(${imageURL}), linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
                    backgroundBlendMode: 'overlay',
                    backgroundSize: 'auto auto',
                    // backgroundRepeat: 'no-repeat',
                    // backgroundAttachment: 'fixed'
                }} className="w-full md:w-1/2 lg:w-1/3 absolute z-10 rounded-xl shadow-2xl py-12 px-6">
                    <form onSubmit={handleAdoption} className='space-y-6'>
                        <input className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="text" name="name" defaultValue={user?.displayName} id="name" disabled />
                        <input className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="email" name="email" defaultValue={user?.email} id="photo" disabled />
                        <input className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="number" name="phone" placeholder="Phone" id="phone" required />
                        <input className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="text" name="address" placeholder="Address" id="password" required />
                        <input className="w-full px-5 py-2 rounded-2xl bg-transparent hover:bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] " type="submit" value="Submit" />
                    </form>
                    <button onClick={() => setShowModal(false)} className="w-full mt-6 px-5 py-2 rounded-2xl bg-transparent hover:bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">Cancel</button>
                </div>
            }
        </>

    );
};

AdoptModal.propTypes = {
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func,
    pet: PropTypes.object
}

export default AdoptModal;