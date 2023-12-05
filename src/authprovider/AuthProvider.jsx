import { GoogleAuthProvider, createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../custom-hooks/useAxiosPublic";

export const UserAuth = createContext({});
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // create user with and password
    const userWithEmail = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // sign in with email and password
    const loginWithEMail = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // continue with google
    const continueWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // setting user name
    const setUserName = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    // delete account
    const deleteAccount = (user) => {
        setLoading(true);
        return deleteUser(user);
    }

    // sign out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // getting user state
    useEffect(() => {
        const unsubscsribe = onAuthStateChanged(auth, (currentUser) => {
            const email = currentUser?.email || user?.email;
            const loggeduser = { email: email };
            console.log(currentUser)
            setUser(currentUser);
            setLoading(false);
            // if user exitst then issue a token
            if (loggeduser.email) {
                axiosPublic.post('/jwt', loggeduser)
                    .then(res => {
                        console.log('token response', res.data);
                    })
            } else {
                axiosPublic.post('/logout', loggeduser)
                    .then(res => {
                        console.log(res.data);
                    })
            }
        });
        return () => {
            unsubscsribe();
        }
    }, [user?.email])


    
    // context value
    const userInfo = {
        user,
        loading,
        setLoading,
        userWithEmail,
        loginWithEMail,
        continueWithGoogle,
        setUserName,
        deleteAccount,
        logOut
    };

    return (
        <UserAuth.Provider value={userInfo}>
            {children}
        </UserAuth.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;