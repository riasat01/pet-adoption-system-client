import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { FcGoogle } from 'react-icons/fc';
import { UserAuth } from "../../../../authprovider/AuthProvider";
import loginBg from '../../../../assets/images/login.jpg';
import useAxiosPublic from "../../../../custom-hooks/useAxiosPublic";

const Login = () => {
    const { user, setLoading, loginWithEMail, continueWithGoogle } = useContext(UserAuth);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    // where to re route
    const location = useLocation();
    // console.log(`State from login ${location?.state}`)

    // sign in user
    const handleSignIn = (e) => {
        e?.preventDefault();
        loginWithEMail(e?.target?.email?.value, e?.target?.password?.value)
            .then(userCredintial => {
                console.log(userCredintial.user);
                swal(`Congratulation ${user?.displayName ? user?.displayName : ``}`, `You have successfully signed in`, `success`)
                location?.state ? navigate(`${location?.state}`) : navigate(`/`);
            })
            .catch(error => {
                swal(`Error`, error.message, `error`);
                setLoading(false);
            })
    }

    const handlethirdPartySignIn = (callback) => {
        console.log(callback, typeof callback);
        callback()
            .then(userCredential => {
                console.log(userCredential.user);
                axiosPublic.post('/user', { imageURL: userCredential?.user?.photoURL, name: userCredential?.user?.displayName, email: userCredential?.user?.email, role: 'user' })
                    .then(res => {
                        console.log(res);
                        setLoading(false);
                        swal(`Congratulation ${userCredential?.user?.user?.displayName}`, `You have successfully signed in with Google`, `success`)
                        location?.state ? navigate(`${location?.state}`) : navigate(`/`);
                    })

            })
            .catch(error => {
                swal(`Error`, error.message, `error`);
                setLoading(false);
            })
    }
    return (
        <section style={{
            backgroundImage: `url(${loginBg}), linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))`,
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
        }} className="w-screen h-screen">
            <section className="w-full md:w-1/2 lg:w-1/3 mx-auto h-screen pt-48 pb-12">
                <section className="flex justify-center items-center">
                    <form onSubmit={handleSignIn} className="space-y-6">
                        <input className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="email" name="eamil" placeholder="Email" id="email" required />
                        <input className="w-full text-white rounded-2xl py-2 px-4 bg-slate-400 bg-opacity-70" type="password" name="password" placeholder="Password" id="password" required />
                        <input className="w-full px-5 py-2 rounded-2xl bg-transparent hover:bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[1px_-1px_1rem_0px_pink] " type="submit" value="Login" />
                        <p className="text-white">New here? Please <Link to='/login/register' className="font-semibold text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text border-b-2 border-pink-600">Register</Link></p>
                    </form>
                </section>
                <fieldset className="border-t border-slate-600 my-6">
                    <legend className="text-center px-1 text-white">Or continue with</legend>
                </fieldset>
                <section className="flex justify-center items-center">
                    <FcGoogle onClick={() => handlethirdPartySignIn(continueWithGoogle)} className="text-4xl w-fit"></FcGoogle>
                </section>
            </section>

        </section>

    );
};

export default Login;