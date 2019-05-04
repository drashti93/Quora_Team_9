import React, { Component } from 'react';
import {Redirect} from "react-router";
import cookie from 'react-cookies';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from "lodash";
import Navigationbar from "../navbar/Navigationbar";
import { Link } from 'react-router-dom'
import "../../resources/css/searchpage.css"
import $ from "jquery";
// import {getChats,getAllUsers,postmessage} from '../../actions/navbarActions';


class Searchpage extends Component{
    constructor(props, context) {
        super(props);
        this.myRef = React.createRef();
        let docHeight = $("body").scrollHeight+100;
        this.state = {
          show: false,
          showaddquestion: false,
          searchText: props.match.params.text,
          searchArray:[],
          searchArrayDup:[],
          counter:10,
          docHeight

        };
      }
      
      componentDidMount() {
        this.update();
        window.addEventListener('scroll', this.handleScroll);
      }
    
      componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
      }
      handleScroll = () => {
         const node = this.myRef.current.offsetHeight+100;
            let currScroll=window.scrollY+window.innerHeight;
            // console.log("node"+node);
            // console.log("curr scroll"+currScroll);
            if(node==currScroll){
                console.log(true);
                let {counter}=this.state;
                this.setState({
                    counter:counter+=10
                })
            }
            // console.log("doc height"+this.state.docHeight);
      };
      async componentWillReceiveProps(nextProps){
        if(nextProps.match.params.text!==this.props.match.params.text){
          //Perform some operation
          await this.setState({searchText: nextProps.match.params.text, counter:10});
          // this.classMethod();
          this.update();
        }
      }
      nameclicked=(data)=>{
        this.setState({
          searchText:""
        })
        console.log(data);
      }
      async update(){
        let {searchText}=this.state;
        let searchKeywords=searchText.trim().split(" ");
        let topics=this.props.navbar.topics.map((data)=>{
          let found=false;
            searchKeywords.forEach((elem)=>{
              if(data.name.indexOf(elem)>=0){
                found=true;
              }
            })
           if(found){
             return {type:"Topic :",link:`/topic/${data._id}`,value:data.name,id:data._id};
           }
        });
        let questions=this.props.navbar.questions.map((data)=>{
          let found=false;
            searchKeywords.forEach((elem)=>{
              if(data.questionText&&data.questionText.indexOf(elem)>=0){
                found=true;
              }
            })
           if(found){
            return {type:"Question :",link:`/question/${data._id}`,value:data.questionText,id:data._id};
          }
        });
        let users=this.props.navbar.userList.map((data)=>{
          let found=false;
          let name=`${data.firstName} ${data.lastName}`;
            searchKeywords.forEach((elem)=>{
              if(name.indexOf(elem)>=0){
                found=true;
              }
            })
           if(found){
            return {type:"Profile :",link:`/profile/${data._id}`,value:name,id:data._id};
          }
        });
        users=_.compact(users);
        questions=_.compact(questions);
        topics=_.compact(topics);
        let arry=[...users,...questions,...topics];
        this.setState({
          searchArray:arry,
          searchArrayDup:arry,
          filterText:"all"
        })
      }
    async filterClicked(data){
         await this.setState({
            filterText:data
         }) ;
         let {searchArray}=this.state;
         if(data=="all"){
             this.setState({
                 searchArrayDup:searchArray,
                 counter:10
             })
         }else{
            let searchArrayDup=searchArray.filter((elem)=>{
                return elem.type==data
            })
            this.setState({
                searchArrayDup,
                counter:10
            })
         }
      }
    render(){
        let {counter,searchArrayDup}=this.state;
        counter=Math.min(counter,searchArrayDup.length);
 return(<div className="mt70">
     <Navigationbar loadagain={0} text={this.props.match.params.text}></Navigationbar>
     <div  ref={this.myRef} className="container mt100 searchpage-parent">
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-xs-12 left-stick">
                      <div className="left-header">By Type</div>
                        <ul className="left-list">
                            <li className={this.state.filterText=="all"?"active":""} onClick={()=>{this.filterClicked("all")}}>All Types</li>
                            <li className={this.state.filterText=="Question :"?"active":""} onClick={()=>{this.filterClicked("Question :")}}>Questions</li>
                            <li className={this.state.filterText=="Profile :"?"active":""} onClick={()=>{this.filterClicked("Profile :")}}>Profiles</li>
                            <li className={this.state.filterText=="Topic :"?"active":""} onClick={()=>{this.filterClicked("Topic :")}}>Topics</li>
                            
                        </ul>
                    </div>
                    <div className="col-lg-8 col-md-8 col-xs-12">
                        
                        <ul className="display-list">
                        <h4>Results</h4>
                       {
                        _.times(counter,(index)=>{
                    return (<li onClick={() => { this.nameclicked(searchArrayDup[index]) }} key={index}><Link to={searchArrayDup[index].link}>{` ${searchArrayDup[index].type} ${searchArrayDup[index].value}`}</Link></li>)
                  }) 
                       }
                       </ul>
                    </div>
                </div>
                </div>
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
    // ongetChats:getChats,
    // ongetAllUsers:getAllUsers,
    // onpostmessage:postmessage
   },dispatch);
  }
  
export default connect(mapStatetoProps,mapActionToProps)(Searchpage);
