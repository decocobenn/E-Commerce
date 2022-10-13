import axios from 'axios';


const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const BaseUrl = process.env.REACT_APP_API_URL + '/api/';
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
    baseURL: BaseUrl,
})

export const userRequest = axios.create({
    method: 'METHOD',
    baseURL: BaseUrl,
    headers: {
        "token": `Bearer ${TOKEN}`,
    }
})
