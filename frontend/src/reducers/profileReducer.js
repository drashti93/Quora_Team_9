import initial from './initialState';

const reducer = (state = initial, action) => {
    
    switch (action.type) {

        case "USER_DETAILS_SUCCESS" : {
            console.log(action.payload);
            return {...state,userDetails:action.payload};

			
        }

        case "CREDENTIALS_SUCCESS": {
            return{...state}
        }

        case "ABOUT_ME_SUCCESS":{
            return{...state}
        }

        case "NAME_SUCCESS":{
            return{...state}
        }

        case "QUESTION_ASKED_SUCCESS":{
            return{...state,questions: action.payload}
        }

        case "QUESTION_ANSWERED_SUCCESS":{
            return{...state, questionsAnswered: action.payload}
        }

        case "FOLLOWERS_SUCCESS":{
            return{...state, followers: action.payload.user_followers, followers_id: action.payload.user_followers_id}
        }

        case "FOLLOWING_SUCCESS":{
            return{...state, following: action.payload.user_following}
        }

        case "UPLOAD_SUCCESS":{
            return{...state, pictureURL: action.payload}
        }
                    
        default :
            return state;
    }
};

export default reducer;
