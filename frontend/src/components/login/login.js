import React, { Component } from 'react';
import {Redirect} from "react-router";
import cookie from 'react-cookies'
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loginuser} from '../../actions/loginActions';
import quoralogo from "../../images/quoraLogo.svg";
import loginBackground from "../../images/loginBackground.png";
class Login extends Component {

  constructor(props){
    super(props)

    this.state={
      email:"",
      password:"",
      loginSuccess:0,
      message:""
    }

    this.login=this.login.bind(this);
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

   async login(e){
     e.preventDefault();
    let {email,password}=this.state;
    var data={
     email,
     password
    }
    this.props.onLoginUser(data);
  }

  render() {
    let redirectVar = null;
    if(cookie.load("cookie")){
        redirectVar = <Redirect to= "/"/>
    }
      return(<div className="clearfix login-parent">

      
        <div>{redirectVar}</div>
        <div className="background-image"><img src={loginBackground}></img></div>
        <form className="login-form" onSubmit={this.login}>
          <div>
            <div className="img-parent"><img src={quoralogo}></img></div>
            <div className="header-text">A place to share knowledge and better understand the world</div>
          </div>
        <p>Sign In</p>
        <div className="input-parent">
       <div> <input required onChange={this.changeHandlerEmail} type="text" placeholder="Email"></input></div>
       <div><input required onChange={this.changeHandlerPassword} type="password" placeholder="Password"></input></div>
      
       <div><input className="btn" type="submit" value="Login"></input></div> 
       </div>
       <div className="sign-up"><span>New User ? </span><Link to="/signup">Sign Up</Link></div>
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
  onLoginUser:loginuser
 },dispatch);
}

export default connect(mapStatetoProps,mapActionToProps)(Login);
