import React, { Component } from 'react';
import {Redirect} from "react-router";
import cookie from "react-cookies";
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {signupuser,signupreset} from '../../actions/signupActions';
import quoralogo from "../../images/quoraLogo.svg";
import loginBackground from "../../images/loginBackground.png";

class Signup extends Component {

  constructor(props){
    super(props)

    this.state={
      name:"",
      email:"",
      password:"",
      signupSuccess:0,
      message:"",
      role:"student"
    }

    this.signup=this.signup.bind(this);
    props.onSignupreset();
  }
  changeHandlerName=(e)=>{
    this.setState({
      firstName:e.target.value
    });
  }
  changeHandlerLastName=(e)=>{
    this.setState({
      lastName:e.target.value
    });
  }

  changeHandlerEmail=(e)=>{
    this.setState({
      email:e.target.value
    });
  }

  changeHandlerPassword=(e)=>{
    this.setState({
      password:e.target.value
    });
  }
  changeHandlerRadio=(e)=>{
    this.setState({
      role:e.target.value
    });
  }

  async signup(e){

    e.preventDefault();

    let {firstName,lastName,email,password}=this.state;
    var data={
      firstName,
     email,
     password,
     lastName
    }

    this.props.onSignupUser(data);

    

  }

  render() {
    let redirectVar = null;
    if(this.props.signup.signupSuccess){
        redirectVar = <Redirect to= "/login"/>
    }
    if(cookie.load("cookie")){
      redirectVar=<Redirect to="/home"/>
  }
      return(<div className="clearfix login-parent">
         
        <div>{redirectVar}</div>
        <div className="background-image"><img src={loginBackground}></img></div>
        <form className="login-form" onSubmit={this.signup}>
        <div>
            <div className="img-parent"><img src={quoralogo}></img></div>
            <div className="header-text">A place to share knowledge and better understand the world</div>
          </div>
        <p>Sign Up</p>
        <div className="input-parent">
       <div> <input required onChange={this.changeHandlerName} type="text" placeholder="First Name"></input></div>
       <div> <input required onChange={this.changeHandlerLastName} type="text" placeholder="Last Name"></input></div>
        <div> <input required title="Please enter an email address of the form xyz@abc.xx/xxx"  type="email" pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={this.changeHandlerEmail}  placeholder="Email"></input></div>
       <div><input required onChange={this.changeHandlerPassword} type="password" placeholder="Password"></input></div>
        <input className="btn" type="submit" value="Sign Up"></input>
        </div>
        <div className="sign-up"><span>Already registered ? </span><Link to="/login">Sign In</Link></div>
        </form>
        <div>{this.state.message}</div>
      </div>)
  }
}
const mapStatetoProps=(state,props)=>{
  return{
    ...state,
    ...props
  };
}
const mapActionToProps=(dispatch,props)=>{
 return bindActionCreators({
  onSignupUser:signupuser,
  onSignupreset:signupreset
 },dispatch);
}

export default connect(mapStatetoProps,mapActionToProps)(Signup);

