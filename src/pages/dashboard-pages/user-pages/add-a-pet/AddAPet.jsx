import loginBg from '../../../../assets/images/login.jpg';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import useAxiosPublic from '../../../../custom-hooks/useAxiosPublic';
import { useContext } from 'react';
import { UserAuth } from '../../../../authprovider/AuthProvider';
import useAxiosSecure from '../../../../custom-hooks/useAxiosSecure';
import swal from 'sweetalert';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddAPet = () => {
    const {user} = useContext(UserAuth);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const options = [
        { value: 'Dog', label: 'Dog' },
        { value: 'Cat', label: 'Cat' },
        { value: 'Rabbit', label: 'Rabbit' },
        { value: 'Fish', label: 'Fish' }
    ]

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
                    <Formik
                        initialValues={{ image: '', name: '', age: '', category: '', location: '', shortD: '', longD: '' }}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            console.log(values, setSubmitting);
                            const pet = {
                                imageURL: values?.image,
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
                            axiosSecure.post('/pets', pet)
                            .then(res => {
                                console.log(res);
                                swal(`Congratulations ${user?.displayName}`, `You have successfully added ${pet?.name} as a pet to adopt`, 'success');
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
                                <Field className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="text" name="name" placeholder="Name" required />
                                <Field className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="number" name="age" placeholder="Age" required />
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
                                <Field className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="text" name="location" placeholder="Location" required />
                                <Field className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="text" name="shortD" placeholder="Short Description" required />
                                <Field as='textarea' className="w-full h-36 text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="text" name="longD" placeholder="Long Description" required />
                                <button className="w-full px-5 py-2 rounded-2xl bg-transparent hover:bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] " type="submit" disabled={isSubmitting}>Add</button>
                            </Form>
                        )}
                    </Formik>
                </section>
            </section>
        </section>

    );
};

export default AddAPet;
