import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
<<<<<<< HEAD
import Navigationbar from "./navbar/Navigationbar"
import TopicBar from './topics/topic'

// import '../App.css';
=======
import Navigationbar from "./navbar/Navigationbar";
import Feed from "./feed/Feed";
>>>>>>> b50b1000882090eb736f882aeb5fa417fb1b49f0

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
            <Navigationbar/>
            <div className="container">
                <div className="row">
<<<<<<< HEAD
                    <div className="col-lg-2 col-md-2 col-xs-12"><TopicBar/></div>
                    <div className="col-lg-8 col-md-8 col-xs-12">Middle section</div>
=======
                    <div className="col-lg-2 col-md-2 col-xs-12">Left side Bar</div>
                    <div className="col-lg-8 col-md-8 col-xs-12"><Feed/></div>
>>>>>>> b50b1000882090eb736f882aeb5fa417fb1b49f0
                    <div className="col-lg-2 col-md-2 col-xs-12">Right side bar</div>
                </div>
                </div>
            </div>
        );
    }
}

// Export Main Component
export default Main;