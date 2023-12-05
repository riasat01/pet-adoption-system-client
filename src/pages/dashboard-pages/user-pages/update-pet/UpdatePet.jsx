import loginBg from '../../../../assets/images/login.jpg';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import useAxiosPublic from '../../../../custom-hooks/useAxiosPublic';
import { useContext, useEffect, useState } from 'react';
import { UserAuth } from '../../../../authprovider/AuthProvider';
import useAxiosSecure from '../../../../custom-hooks/useAxiosSecure';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdatePet = () => {
    const { id } = useParams();
    const [pet, setPet] = useState();
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserAuth);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const options = [
        { value: 'Dog', label: 'Dog' },
        { value: 'Cat', label: 'Cat' },
        { value: 'Rabbit', label: 'Rabbit' },
        { value: 'Fish', label: 'Fish' }
    ]

    useEffect(() => {
        axiosPublic.get(`/pets/${id}`)
            .then(res => {
                // console.log(res?.data);
                setPet(res?.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, [])

    const handleFileUpload = async (setFieldValue, file) => {
        const imageFile = { image: file };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            setFieldValue('image', res.data.data.display_url);
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
                    {
                        loading ?
                            <div className="">loading</div>
                            :
                            <Formik
                                initialValues={{ image: '', name: `${pet?.name}`, age: `${pet?.age}`, category: `${pet?.category}`, location: `${pet?.location}`, shortD: `${pet?.shortDescription}`, longD: `${pet?.longDescription}` }}
                                onSubmit={(values, { setSubmitting }) => {
                                    console.log(values, setSubmitting);
                                    const updatedPet = {
                                        imageURL: values?.image || pet?.imageURL,
                                        name: values?.name,
                                        age: values?.age,
                                        location: values?.location,
                                        category: values?.category,
                                        date: new Date(),
                                        adopted: false,
                                        shortDescription: values?.shortD,
                                        longDescription: values?.longD,
                                        email: user?.email
                                    }
                                    // console.log(values?.image);
                                    // console.log(updatedPet);
                                    axiosSecure.put(`/pets/${pet?._id}`, updatedPet)
                                        .then(res => {
                                            console.log(res);
                                            swal(`Congratulations ${user?.displayName}`, `You have successfully updated ${updatedPet?.name}`, 'success')
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
                                        <input className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="file" name="image" placeholder="Choose Image" onChange={(event) => handleFileUpload(setFieldValue, event.currentTarget.files[0])}  />
                                        <Field className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="text" name="name"  />
                                        <Field className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="number" name="age"  />
                                        <Field
                                            name="category"
                                            options={options}
                                            component={({ field }) => (
                                                <Select
                                                    options={options}
                                                    name={field.name}
                                                    value={options ? options.find(option => option.value === field.value) : ''}
                                                    onChange={(option) => setFieldValue(field.name, option.value)}
                                                />
                                            )}
                                        />
                                        <Field className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="text" name="location"  />
                                        <Field className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="text" name="shortD"  />
                                        <Field as='textarea' className="w-full h-36 text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="text" name="longD"  />
                                        <button className="w-full px-5 py-2 rounded-2xl bg-transparent hover:bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] " type="submit" disabled={isSubmitting}>Update</button>
                                    </Form>
                                )}
                            </Formik>
                    }

                </section>
            </section>
        </section>

    );
};

export default UpdatePet;
