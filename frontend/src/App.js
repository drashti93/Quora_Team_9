import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Main from './components/Main';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Profile from './components/profile/profile';
import thunk from 'redux-thunk';
import {applyMiddleware,compose,createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from "./reducers/allReducers";
import Searchpage from "./components/searchpage/searchpage";
import userProfile from "./components/profile/userProfile";
import Settings from "./components/Settings/Settings";
import QuestionDetail from "./components/questions/QuestionDetails";
import Content from "./components/Content/Content";
import Bookmarks from './components/bookmarks/Bookmarks';

const allStoreEnchancers=compose(
    applyMiddleware(thunk),
    // window.devToolsExtension && window.devToolsExtension()
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store=createStore(
    allReducers,
    allStoreEnchancers  
);

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   allReducers,
//   composeEnhancer(applyMiddleware(thunk))
// ); 

const composePlugin = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;


// App Component
class App extends Component { 
  render(){
      return(
          <Provider store = {store}>
           {/* Routing to different pages */}
              <BrowserRouter>
              <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/signup" component={Signup}></Route>
                <Route exact path="/profile" component={Profile}></Route>
                <Route path="/profile/:user_id" component={userProfile}></Route> 
                <Route exact path="/:question_id/answers" component={QuestionDetail}></Route>
                <Route exact path="/settings" component={Settings}></Route> 
                <Route exact path="/content" component={Content}></Route> 
                <Route path="/search/:text" component={Searchpage}></Route> 
                <Route exact path="/" component={Main}></Route>
                <Route exact path="/bookmarks" component={Main}></Route>
                <Route exact path="/topics/:topicId" component={Main}></Route>
                <Route exact path="/questions/:questionId" component={Main}></Route>


                </Switch>
              </BrowserRouter>
          </Provider>
      );
  }
}

// Exporting the App Component
export default App;