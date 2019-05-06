import React, {Component} from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import Navigationbar from './navbar/Navigationbar';
import Feed from './feed/Feed';
import Bookmarks from './bookmarks/Bookmarks';
// import Questions, {QuestionDetail }  from './questions/QuestionDetail';
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
            <div className="container mt70">
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-xs-12 left-stick"><TopicBar/></div>
                    <div className="col-lg-8 col-md-8 col-xs-12">
                        <Route exact path="/" component={Feed} />
                        <Route exact path="/bookmarks" component={Bookmarks} />
                        {/* <Route exact path="/:question._id/answers" component={QuestionDetail}/> */}
                        {/* <Route path="/questions" component={Questions} /> */}
                    </div>
                    <div className="col-lg-2 col-md-2 col-xs-12 right-stick">Right side bar</div>
                </div>
            </div>
            </div>
        );
    }
}

// Export Main Component
export default Main;