import React, { Component } from 'react';
import {Redirect} from "react-router";
import cookie from "react-cookies";
import {Link, Route} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Layout, Container, Grid, Row, Col, Modal, ModalFooter, Button, Form} from 'react-bootstrap';
import Navigationbar from '../navbar/Navigationbar'
import { Switch } from 'antd';
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
            settings_options: ["Questions Asked", "Topics Following", "Questions Following", "Bookmarked Answers"],
            selectedTab: "Questions Asked",
            payload: "",
            user_id: this.props.match.params.question_id,
        }
        

        this.onQuestionsAsked = this.onQuestionsAsked.bind(this);
    }

    onQuestionsAsked(){
        let data = cookie.load("cookie");
        let userId = data.id;
        console.log(userId);
        axios.get(`http://localhost:3001/users/questionsAsked/${userId}`).then(response =>{
            console.log("Status Code: ", response.status);
				if (response.status === 200) {
					console.log("Questions asked by users");
					console.log(response.data.results[0].questionText);
					this.setState({
						payload : response.data.results[0].questionText
					});
				} else {
					console.log("Some error occurred in the backend");
			}
        });
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
                                            }} className="single-feeds-option" key={index}>
                                                <span>{option}</span>
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
                            <h6>
                                {
                                    this.state.selectedTab === "Questions Asked" ?
                                        <div>
                                            <div className="tab_details">
                                                <h6 onClick = {this.onQuestionsAsked}>{ this.state.selectedTab }</h6>
                                            </div>
                                        </div>
                                        :
                                        <span></span>
                                }
                                {
                                    this.state.selectedTab === "Topics Following" ?
                                        <div>
                                            <div className="tab_details">
                                                <h6>{ this.state.selectedTab }</h6>
                                            </div>
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
                                        </div>
                                        :
                                        <span></span>
                                }
                                {
                                    this.state.selectedTab === "Bookmarked Answers" ?
                                        <div>
                                            <div className="tab_details">
                                                <h6>{ this.state.selectedTab }</h6>
                                            </div>
                                        </div>
                                        :
                                        <span></span>
                                }
                            </h6>
                            {/* </Row> */}
                            <span>
                                <Row>
                                    {this.state.payload}
                                </Row>
                                {/* <Row> */}
                                    <p>Activate/Deactivate Account</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Switch defaultChecked onChange={this.onActivationToggle} />
                                {/* </Row> */}
                            </span>
                        </div>
                    </div>

                        {/* RIGHT SIDE BAR */}
                    <div className="col-lg-2 col-md-2 col-xs-12 right-stick">Right side bar</div>
                </div>
            </div>
            </div>
        )
    }
}

// Export Settings Component
export default Content;