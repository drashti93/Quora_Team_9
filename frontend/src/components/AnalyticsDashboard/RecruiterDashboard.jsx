import React, { Component } from "react";
import { HorizontalBar, Bar, Line, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import Navigationbar from '../navbar/Navigationbar'; 
import { Redirect } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
import {bindActionCreators} from 'redux';
import cookie from "react-cookies";
let rootUrl=process.env.REACT_APP_BACKEND_API_URL+":"+process.env.REACT_APP_BACKEND_API_PORT;
// import {loginuser} from '../../actions/loginActions';
class RecruiterDashoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileViewDate:{},
      topanswerviews:{},
      topanswerupvotes:{},
      topanswerdownvotes:{}
    };
  }
  componentDidMount() {
   this.getprofileViews();
   this.topanswersviews();
   this.topanswersupvote();
   this.topanswersdownvote();
  }
  getprofileViews=()=>{
    (async()=>{
    try {
      let result=await axios.get(rootUrl+'/graphs/profile/views/'+cookie.load('cookie').id);
      let labelArray=[];
      for(let i=29;i>=0;i--){
        let data=new Date();
        data.setDate(data.getDate()-i);
        labelArray.push(data.toLocaleDateString());
      }
      const data = {
        labels: labelArray,
        datasets: [
          {
            label: 'Profile Views',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: result.data
          }
        ]
      };
      this.setState({
        profileViewDate:data
      })
    } catch (error) {
      
    }
    })()
  }
  topanswersviews=()=>{
    (async()=>{
    try {
      let{id}=cookie.load('cookie');
      let result=await axios.get(rootUrl+'/graphs/answers/top/10/'+id);
      if(result.status==200){
      result=result.data;
      let labelArray=result.map((data)=>{
        return data.answerText;
      })
      let views=result.map((data)=>{
        return data.views?data.views:0;
      })
      const data = {
        labels: labelArray,
        datasets: [
          {
            label: 'Top 10 Answers with most views',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: views
          }
        ]
      };
      this.setState({
        topanswerviews:data
      })
    }
    } catch (error) {
      
    }
    })()
  }
  topanswersupvote=()=>{
    (async()=>{
    try {
      let{id}=cookie.load('cookie');
      let result=await axios.get(rootUrl+'/graphs/top/10/answers/upvotes/'+id);
      if(result.status==200){
      result=result.data;
      let labelArray=result.map((data)=>{
        return data.answerText;
      })
      let views=result.map((data)=>{
        return data.upvotes.length;
      })
      const data = {
        labels: labelArray,
        datasets: [
          {
            label: 'Top 10 Answers with most upvotes',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: views
          }
        ]
      };
      this.setState({
        topanswerupvotes:data
      })
    }
    } catch (error) {
      
    }
    })()
  }

  topanswersdownvote=()=>{
    (async()=>{
    try {
      let{id}=cookie.load('cookie');
      let result=await axios.get(rootUrl+'/graphs/top/5/answers/downvotes/'+id);
      if(result.status==200){
      result=result.data;
      let labelArray=result.map((data)=>{
        return data.answerText;
      })
      let views=result.map((data)=>{
        return data.downvotes.length;
      })
      const data = {
        labels: labelArray,
        datasets: [
          {
            label: 'Top 10 Answers with most donwvotes',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: views
          }
        ]
      };
      this.setState({
        topanswerdownvotes:data
      })
    }
    } catch (error) {
      
    }
    })()
  }


  render() {
    let redirectVar = null;
    if(!cookie.load("cookie")){
      redirectVar=<Redirect to="/login"/>
  }
     
    // console.log("login state store", this.props.loginStateStore);
    // if (!this.props.loginStateStore) {
    //   redirectVar = <Redirect to="/signup" />;
    // }
   
    return (
      <div className="mt70">
        {redirectVar}
      <Navigationbar></Navigationbar>
      <div className="chart-super-parent clearfix">    
       <Line ref="chart" height={50} width={100} data={this.state.profileViewDate} />
      <Bar ref="chart" height={50} width={50} data={this.state.topanswerviews} />
      <Bar ref="chart" height={50} width={50} data={this.state.topanswerupvotes} />
      <Bar ref="chart" height={50} width={50} data={this.state.topanswerdownvotes} />
      </div>

      </div>
      
    );
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
 },dispatch);
}

export default connect(mapStatetoProps,mapActionToProps)(RecruiterDashoard);
