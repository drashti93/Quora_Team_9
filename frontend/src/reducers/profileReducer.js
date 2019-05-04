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
                    
        default :
            return state;
    }
};

export default reducer;
