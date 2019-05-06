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
            selectedTab: "Account",
        }
    }

    render() {
        return (
            <div>
                <Navigationbar/>
            <div className="container mt70">
                <div className="row">
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
                                                this.setState({selectedTab : option})
                                            }} className="single-feeds-option" key={index}>
                                                <span>{option}</span>
                                            </div>
                                        })
                                    }
                                </div>
                            {/* </Col> */}
                            {/* <Col id="tab" xs={9}> */}
                                <div>
                                    {
                                        this.state.selectedTab === "Questions Asked" ?
                                            <div>
                                                <div className="tab_details">
                                                    <h6>{ this.state.selectedTab }</h6>
                                                </div>
                                            </div>
                                            :
                                            <span></span>
                                    }
                                    
                                </div>
                            {/* </Col> */}
                        </Row>
                    </div>
                        <div className="col-lg-8 col-md-8 col-xs-12">
                            <div>
                                {/* <Row> */}
                                <h6>Content</h6>
                                {/* </Row> */}
                                <hr />
                                <span>
                                    {/* <Row> */}
                                        <p>Enable Follow</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Switch defaultChecked onChange={this.onFollowToggle} />
                                    {/* </Row>
                                    <Row> */}
                                        <p>Activate/Deactivate Account</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Switch defaultChecked onChange={this.onActivationToggle} />
                                    {/* </Row> */}
                                </span>
                            </div>
                        </div>
                    <div className="col-lg-2 col-md-2 col-xs-12 right-stick">Right side bar</div>
                </div>
            </div>
            </div>
        )
    }
}

// Export Settings Component
export default Content;