import axios from "axios"

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

export function saveProfilePicture(user_id, image_file) {

    return function(dispatch){
        axios.get("http://localhost:3001/users/"+user_id, {})
            .then(function (response) {
              
                console.log("User Details");
                console.log(response);
                
                if(response.status===200) {

                    dispatch({ type: "USER_DETAILS_SUCCESS", payload: response })
                }
            })
            .catch(function (error) {
                dispatch({type: "USER_DETAILS_FAILURE",payload: false})
            });
    }
}

export function saveCredentials(user_id, type, position, company, cstartYear, cendYear, cisCurrentString, school, concentration, secConcentration, degree, graduationYear, street, city, state, zipcode, lstartYear, lendYear, lisCurrentString){
    return function(dispatch){
        console.log("Details:");
        console.log(user_id, type, position, company, cstartYear, cendYear, cisCurrentString, school, concentration, secConcentration, degree, graduationYear, street, city, state, zipcode, lstartYear, lendYear, lisCurrentString)
        axios.post("http://localhost:3001/users/credentials", {
            user_id, type, position, company, cstartYear, cendYear, cisCurrentString, school, concentration, secConcentration, degree, graduationYear, street, city, state, zipcode, lstartYear, lendYear, lisCurrentString
        })
        .then(function(response){
            if(response.status === 200){
                dispatch({type: "CREDENTIALS_SUCCESS", payload: response})
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

                    dispatch({ type: "ABOUT_ME_SUCCESS", payload: true })
                }
            })
            .catch(function (error) {
                dispatch({type: "ABOUT_ME_FAILURE",payload: false})
            });
    }
}

export function saveName(firstName, lastName, user_id) {
    console.log("In save about me");
    console.log(user_id, firstName, lastName);
    return function(dispatch){
        axios.post("http://localhost:3001/users/name", {
            firstName, lastName, user_id
        })
            .then(function (response) {
                
                if(response.status===200) {

                    dispatch({ type: "NAME_SUCCESS", payload: true })
                }
            })
            .catch(function (error) {
                dispatch({type: "NAME_FAILURE",payload: false})
            });
    }
}