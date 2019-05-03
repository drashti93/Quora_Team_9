import {SIGNUP_USER,CALL_COMPLETE,SIGNUP_RESET} from '../actions/signupActions';
export default function signupReducer(state={},{type,payload}){
    switch(type){
        case SIGNUP_USER:
        return{
            ...state,
            requestMessage:"Signing Up..."
        };
        case CALL_COMPLETE:
        return {
            ...state,
            ...payload
        };
        case SIGNUP_RESET:
        return {
            ...state,
            signupSuccess:payload.signupSuccess
        };
        default:
        return state;
    }
}