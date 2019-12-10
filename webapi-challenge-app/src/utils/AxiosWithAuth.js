import axios from "axios";


const token = localStorage.getItem('token');

export const axiosWithAuth = () => {    

    return axios.create({
        baseURL: 'http://localhost:6000/api',
        headers:{
            Authorization: token
        }
    });
};