import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navigationbar from './navbar/Navigationbar';
import TopicBar from './topics/topic';
import Feed from './feed/Feed';

// Main Component
class Main extends Component{
    
    render(){
        let redirectVar = null;
        if(!cookie.load("cookie")){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
                {redirectVar}
            <Navigationbar/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-xs-12"><TopicBar/></div> 
                    <div className="col-lg-8 col-md-8 col-xs-12"><Feed/></div>
                    <div className="col-lg-2 col-md-2 col-xs-12">Right side bar</div>
                </div>
                </div>
            </div>
        );
    }
}

// Export Main Component
export default Main;