import axios from 'axios';
import cookie from 'react-cookies'
export const GET_PROFILE = "getprofile";
export const CALL_COMPLETE = "callcompletelogin";
export const GET_CHATS = "getchatsinbox";
export const GET_USERS = "getusers";
export const GET_QUESTIONS = "getquestions";
export const POST_QUESTION = "postquestion";
export const GET_TOPICS = "gettopics";
let rootUrl = process.env.REACT_APP_BACKEND_API_URL + ":" + process.env.REACT_APP_BACKEND_API_PORT;
export function callcomplete(obj) {
    return {
        type: CALL_COMPLETE,
        payload: obj
    }
}
export function requestMade(data) {
    return {
        type: data,
        payload: ""
    }
}
export function getalltopics() {
    return (dispatch) => {

        (async () => {
            try {
                dispatch(requestMade(GET_TOPICS));
                let result = await axios.get(rootUrl + "/topics");
                if (result.status === 200) {
                    dispatch(callcomplete({ topics: result.data }));
                } else {
                    dispatch(callcomplete({ error: "Could not get topic details" }));
                }
            } catch (error) {
                console.log(error);
            }
        })();


    }
}
export function getallquestions() {
    return (dispatch) => {

        (async () => {
            try {
                dispatch(requestMade(GET_QUESTIONS));
                let result = await axios.get(rootUrl + "/questions/allquestions");
                if (result.status === 200) {
                    dispatch(callcomplete({ questions: result.data }));
                } else {
                    dispatch(callcomplete({ error: "Could not get questions details" }));
                }
            } catch (error) {
                console.log(error);
            }
        })();


    }
}
export function postQuestion(data) {
    return (dispatch) => {

        (async () => {
            try {
                dispatch(requestMade(POST_QUESTION));
                let result = await axios.post(rootUrl + "/questions",data);
                if (result.status === 200) {
                    alert("Question Posted Successfully!")
                   // dispatch(callcomplete({ topics: result }));
                } else {
                    dispatch(callcomplete({ error: "Could not post question" }));
                }
            } catch (error) {
                console.log(error);
            }
        })();


    }
}
export function getprofile(userId) {
    return (dispatch) => {

        (async () => {
            try {
                dispatch(requestMade(GET_PROFILE));
                let result = await axios.get(rootUrl + "/users/" + userId);
                if (result.status === 200) {
                    dispatch(callcomplete({ profile: result }));
                } else {
                    dispatch(callcomplete({ error: "Could not get profile details" }));
                }
            } catch (error) {
                console.log(error);
            }
        })();


    }
}
export function getChats(data) {
    return (dispatch) => {

        (async () => {
            try {
                dispatch(requestMade(GET_USERS));
                let response = await axios.post(rootUrl + "/users/getchats", data);
                if (response.status === 200) {
                    dispatch(callcomplete({ chatList: response.data }));
                }
            } catch (error) {
                throw error;
            }
        })();

    }
}
export function getAllUsers() {
    return (dispatch) => {

        (async () => {
            try {
                dispatch(requestMade(GET_CHATS));
                let response = await axios.get(rootUrl + "/users/getallusers");
                if (response.status === 200) {
                    dispatch(callcomplete({ userList: response.data }));

                }
            } catch (error) {
                throw error;
            }
        })();

    }
}
export function postmessage(obj) {
    return (dispatch) => {

        (async () => {
            try {
                dispatch(requestMade(GET_CHATS));
                let response = await axios.post(rootUrl + "/users/message", obj);
                if (response.status === 200) {
                    dispatch(callcomplete({ message: "Message posted successfully!" }));
                    // alert("message sent");
                    dispatch(getChats({ uid: obj.uid }));
                }
            } catch (error) {
                throw error;
            }
        })();

    }
}