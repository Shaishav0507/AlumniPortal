import {GLOBAL_LOADER, GLOBAL_ALERT, GLOBAL_ALERT_REMOVE, GLOBAL_API} from '../actionsTypes/types';
import Axios from "axios";

import appstore from '../store/index';

export const globalLoader=(value)=>{

    appstore.dispatch({
        type:GLOBAL_LOADER,
        payload:value,
    })     

}

export const globalAlert=(alertType, msg)=>{
    appstore.dispatch({
        type:GLOBAL_ALERT,
        payload:alertType,
        msg:msg,
    }) 
}

export const globalAlertRemove=()=>{
    appstore.dispatch({
        type:GLOBAL_ALERT_REMOVE,
        
    }) 
}

export const locationList=()=>{
    return Axios.get(`${GLOBAL_API}/office/list-offices`).then((response) => {
        return response
    })
    .catch((error) => {
            console.log(error);
        });
}


export const appointmentList=()=>{
    return Axios.get(`${GLOBAL_API}/appointment/list-types`).then((response) => {
        return response
    })
    .catch((error) => {
            console.log(error);
        });
}







