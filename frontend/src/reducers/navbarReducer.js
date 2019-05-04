import {GET_PROFILE,CALL_COMPLETE} from '../actions/navbarActions';
export default function navbarReducer(state={chatList:[],userList:[],topics:[],questions:[]},{type,payload}){
    switch(type){
        case GET_PROFILE:
        return{ 
            ...state,
            requestMessage:"getting profile details..."
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