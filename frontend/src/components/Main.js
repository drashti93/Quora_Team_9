import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navigationbar from "./navbar/Navigationbar"

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
            <Navigationbar></Navigationbar>
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-xs-12">Left side Bar</div>
                    <div className="col-lg-8 col-md-8 col-xs-12">Middle section</div>
                    <div className="col-lg-2 col-md-2 col-xs-12">Right side bar</div>
                </div>
                </div>
            </div>
        );
    }
}

// Export Main Component
export default Main;