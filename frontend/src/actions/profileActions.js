import axios from "axios"
import cookie from 'react-cookies'
export function getUserDetails(user_id) {

    return function(dispatch){
        axios.get("http://localhost:3001/users/"+user_id, {})
            .then(function (response) {
              
                console.log("User Details");
                console.log(response.data);
                
                if(response.status===200) {

                    dispatch({ type: "USER_DETAILS_SUCCESS", payload: response.data })
                }
            })
            .catch(function (error) {
                dispatch({type: "USER_DETAILS_FAILURE",payload: false})
            });
    }
}

export function saveProfilePicture(file, config) {

    return function(dispatch){
        axios.post("http://localhost:3001/uploads/upload/", file, config)
        .then((res, any) => {
            console.log(cookie.load('cookie').id);
            console.log(`Response from /upload in react: ${res}`);
            console.log(`Response from /upload Key: ${Object.values(res.data)}`);
            
            dispatch({type: "UPLOAD_SUCCESS", payload: res})
            
            dispatch(getUserDetails(cookie.load('cookie').id));
        })
        .catch((err, Error) => {
            console.log(err)
        })
    }
}

export function saveCredentials(user_id, credId, type, kind, position, company, cstartYear, cendYear, cisCurrentString, school, concentration, secConcentration, degree, graduationYear, street, city, state, zipcode, lstartYear, lendYear, lisCurrentString){
    return function(dispatch){
        console.log("Details:");
        console.log(user_id, credId, type, kind, position, company, cstartYear, cendYear, cisCurrentString, school, concentration, secConcentration, degree, graduationYear, street, city, state, zipcode, lstartYear, lendYear, lisCurrentString)
        axios.post("http://localhost:3001/users/credentials", {
            user_id, credId, type, kind, position, company, cstartYear, cendYear, cisCurrentString, school, concentration, secConcentration, degree, graduationYear, street, city, state, zipcode, lstartYear, lendYear, lisCurrentString
        })
        .then(function(response){
            if(response.status === 200){
                dispatch({type: "CREDENTIALS_SUCCESS", payload: response})
                dispatch(getUserDetails(user_id));
            }
        })
        .catch(function(error){
            dispatch({type: "CREDENTIALS_FAILURE", payload: false})
        })
    }
}

export function saveAboutMe(user_id, text) {
    console.log("In save about me");
    console.log(user_id, text);
    return function(dispatch){
        axios.post("http://localhost:3001/users/aboutMe", {
            user_id, text
        })
            .then(function (response) {
                
                if(response.status===200) {

                    dispatch({ type: "ABOUT_ME_SUCCESS", payload: true });
                    dispatch(getUserDetails(user_id));
                }
            })
            .catch(function (error) {
                dispatch({type: "ABOUT_ME_FAILURE",payload: false})
            });
    }
}

export function saveName(firstName, lastName, user_id) {
    console.log("In save name");
    console.log(user_id, firstName, lastName);
    return function(dispatch){
        axios.post("http://localhost:3001/users/name", {
            firstName, lastName, user_id
        })
            .then(function (response) {
                
                if(response.status===200) {

                    dispatch({ type: "NAME_SUCCESS", payload: true });
                    dispatch(getUserDetails(user_id));
                }
            })
            .catch(function (error) {
                dispatch({type: "NAME_FAILURE",payload: false})
            });
    }
}

export function getQuestionsAsked(user_id) {
    console.log("In ask questions");
    console.log(user_id);
    return function(dispatch){
        axios.get("http://localhost:3001/users/questionsAsked/"+user_id, {
            
        })
            .then(function (response) {
                
                if(response.status===200) {

                    dispatch({ type: "QUESTION_ASKED_SUCCESS", payload: response.data })
                }
            })
            .catch(function (error) {
                dispatch({type: "QUESTION_ASKED_FAILURE",payload: false})
            });
    }
}

export function getQuestionsAnswered(user_id) {
    console.log("In get answers");
    console.log(user_id);
    return function(dispatch){
        axios.get("http://localhost:3001/users/questionsAnswered/"+user_id, {
            
        })
            .then(function (response) {
                
                if(response.status===200) {
                    console.log(response);
                    dispatch({ type: "QUESTION_ANSWERED_SUCCESS", payload: response.data })
                }
            })
            .catch(function (error) {
                dispatch({type: "QUESTION_ANSWERED_FAILURE",payload: false})
            });
    }
}

export function getFollowers(user_id) {
    console.log("In get followers");
    console.log(user_id);
    return function(dispatch){
        axios.get("http://localhost:3001/users/followers/"+user_id, {
            
        })
            .then(function (response) {
                
                if(response.status===200) {
                    console.log(response);
                    dispatch({ type: "FOLLOWERS_SUCCESS", payload: response.data })
                }
            })
            .catch(function (error) {
                dispatch({type: "FOLLOWERS_FAILURE",payload: false})
            });
    }
}

export function getFollowing(user_id) {
    console.log("In get following");
    console.log(user_id);
    return function(dispatch){
        axios.get("http://localhost:3001/users/following/"+user_id, {
            
        })
            .then(function (response) {
                
                if(response.status===200) {
                    console.log(response);
                    dispatch({ type: "FOLLOWING_SUCCESS", payload: response.data })
                }
            })
            .catch(function (error) {
                dispatch({type: "FOLLOWING_FAILURE",payload: false})
            });
    }
}

export function follow(user_id, following){
    console.log("In set following");
    return function(dispatch){
        axios.post("http://localhost:3001/users/follow", {
            user_id, following
        })
        .then(function(response){
            if(response.status===200){
                console.log(response);
                dispatch({type: "FOLLOW_SUCCESS", payload: true})
                dispatch(getUserDetails(following));
            }
        })
        .catch(function(error){
            dispatch({type: "FOLLOW_FAILURE", payload: false})
        })
    }
}

export function unfollow(user_id, following){
    console.log("In set un-following");
    return function(dispatch){
        axios.post("http://localhost:3001/users/unfollow", {
            user_id, following
        })
        .then(function(response){
            if(response.status===200){
                console.log(response);
                dispatch({type: "UNFOLLOW_SUCCESS", payload: true});
                dispatch(getUserDetails(following));
            }
        })
        .catch(function(error){
            dispatch({type: "UNFOLLOW_FAILURE", payload: false})
        })
    }
}