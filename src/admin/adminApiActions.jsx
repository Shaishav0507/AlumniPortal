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
    return Axios.post(`${GLOBAL_API}/admin/signup`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}

export const signUpStepTwo = async (obj) => {
    return Axios.post(`${GLOBAL_API}/user/update`, obj).then((response) => {
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
    return Axios.post(`${GLOBAL_API}/admin/list-all-appointments`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}

export const allDoctors = async (obj) => {
    return Axios.post(`${GLOBAL_API}/admin/list-all/doctors`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}
export const approveDoctor = async (obj) => {
    return Axios.post(`${GLOBAL_API}/admin/update-doctor`, obj).then((response) => {
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

export const removeAppointmentData = async (obj) => {
    return Axios.post(`${GLOBAL_API}/appointment/update`, obj).then((response) => {
        return response
    })
        .catch((error) => {
            console.log(error);
        });
}

