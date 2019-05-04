import React, { Component } from 'react';
import {Redirect} from "react-router";
import cookie from 'react-cookies';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {postQuestion} from '../../actions/navbarActions';

class Questionadd extends Component{
    constructor(props){
        super(props)
        this.state={
          topicsArray:[]
        };
    this.submit=this.submit.bind(this);
    }
changeHandler=(property,e)=>{
    this.setState({
      [property]:e.target.value
    })
   }
   checkChanged=(data,e)=>{
    console.log(data);
    console.log(e);
    let {topicsArray}=this.state;
    if(e.target.checked){
        topicsArray.push(data._id);
    }
    else{
        topicsArray=topicsArray.filter((elem)=>{
            return elem._id!=data._id
        });
    }
    this.setState({
        topicsArray
    })
   }
  async submit(e){
       e.preventDefault();
       let {topicsArray,questionText}=this.state;
       let userId=this.props.navbar.profile.data._id;
        await this.props.onpostQuestion({topicsArray,questionText,userId});
        this.setState({
            questionText:"",
        })
   }
    render(){
        
        return(<div>
            <input type="text" placeholder={`Start your question with 'What','How','Why' ,etc.`} onChange={(e)=>{this.changeHandler("questionText",e)}}></input>
           { this.props.navbar.topics.map((data,index)=>{
           return (<div><input type="checkbox" onChange={(e)=>{this.checkChanged(data,e)}} key={index} value={data.name}></input><label>{data.name}</label></div>)
            })
           }
           <input type="submit" onClick={this.submit} value="Add Question"></input>
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
  onpostQuestion:postQuestion
   },dispatch);
  }
  
export default connect(mapStatetoProps,mapActionToProps)(Questionadd);
