import { GLOBAL_API } from '../../../actionsTypes/types';
import Axios from "axios";


export const logIn = async (obj) => {
    return Axios.post(`${GLOBAL_API}/auth/login`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}

export const signUp = async (obj) => {
    return Axios.post(`${GLOBAL_API}/auth/signup`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}

export const changePassword = async (obj) => {
    return Axios.post(`${GLOBAL_API}/user/change-password`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}