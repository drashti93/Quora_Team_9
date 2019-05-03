import axios from "axios"

export function getUserDetails(user_id) {

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