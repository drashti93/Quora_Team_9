import axios from 'axios';
import cookie from 'react-cookies'
export const GET_PROFILE="getprofile";
export const CALL_COMPLETE="callcompletelogin";
export const GET_CHATS="getchatsinbox";
export const GET_USERS="getusers";
let rootUrl=process.env.REACT_APP_BACKEND_API_URL+":"+process.env.REACT_APP_BACKEND_API_PORT;
export function callcomplete(obj){
    return {
        type:CALL_COMPLETE,
        payload:obj
    }
}
export function requestMade(data){
    return {
        type:data,
        payload:""
    }
}
export function getprofile(userId){
    return (dispatch)=>{

            (async()=>{
                try{
                    dispatch(requestMade(GET_PROFILE));
                  let result = await axios.get(rootUrl+"/users/"+userId);
                  if(result.status===200){
                    dispatch(callcomplete({profile:result}));
                  }else{
                    dispatch(callcomplete({error:"Could not get profile details"}));
                  }     
                  }catch(error){
                  console.log(error);
                   }
            })();

       
    }
}
export function getChats(data){
    return (dispatch)=>{

        (async()=>{
            try{
                dispatch(requestMade(GET_USERS));
                let response=await axios.post(rootUrl+"/users/getchats",data);
                if(response.status===200){ 
                        dispatch(callcomplete({chatList:response.data}));
                }
            }catch(error){
                throw error;
            }
        })();
       
    }
}
export function getAllUsers(){
    return (dispatch)=>{

        (async()=>{
            try{
                dispatch(requestMade(GET_CHATS));
                let response=await axios.get(rootUrl+"/users/getallusers");
                if(response.status===200){ 
                        dispatch(callcomplete({userList:response.data}));
                        
                }
            }catch(error){
                throw error;
            }
        })();
       
    }
}
export function postmessage(obj){
    return (dispatch)=>{

        (async()=>{
            try{
                dispatch(requestMade(GET_CHATS));
                let response=await axios.post(rootUrl+"/users/message",obj);
                if(response.status===200){ 
                        dispatch(callcomplete({message:"Message posted successfully!"}));
                        // alert("message sent");
                        dispatch(getChats({uid:obj.uid}));
                }
            }catch(error){
                throw error;
            }
        })();
       
    }
}