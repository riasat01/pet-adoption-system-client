import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://pets-n-pals-server.vercel.app'
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;