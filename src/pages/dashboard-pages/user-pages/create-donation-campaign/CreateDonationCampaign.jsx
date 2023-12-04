import loginBg from '../../../../assets/images/login.jpg';
import { Formik, Form, Field } from 'formik';
import useAxiosPublic from '../../../../custom-hooks/useAxiosPublic';
import { useContext } from 'react';
import { UserAuth } from '../../../../authprovider/AuthProvider';
import useAxiosSecure from '../../../../custom-hooks/useAxiosSecure';
import swal from 'sweetalert';

const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const image_hosting_api = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`;

const CreateDonationCampaign = () => {
    const { user } = useContext(UserAuth);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();


    const handleFileUpload = async (setFieldValue, file) => {
        const data = new FormData();
        data?.append('file', file);
        data?.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        data?.append("cloud_name", cloudinaryCloudName);
        const res = await axiosPublic.post(image_hosting_api, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res?.data?.secure_url);
        if (res?.data?.secure_url) {
            setFieldValue('image', res.data.secure_url);
        }
    }
    return (
        <section style={{
            backgroundImage: `url(${loginBg}), linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))`,
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
        }} className="w-full min-h-screen h-full">
            <section className="w-full md:w-1/2 lg:w-1/3 mx-auto h-screen pt-24 pb-12">
                <section className="flex justify-center items-center">
                    <Formik
                        initialValues={{ image: '', name: '', maxAmount: '', lastDate: '', shortD: '', longD: '' }}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            // console.log(values, setSubmitting);
                            const donationCampaign = {
                                imageURL: values?.image,
                                name: values?.name,
                                maxAmount: values?.maxAmount,
                                donatedAmount: 0,
                                lastDate: values?.lastDate,
                                createdDate: new Date(),
                                shortDescription: values?.shortD,
                                longDescription: values?.longD,
                                email: user?.email,
                                isPaused: false
                            }
                            axiosSecure.post('/donation', donationCampaign)
                                .then(res => {
                                    console.log(res);
                                    swal(`Congratulations ${user?.displayName}`, `You have successfully added a donation campaign`, 'success');
                                    resetForm();
                                })
                                .catch(error => {
                                    console.log(error);
                                    swal('Error', `${error?.message}`, 'error');
                                });
                            setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form className="space-y-6">
                                <input className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="file" name="image" placeholder="Choose Image" onChange={(event) => handleFileUpload(setFieldValue, event.currentTarget.files[0])} required />
                                <Field className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="text" name="name" placeholder="Pet Name" required />
                                <Field className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="number" name="maxAmount" placeholder="Maximum Donation Amount" required />
                                <Field className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="date" name="lastDate" placeholder="Last Date" required />


                                <Field className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="text" name="shortD" placeholder="Short Description" required />
                                <Field as='textarea' className="w-full h-36 text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="text" name="longD" placeholder="Long Description" required />
                                <button className="w-full px-5 py-2 rounded-2xl bg-transparent hover:bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] " type="submit" disabled={isSubmitting}>Login</button>
                            </Form>
                        )}
                    </Formik>
                </section>
            </section>
        </section>

    );
};

export default CreateDonationCampaign;
