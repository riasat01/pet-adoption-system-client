import PropTypes from 'prop-types';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '../checkout-form/CheckOutForm';
import { useState } from 'react';
import swal from 'sweetalert';

const stripePromise = await loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);

const DonationModal = ({ showModal, setShowModal, donation }) => {
    const { imageURL } = donation;
    const [price, setPrice] = useState(0);
    const [proceed, setProceed] = useState(false);
    const handleProceed = () => {
        if(price){
            setProceed(true);
        }else{
            setProceed(false);
            swal('Error', 'Amount must be greater than 0', 'error');
        }
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
                    <input onBlur={(e) => setPrice(e?.target?.value)} className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="number" name="amount" placeholder="Enter Amount" id="amount" />
                    <button onClick={handleProceed} className={`w-full mt-6 px-5 py-2 rounded-2xl bg-transparent hover:bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ${proceed ? 'hidden' : 'block'}`}>Proceed</button>
                    {
                        proceed ?
                            <Elements stripe={stripePromise}>
                                <CheckOutForm price={price} setShowModal={setShowModal} donation={donation}></CheckOutForm>
                            </Elements>
                            :
                            <></>
                    }

                    <button onClick={() => setShowModal(false)} className="w-full mt-6 px-5 py-2 rounded-2xl bg-transparent hover:bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">Cancel</button>
                </div>
            }
        </>
    );
};

DonationModal.propTypes = {
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func,
    donation: PropTypes.object
}

export default DonationModal;