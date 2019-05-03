import React, {Component} from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import Navigationbar from './navbar/Navigationbar';
import Feed from './feed/Feed';
import Questions from './questions/QuestionDetail';
import TopicBar from './topics/topic'


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
                    <div className="col-lg-2 col-md-2 col-xs-12"><TopicBar/></div>
                    <div className="col-lg-8 col-md-8 col-xs-12">
                        <Route exact path="/" component={Feed} />
                        <Route path="/questions" component={Questions} />
                    </div>
                    <div className="col-lg-2 col-md-2 col-xs-12">Right side bar</div>
                </div>
                </div>
            </div>
        );
    }
}

// Export Main Component
export default Main;