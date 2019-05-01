import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


// import '../App.css';

// Main Component
class Main extends Component{
    
    render(){
        let redirectVar = null;
        if(!cookie.load("cookie")){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
               <p>This is the home page</p>

            </div>
        );
    }
}

// Export Main Component
export default Main;