import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { UserAuth } from "../../../../authprovider/AuthProvider";
import useAxiosSecure from "../../../../custom-hooks/useAxiosSecure";
import PropTypes from "prop-types";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ price, setShowModal, donation }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(UserAuth);
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log(parseInt(price));
        axiosSecure.post('/create-payment-intent', { price: parseInt(price) })
            .then(res => {
                console.log(res?.data?.clientSecret);
                setClientSecret(res?.data?.clientSecret);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const handleSubmit = async e => {
        e?.preventDefault();
        if (!stripe || !elements) {
            console.log('1')
            return;
        }
        const card = elements?.getElement(CardElement);
        if (card === null) {
            console.log(2)
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log(4);
            console.log(error);
        } else {
            console.log('[paymentMethod]', paymentMethod);
        }

        // confirm card payment
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                  }
            }
        })

        if(confirmError){
            console.log('confirm error', confirmError);
        }else{
            console.log('payment intent', paymentIntent);
            if(paymentIntent?.status === "succeeded"){
                swal(`Congratulations ${user?.displayName}`, `Your donation is successfull transaction id: ${paymentIntent?.id}`, 'success');
                const data = {
                    name: user?.displayName,
                    email: user?.email,
                    transactionId: paymentIntent?.id,
                    donatedAmount: price,
                    donation: donation
                }
                axiosSecure.post('/donator', data)
                .then(res => {
                    console.log(res);
                    axiosSecure.put(`/donation/donated/${donation?._id}`, {needToAdd: true, amount: price})
                    .then(res => {
                        console.log(res);
                        setShowModal(false);
                        navigate('/donation-campaigns');
                    })
                    .catch(error => {
                        console.log(error);
                    })
                })
                .catch(error => {
                    console.log(error);
                })
            }
        }
    }
    return (
        <form onSubmit={handleSubmit} className="my-4 space-y-5">
            <input className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="text" name="name" defaultValue={user?.displayName} id="name" disabled />
            <input className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="email" name="email" defaultValue={user?.email} id="photo" disabled />
            <CardElement
                options={{
                    style: {
                        base: {
                            backgroundColor: 'rgba(100,116,139,0.7)',
                            fontSize: '16px',
                            color: 'white',
                            '::placeholder': {
                                color: 'white',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret} className="w-full mt-6 px-5 py-2 rounded-2xl bg-transparent hover:bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] ">
                Pay
            </button>
        </form>
    );
};

CheckOutForm.propTypes = {
    price: PropTypes.string,
    setShowModal: PropTypes.func,
    donation: PropTypes.object
}

export default CheckOutForm;