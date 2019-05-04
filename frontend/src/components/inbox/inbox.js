import React, { Component } from 'react';
import {Redirect} from "react-router";
import cookie from 'react-cookies';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getChats,getAllUsers,postmessage} from '../../actions/navbarActions';
import stockimg from "../../resources/images/user.png";
import "../../resources/css/inbox.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faAngleLeft } from '@fortawesome/free-solid-svg-icons'

class Inbox extends Component{ 
    constructor(props){
        super(props)
        this.state={
          chatopen:0,
          selectindex:0,
          searchText:""
        };
    this.submit=this.submit.bind(this);
    }
async componentDidMount(){
   let data=cookie.load("cookie");
    // this.props.ongetAllUsers();
   this.props.ongetChats({uid:data.id});
}
changeHandler=(property,e)=>{
    if(property=="searchText"){
        this.setState({
            listOpen:1,
            userid:""
        });
    }
    this.setState({
      [property]:e.target.value
    })
   }

  async submit(e){
       e.preventDefault();
       let {userid:receiverid,messagetext}=this.state;
       if(!receiverid){
        // receiverid=this.props.navbar.userList[0]._id;
        alert("Please select a recepient to send the message to");
        return;
       }
       let uid=this.props.navbar.profile.data._id;
        await this.props.onpostmessage({receiverid,messagetext,uid});
        this.setState({
            messagetext:"",
            composeOpen:0
        })
   }
   chatOpened=(index)=>{
    this.setState({
        chatopen:1,
        selectindex:index
    })
   }
   goBack=()=>{
       this.setState({
           chatopen:0,
           selectindex:0
       })
   }
   postmassageInv=(receiverid)=>{
    let {messagetext}=this.state;
    let uid=this.props.navbar.profile.data._id;
     this.props.onpostmessage({receiverid,messagetext,uid});
     this.setState({
         messagetext:""
     })
   }
   compose=()=>{
       this.setState({
           composeOpen:1
       })
   }
   closeCompose=()=>{
       this.setState({
           composeOpen:0
       })
   }

   nameclicked=(data)=>{
       this.setState({
           searchText:`${data.firstName} ${data.lastName}`,
           userid:data._id,
           listOpen:0
       })
   }
    render(){
        let redirectVar=null;
        console.log(cookie.load("cookie"));
        if(!cookie.load("cookie")){
            redirectVar=<Redirect to="/login"/>
        }
        let displayVar=null;
        if(!this.state.chatopen){
            displayVar=<div>
                {this.props.navbar.chatList.map((data,index)=>{
                    return(<div key={index} className="clearfix chatlist-parent" onClick={()=>{this.chatOpened(index)}}>
                    <div className="image-parent"><img src={data.uid.profileImage?data.uid.profileImage:stockimg}></img></div>
                      <div>  <h3>{data.uid.firstName+" "+data.uid.lastName}</h3>
                        <p>{data.messages[data.messages.length-1].messagetext}</p>
                        </div>
                    </div>);
                })}
                <div className="button-parent clearfix "> <button className="primary-btn blue-btn" onClick={this.compose}>New Message</button></div>
            </div>
        }else if(this.props.navbar.chatList[this.state.selectindex]){
            displayVar=<div>
                <div className="chat-container">
                <div onClick={this.goBack} className="clearfix img-super-parent">
                <div className="image-parent">
                <FontAwesomeIcon icon={faAngleLeft} />         
                {/* <button className="primary-btn">Back</button> */}
               </div>
               <h2>{this.props.navbar.chatList[this.state.selectindex].uid.firstName}</h2>
               </div>
                {this.props.navbar.chatList[this.state.selectindex].messages.map((data,index)=>{
                  return ( <div key={index} className="clearfix"><span className={data.action=="sent"?"float-right":"float-left"}>{data.messagetext}</span></div>)
                })}
                <div className="button-parent clearfix">
                <textarea value={this.state.messagetext} onChange={(e)=>{this.changeHandler("messagetext",e)}}></textarea>
                <button className="primary-btn blue-btn" onClick={()=>{this.postmassageInv(this.props.navbar.chatList[this.state.selectindex].uid._id)}} >Send</button>
                 </div>
            </div>
            </div>
        }
        let term=this.state.searchText;
        let userListChange=[];
        if(term.length>0){
             userListChange=this.props.navbar.userList.filter((data)=>{
                let name=data.firstName+" "+data.lastName;
                return name.toLowerCase().startsWith(term.toLowerCase());
            })
        }            
        return(
            <div className="inbox-parent ml90">
                <div>{redirectVar}</div>
                <div className={`message-form ${this.state.composeOpen==1?"active":""}`}>
                <div className="inside-container">
                <div className="clearfix"><span onClick={this.closeCompose}>X</span></div>
                <div className="recepient">
                <form onSubmit={this.submit}>
                    <input type="text" value={this.state.searchText} className="input" onChange={(e)=>{this.changeHandler("searchText",e)}}></input>
                <ul className={`user-list ${this.state.searchText.length>0&&this.state.listOpen?"active":""}` }>
                    {userListChange.map((data,index)=>{
                        return(<li onClick={()=>{this.nameclicked(data)}} key={index} value={data._id}>{` ${data.firstName} ${data.lastName}`}</li>)
                    })}
                </ul>
               <div><textarea required value={this.state.messagetext} onChange={(e)=>{this.changeHandler("messagetext",e)}}></textarea></div>
               <input className="primary-btn blue-btn" type="submit" value="Send Message"></input>
               </form>
                </div>
                </div>
                </div>

                        {displayVar}

            </div>
        )
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
    ongetChats:getChats,
    ongetAllUsers:getAllUsers,
    onpostmessage:postmessage
   },dispatch);
  }
  
export default connect(mapStatetoProps,mapActionToProps)(Inbox);
