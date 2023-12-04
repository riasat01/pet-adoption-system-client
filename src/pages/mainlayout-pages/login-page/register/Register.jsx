import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { UserAuth } from "../../../../authprovider/AuthProvider";
import registerBg from '../../../../assets/images/register.jpg';
import useAxiosPublic from '../../../../custom-hooks/useAxiosPublic'


const Register = () => {
    const { setLoading, userWithEmail, setUserName } = useContext(UserAuth);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    // where to re route
    const location = useLocation();

    // register user
    const handleRegister = (e) => {
        e?.preventDefault();
        const name = e?.target?.name?.value;
        const email = e?.target?.email?.value;
        const photo = e?.target?.photo?.value;
        const password = e?.target?.password?.value;
        if (password.length < 6) {
            swal(`Error`, `Password must be at 6 characters long`, `error`);
            return;
        } else if (!(/[A-Z]/.test(password))) {
            swal(`Error`, `Password must contain at least one capital letter`, `error`);
            return;
        } else if (!/[!@#$%^&*]/.test(password)) {
            swal(`Error`, `Password must contain at least one of these !@#$%^&* characters`, `error`);
            return;
        }
        userWithEmail(email, password)
            .then(userCredential => {
                // console.log(userCredential.user);
                setUserName(name, photo)
                    .then(() => {
                        // console.log(`user name updated`);
                        axiosPublic.post('/user', {imageURL: userCredential?.user?.photoURL, name: userCredential?.user?.displayName, email: userCredential?.user?.email, role: 'user'})
                        .then(res => {
                            console.log(res);
                            setLoading(false);
                            swal(`Congratulation ${userCredential?.user?.displayName}`, `You have successfully registered`, `success`)
                            location?.state ? navigate(`${location?.state}`) : navigate(`/`);
                        })
                        .catch(error => console.log(error));
                    })
                    .catch(error => {
                        swal(`Error`, error.message, `error`);
                        setLoading(false);
                    })
            })
            .catch(error => {
                swal(`Error`, error.message, `error`);
                setLoading(false);
            })
    }
    return (
        <section style={{
            backgroundImage: `url(${registerBg}), linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))`,
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
        }} className="w-screen h-screen">
            <section className="w-full md:w-1/2 lg:w-1/3 mx-auto h-screen text-white pt-48 pb-12">
                <section className="flex justify-center items-center">
                    <form onSubmit={handleRegister} className="space-y-6">
                        <input className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="text" name="name" placeholder="Name" id="name" required />

                        <input className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="text" name="photo" placeholder="Photo URL" id="photo" required />
                        <input className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="email" name="eamil" placeholder="Email" id="email" required />
                        <input className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="password" name="password" placeholder="Password" id="password" required />
                        <input className="w-full px-5 py-2 rounded-2xl bg-transparent hover:bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] " type="submit" value="Register" />
                        <p>Already have an account? Please <Link to='/login' className="font-semibold text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text border-b-2 border-pink-600">Login</Link></p>
                    </form>
                </section>
            </section>
        </section>

    );
};

export default Register;