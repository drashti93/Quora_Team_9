import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Main from './components/Main';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import thunk from 'redux-thunk';
import {applyMiddleware,compose,createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from "./reducers/allReducers";
const allStoreEnchancers=compose(
    applyMiddleware(thunk)
   , window.devToolsExtension && window.devToolsExtension()
);
const store=createStore(
    allReducers,
    allStoreEnchancers  
);

// App Component
class App extends Component { 
  render(){
      return(
          <Provider store = {store}>
           {/* Routing to different pages */}
              <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Main}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/signup" component={Signup}></Route>
                </Switch>
              </BrowserRouter>
          </Provider>
      );
  }
}

// Exporting the App Component
export default App;