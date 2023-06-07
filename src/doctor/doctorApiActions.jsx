import { GLOBAL_API} from '../actionsTypes/types';
import Axios from "axios";

export const logIn = async (obj) => {
    return Axios.post(`${GLOBAL_API}/auth/login`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}

export const signUpStepOne =async (obj)=>{
    return Axios.post(`${GLOBAL_API}/auth/signup`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
   
}

export const removeAppointmentData = async (obj) => {
    return Axios.post(`${GLOBAL_API}/appointment/update`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}

export const signUpStepTwo =async (obj)=>{
    return Axios.post(`${GLOBAL_API}/user/update`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}

export const forgotPasswordApi =async()=>{

}

export const checkResetTokenApi =async ()=>{
return true
}

export const resetPasswordApi =async ()=>{

}

export const dashBoard = async (obj) => {
    return Axios.post(`${GLOBAL_API}/user/dashboard`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}

