import React, { Component } from 'react';
import {Redirect} from "react-router";
import cookie from "react-cookies";
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Layout, Container, Grid, Row, Col} from 'react-bootstrap';
import Navigationbar from '../navbar/Navigationbar'
import user_img from "../../resources/images/user.png"
import "../../resources/css/profile.css"
import Feed from '../feed/Feed'
class Profile extends Component {

  constructor(props){
    super(props)

    this.state={
     profile_options: ["Profile", "Questions", "Answers", "Following", "Followers", "Activity"],
     selectedTab: "Profile",
    }
  }

  render() {
    return(
        <div>
            <Navigationbar></Navigationbar>
            <Container id="profile_body">
                <Row >
                    <Col xs={9}>
                        <Row id="profile_main">
                            <Col id="user_image_col" xs={3}>
                                <div>
                                    <span><img id="user_image" src={user_img}></img><div>Add Photo</div></span>
                                </div>
                            </Col>
                            <Col xs={9}>
                                <div>
                                    Profile Information
                                </div>
                            </Col>
                        </Row>
                        <Row id="profile_details">
                            <Col id="list_of_actions" xs={3}>
                                <div id="feeds_title">
                                    <h6>Feeds</h6>
                                </div>
                                <div id="feeds_options">
                                    {
                                        this.state.profile_options.map((option,index) => {
                                            return <div  onClick={() => {
                                                this.setState({selectedTab : option})
                                            }} className="single-feeds-option" key={index}>
                                                <span>{option}</span>
                                            </div>
                                        })
                                    }
                                </div>
                            </Col>
                            <Col id="tab" xs={9}>
                                <div>
                                    {
                                        this.state.selectedTab === "Profile" ?
                                            <div>
                                                <div className="tab_details">
                                                    <h6>{ this.state.selectedTab }</h6>
                                                </div>
                                                <Feed></Feed>
                                            </div>
                                            :
                                            <span></span>
                                    }
                                    {
                                        this.state.selectedTab === "Questions" ?
                                            <div>
                                                <div className="tab_details">
                                                    <h6>{ this.state.selectedTab }</h6>
                                                </div>
                                                <Feed></Feed>
                                            </div>
                                            :
                                            <span></span>
                                    }
                                    {
                                        this.state.selectedTab === "Answers" ?
                                            <div>
                                                <div className="tab_details">
                                                    <h6>{ this.state.selectedTab }</h6>
                                                </div>
                                                <Feed></Feed>
                                            </div>
                                            :
                                            <span></span>
                                    }
                                    {
                                        this.state.selectedTab === "Followers" ?
                                            <div>
                                                <div className="tab_details">
                                                    <h6>{ this.state.selectedTab }</h6>
                                                </div>
                                                <Feed></Feed>
                                            </div>
                                            :
                                            <span></span>
                                    }
                                    {
                                        this.state.selectedTab === "Following" ?
                                            <div>
                                                <div className="tab_details">
                                                    <h6>{ this.state.selectedTab }</h6>
                                                </div>
                                                <Feed></Feed>
                                            </div>
                                            :
                                            <span></span>
                                    }
                                    {
                                        this.state.selectedTab === "Activity" ?
                                            <div>
                                                <div className="tab_details">
                                                    <h6>{ this.state.selectedTab }</h6>
                                                </div>
                                                
                                            </div>
                                            :
                                            <span></span>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={3} id="credentials_languages">
                        <Row id="credentials">
                            <div id="credentials_title">
                                <h6 >Credentials</h6>
                            </div>
                            <ul>
                                <li><a>Add employment credential</a></li>
                                <li><a>Add education credential</a></li>
                                <li><a>Add a loaction credential</a></li>
                                <li>Knows Hindi</li>
                            </ul>
                        </Row>
                        <Row id="languages">
                            <div id="languages_title">
                                <h6>Languages</h6>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
  }
}

const mapStatetoProps=(state,props)=>{
 
}
const mapActionToProps=(dispatch,props)=>{
 
}

export default connect(mapStatetoProps,mapActionToProps)(Profile);

