import React from "react";
import "antd/dist/antd.css";
import axios from 'axios';
import { List} from "antd";
import { Icon} from "antd";
<<<<<<< Updated upstream
import reqwest from 'reqwest';
import { Component } from 'react';

class TopicBar extends Component{

    state = {
    data: [],
    loading: false,
    hasMore: true,
  }
    
  componentDidMount() {
    
    axios.get('http://localhost:3001/users/5cc3f69dd23457601476d016/topics',{
      params: {
        
      }
    })
            .then(response =>{
                if(response.status === 200){
                    console.log("------------->",response.data);
                    this.setState({
                        data: [...response.data]
                    })
                    console.log('***********')

                }
            });
  }

  

    render(){
    
        
        return(
            <div>


    <List
      size="small"
      header={<div>{<Icon type="copy" />} Feed</div>}
      footer={<div>{<Icon type="book" />} Bookmark</div>}
      split = {false}
  
      dataSource={this.state.data}
      renderItem={item => (
        <List.Item>
          {<Icon type="read" />} {item.name}

=======
import { Component } from 'react';
import cookie from 'react-cookies';
import {Redirect} from "react-router";



class TopicBar extends Component{

    state = {
    data: [],
  }
    
  componentDidMount() {

	let data=cookie.load("cookie");
	let u_id = data.id;
	console.log(u_id)
	
    axios.get('http://localhost:3001/users/'+u_id+'/topics')
            .then(response =>{
                if(response.status === 200){
                    console.log("------------->",response.data);
                    this.setState({
                        data: [...response.data]
                    })

                }
            });
  }

    render(){
		let redirectVar = null
		if(cookie.load("cookie")){
			redirectVar=<Redirect to="/"/>
		}else{
			redirectVar=<Redirect to = '/login'/>
		}
        return(
    <div>
    <List
      size="small"
      header={<div>{<Icon type="copy" />} Feed</div>}
      footer={<a href='/'><div>{<Icon type="book" />} Bookmark</div></a>}
      split = {false}
  
      dataSource={this.state.data}
      renderItem={item => (
        <List.Item>
          {<a href='/'>{<Icon type="read" />} {item.name}</a>}

>>>>>>> Stashed changes
        </List.Item>

      )}
    />
  </div>
          
        )
    }
    }
    
    export default TopicBar;