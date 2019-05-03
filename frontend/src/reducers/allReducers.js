import {combineReducers} from 'redux';
import {LOGOUT_USER} from "../actions/loginActions";
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import profileReducer from './profileReducer';
import navbarReducer from './navbarReducer';
const rootReducers=combineReducers({
    login:loginReducer,
    signup:signupReducer,
    profile: profileReducer,
    navbar:navbarReducer,
});

const allReducers = (state, action) => {
    if (action.type === LOGOUT_USER) {
      state = undefined
    } 
  
    return rootReducers(state, action);
}

export default allReducers;