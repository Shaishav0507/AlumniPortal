import Axios from 'axios';
import {GLOBAL_API} from '../../actionsTypes/types'


export const feedbackAction =async (obj)=>{
   return Axios.post(`${GLOBAL_API}/user/feedback`,obj).then(data=>{
    console.log(data)
   }).catch(err=>{
       console.log(err)
   })
}
