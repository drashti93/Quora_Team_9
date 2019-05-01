import {LOGIN_USER,CALL_COMPLETE} from '../actions/loginActions';
export default function loginReducer(state={},{type,payload}){
    switch(type){
        case LOGIN_USER:
        return{ 
            ...state,
            requestMessage:"Logging in..."
        }
        case CALL_COMPLETE:
        return{
            ...state,
            ...payload
        }
        default:
        return state;
    }
}