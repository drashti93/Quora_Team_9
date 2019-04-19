import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import Main from './components/Main';


// App Component
class App extends Component {
  render(){
      return(
          <Provider store = {store}>
           {/* Routing to different pages */}
              <BrowserRouter>
                  <div>
                      {/* Child Component of App Component */}
                      <Main />
                  </div>
              </BrowserRouter>
          </Provider>
      );
  }
}

// Exporting the App Component
export default App;