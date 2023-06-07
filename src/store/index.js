import {createStore, combineReducers} from "redux";
import commonReducer from '../reducers/commonReducer';


let reducer =combineReducers({
   
    common: commonReducer,
});

 const appstore = createStore(reducer)

 export default appstore;