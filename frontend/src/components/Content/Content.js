import React, { Component } from 'react';
import {Redirect} from "react-router";
import cookie from "react-cookies";
import {Link, Route} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Layout, Container, Grid, Row, Col, Modal, ModalFooter, Button, Form} from 'react-bootstrap';
import Navigationbar from '../navbar/Navigationbar'
import { Switch } from 'antd';
import { List } from 'antd';
import axios from 'axios';


import TopicBar from '../topics/topic'
// import user_img from "../../resources/images/user.png"
import "../../resources/css/content.css"
import Feed from '../feed/Feed'
import * as actions from '../../actions/profileActions';

export class Content extends Component{

    constructor(props) {
        super(props)
        this.state = {
            checkFollowState: true,
            checkActivationState: true,
            settings_options: ["Questions Asked", "Topics Following", "Questions Following"],
            selectedTab: "Questions Asked",
            questionsAskedPayload: "",
            topicsFollowingPayload: "",
            questionsFollowingPayload: "",
            // questionsAnsweredPayload: "",
            user_id: this.props.match.params.question_id,
        }
        

        //this.onQuestionsAsked = this.onQuestionsAsked.bind(this);
        this.userContentHandler = this.userContentHandler.bind(this);
    }

    userContentHandler() {
        let data = cookie.load("cookie");
        let userId = data.id;
        console.log(userId);
        if(this.state.selectedTab === "Questions Asked" )
        {
        axios.get(`http://localhost:3001/users/questionsAsked/${userId}`).then(response =>{
            console.log("Status Code: ", response.status);
				if (response.status === 200) {
					console.log("Questions asked by the user");
					console.log(response.data.results);
					this.setState({
						questionsAskedPayload : response.data
					});
				} else {
					console.log("Some error occurred in the backend");
			}
        })  } else if (this.state.selectedTab === "Topics Following")
    {
        axios.get(`http://localhost:3001/users/${userId}/topics`).then(response =>{
            console.log("Status Code: ", response.status);
				if (response.status === 200) {
					console.log("Topics followed by the user");
					console.log(response.data);
					this.setState({
						topicsFollowingPayload : response
					});
				} else {
					console.log("Some error occurred in the backend");
			}
        });
    } else 
    {
        axios.get(`http://localhost:3001/users/${userId}/questions`).then(response =>{
            console.log("Status Code: ", response.status);
				if (response.status === 200) {
					console.log("Questions followed by the user");
					console.log(response.data);
					this.setState({
						questionsFollowingPayload : response
					});
				} else {
					console.log("Some error occurred in the backend");
			}
        });
     
    }
}

    
    render() {
        return (
            <div>
                <Navigationbar/>
            <div className="container mt70">
                <div className="row">
                    {/* LEFT SIDE BAR */}
                    <div className="col-lg-2 col-md-2 col-xs-12 left-stick">
                        <Row>
                            {/* <Col id="list_of_actions" xs={3}> */}
                                <div id="feeds_title">
                                    <h6>By Content Type</h6>
                                </div>
                                <div id="feeds_options">
                                    {
                                        this.state.settings_options.map((option,index) => {
                                            return <div  onClick={() => {
                                                this.setState({selectedTab : option});
                                            }}  className="single-feeds-option" key={index}>
                                                <span onClick = {this.userContentHandler}>{option}</span>
                                            </div>
                                        })
                                    }
                                </div>
                            {/* </Col> */}
                            {/* <Col id="tab" xs={9}> */}
                                <div>
                                    
                                    
                                </div>
                            {/* </Col> */}
                        </Row>
                    </div>
                    {/* MIDDLE PORTION */}
                    <div className="col-lg-8 col-md-8 col-xs-12">
                        <div>
                            {/* <Row> */}
                                {
                                    this.state.selectedTab === "Questions Asked" ?
                                        <div> 
                                            <div className="tab_details">
                                                <h6>{ this.state.selectedTab }</h6>
                                            </div>
                                           
                               <List
                                dataSource={this.state.questionsAskedPayload.results}
                                renderItem={result => (
                                <List.Item>
                                    {result.questionText}
                                </List.Item>)}
                                />
                                 </div> : <span></span>
                                }      
                                
                                
                                {
                                    this.state.selectedTab === "Topics Following" ?
                                        <div>
                                            <div className="tab_details">
                                                <h6>{ this.state.selectedTab }</h6>
                                            </div>
                                            <List
                                dataSource={this.state.topicsFollowingPayload.data}
                                renderItem={dataElement => (
                                <List.Item>
                                    {dataElement.name}
                                </List.Item>)}
                                />
                                        </div>
                                        :
                                        <span></span>
                                }
                                {
                                    this.state.selectedTab === "Questions Following" ?
                                        <div>
                                            <div className="tab_details">
                                                <h6>{ this.state.selectedTab }</h6>
                                            </div>
                                        <List
                                        dataSource={this.state.questionsFollowingPayload.data}
                                        renderItem={dataElement => (
                                        <List.Item>
                                            {dataElement.questionText}
                                        </List.Item>)}
                                        />
                                         </div> : <span></span>
                                              
                                        
                                        
                                        
                                }
                                {/* {
                                    this.state.selectedTab === "Questions Answered" ?
                                        <div>
                                            <div className="tab_details">
                                                <h6>{ this.state.selectedTab }</h6>
                                            </div>
                                        </div>
                                        :
                                        <span></span>
                                } */}
                            
                            {/* </Row> */}
                            <span>
                                
                                <hr />
                                {/* <Row> */}
                                    {/* <p>Activate/Deactivate Account</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Switch defaultChecked onChange={this.onActivationToggle} /> */}
                                {/* </Row> */}
                            </span>
                        </div>
                    </div>

                        {/* RIGHT SIDE BAR */}
                    <div className="col-lg-2 col-md-2 col-xs-12 right-stick"></div>
                </div>
            </div>
            </div>
        )
    }
}

// Export Settings Component
export default Content;