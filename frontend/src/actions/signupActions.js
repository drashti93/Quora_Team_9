import axios from 'axios';
export const SIGNUP_USER="signupuser";
export const SIGNUP_RESET="signupreset";
export const CALL_COMPLETE="callcompletesignup";
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
export function signupreset(){
    return {
        type:SIGNUP_RESET,
        payload:{signupSuccess:0}
    }
}

export function signupuser(data){
    return (dispatch)=>{
        (async()=>{
            try{
                dispatch(requestMade(SIGNUP_USER));
                let result = await axios.post(rootUrl+"/signup",data);
                if(result.status===200 && result.data.insertStatus===1){
                alert("Sign Up Successfull! Redirecting to Login Page !")
                dispatch(callcomplete({signupSuccess:1,message:result.data.message}));
                }else{
                    alert(result.data.message);     
                     dispatch(callcomplete({signupSuccess:0,message:result.data.message}));
                    
                }
                }catch(error){
                    alert(error);    
                }
        })();
    }
}