import { GLOBAL_API } from '../actionsTypes/types';
import Axios from "axios";


export const logIn = async (obj) => {
    return Axios.post(`${GLOBAL_API}/auth/login`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}

export const signUpStepOne = async (obj) => {
    debugger
    return Axios.post(`${GLOBAL_API}/auth/signup`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}
export const signUpStepTwo = async (obj) => {
    debugger
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    return Axios.post(`${GLOBAL_API}/user/update`, obj, config).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}
export const forgotPasswordApi = async (obj) => {
    return Axios.post(`${GLOBAL_API}/auth/gen-reset-token`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}
export const checkResetTokenApi = async (obj) => {
    return Axios.post(`${GLOBAL_API}/auth/reset-token`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}

export const resetPasswordApi = async (obj) => {
    return Axios.post(`${GLOBAL_API}/auth/reset-password`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}

export const dashBoard = async (obj) => {
    return Axios.post(`${GLOBAL_API}/user/dashboard`, obj).then((response) => {
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


export const checkAppointment = async (obj) => {
    return Axios.post(`${GLOBAL_API}/appointment/check-book-now`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}

export const confirmAppointment = async (obj) => {
    return Axios.post(`${GLOBAL_API}/appointment/book-now`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}

