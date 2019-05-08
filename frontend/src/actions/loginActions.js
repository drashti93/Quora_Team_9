import axios from 'axios';
import cookie from 'react-cookies'
export const LOGIN_USER="loginuser";
export const CALL_COMPLETE="callcompletelogin";
export const LOGOUT_USER="logoutuser";
let rootUrl=process.env.REACT_APP_BACKEND_API_URL+":"+process.env.REACT_APP_BACKEND_API_PORT;
export function logoutuser(){
    cookie.remove("cookie",{path:"/"});
    return {
        type:LOGOUT_USER,
        payload:""
    }
}
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
export function loginuser(data){
    return (dispatch)=>{

            (async()=>{
                try{
                    dispatch(requestMade(LOGIN_USER));
                    axios.defaults.withCredentials=true;
                  let result = await axios.post(rootUrl+"/login",data);
                  if(result.status===200 && result.data.loginSuccess===1){
                    console.log("Login successfull");
                    console.log("cookie.load -------->",cookie.load("cookie"));
                    localStorage.setItem('token', result.data.token);
                    dispatch(callcomplete({loginSuccess:1,message:"Login Successful !"}));
                  }else{
                    // this.setState({
                    //   message:result.data.message
                    // });
                    alert(result.data.message);
                    dispatch(callcomplete({loginSuccess:0,message:result.data.message}));
                  }     
                  }catch(error){
                  console.log("error"+error);
                  alert(error);
                   }
            })();

       
    }
}