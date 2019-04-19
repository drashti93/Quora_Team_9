import React, {Component} from 'react';
import {Route} from 'react-router-dom';
// import Login from './Login/Login';
// import Signup from './Signup/Signup';
// import Home from './Dashboard/Home';
// import Card from './Cards/Card'
// import Navigation from '../components/LandingPage/Navigation';
// import Courses from './Courses/Courses';
// import Userprofile from './Userprofile/Userprofile'
// import Edit from './Userprofile/Edit';
// import Announcement from './Courses/Announcement/Announcement';
// import Assignment from './Courses/Assignment/Assignment';
// import Searchcourses from './Courses/Searchcourses';
// import Addcourse from './Courses/Addcourse';
// import Courseinformation from './Courses/Courseinformation';
// import Grades from './Courses/Grades/Grades';
// import Quiz from './Courses/Quiz/Quiz';
// import Information from './Courses/Announcement/Information';
// import Newannouncement from './Courses/Announcement/Newannouncement';
// import NewQuiz from './Courses/Quiz/NewQuiz';
// import People from './Courses/People/People';


// import '../App.css';

// Main Component
class Main extends Component{
    render(){
        return(
            <div>
                <Route exact path='/' component = {Login} />
                // <Route exact path='/signup' component = {Signup} />
                // <Route path='/home' component = {Home} /> 
                // <Route exact path='/courses' component = {Courses} />
                // <Route exact path='/userprofile' component = {Userprofile} />
                // <Route exact path='/userprofile/edit' component = {Edit} />
                // <Route path='/courses/:id/announcement' component = {Announcement} />
                // <Route exact path='/courses/search' component = {Searchcourses} />
                // <Route exact path='/courses/new' component = {Addcourse} />
                // <Route path='/courses/:id/home' component = {Courseinformation} />
                // <Route path='/courses/:id/assignment' component = {Assignment} />
                // <Route path="/courses/:id/grades" component={Grades} />
                // <Route path="/courses/:id/announcement/:announcementName" component={Information} />
                // <Route exact path="/courses/:id/announcement/new" component={Newannouncement} />
                // <Route exact path="/courses/:id/quiz" component={Quiz} />
                // <Route exact path="/courses/:id/quiz/new" component={NewQuiz} />
                // <Route exact path="/courses/:id/people" component={People} />

            </div>
        );
    }
}

// Export Main Component
export default Main;