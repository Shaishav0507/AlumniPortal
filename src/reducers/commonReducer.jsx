import {GLOBAL_LOADER, GLOBAL_ALERT, GLOBAL_ALERT_REMOVE} from '../actionsTypes/types';

const INITIAL_STATE ={
loader:false,
alertArray:[],
alertArrayLength:0,
}

export default function (state=INITIAL_STATE, action){
    switch (action.type){
        case GLOBAL_LOADER:{
            return{
                ...state,
                loader:action.payload,
            };
        }

        case GLOBAL_ALERT:{
            let obj={
                alertType:action.payload,
                alertMessage:action.msg,
            }
        
            return{
                ...state,
                alertArray:[...state.alertArray ,obj],             
            };
        }

        case  GLOBAL_ALERT_REMOVE:{
            let arr= state.alertArray;
            if(arr.length )state.alertArray.shift()

            return{
                ...state,
                alertArray: [...arr]
                }
        }
        default:
        return state
    }


}