import React, { Component } from 'react';
import {Redirect} from "react-router";
import cookie from "react-cookies";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Layout, Container, Grid, Row, Col, Modal, ModalFooter, Button, Form} from 'react-bootstrap';
import Navigationbar from '../navbar/Navigationbar'
import user_img from "../../resources/images/user.png"
import "../../resources/css/profile.css"
import Feed from '../feed/Feed'
import * as actions from '../../actions/profileActions';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Questions from './profileQuestions'
import Answers from './profileAnswers'
import {List, Card} from "antd";

class UserProfile extends Component {

  constructor(props){
    super(props)

    this.state={
     profile_options: ["Profile", "Questions", "Answers", "Following", "Followers", "Activity"],
     years: [1990,1991,1992,1993,1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
     selectedTab: "Profile",
     userDetails: {},
     firstName: "",
     lastName: "",
     show: false,
     show1: false,
     show2: false,
     show3: false,
     image_file: "",
     position: "",
     company: "",
     careerStart: "",
     careerEnd: "",
     currentCompany: "off",
     school: "",
     concentration: "",
     secConcentration: "",
     degree: "",
     gradYear: "",
     address: "",
     city: "",
     locState: "",
     zipcode: "",
     locStart: "",
     locEnd: "",
     currentLocation: "off",
     user_id: "",
     followers: [],
     following: [],
     hideUnfollow: true,
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow1 = this.handleShow1.bind(this);
    this.handleClose1 = this.handleClose1.bind(this);
    this.handleShow2 = this.handleShow2.bind(this);
    this.handleClose2 = this.handleClose2.bind(this);
    this.handleShow3 = this.handleShow3.bind(this);
    this.handleClose3 = this.handleClose3.bind(this);
    this.fileChange = this.fileChange.bind(this);
    this.saveCredentialsInternal = this.saveCredentialsInternal.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose1() {
    this.setState({ show1: false });
  }

  handleShow1() {
    this.setState({ show1: true });
  }

  handleClose2() {
    this.setState({ show2: false });
  }

  handleShow2() {
    this.setState({ show2: true });
  }

  handleClose3() {
    this.setState({ show3: false });
  }

  handleShow3() {
    this.setState({ show3: true });
  }

  fileChange(event){
    this.setState({image_file: event.target.files});
  }

  componentDidMount(){
    console.log(this.props.match.params);
    this.props.getUserDetails(this.props.match.params.user_id);
    this.props.getFollowers(this.props.match.params.user_id)
    this.props.getFollowing(this.props.match.params.user_id)

  }

  onChangePosition(e){
      this.setState({position: e.target.value})
  }

  onChangeCompany(e){
      this.setState({company: e.target.value})
  }

  onChangeCareerStart(e){
      console.log(typeof(e.target.value));
      this.setState({careerStart: e.target.value})
  }

  onChangeCareerEnd(e){
      console.log(typeof(e.target.value));
      this.setState({careerEnd: e.target.value})
  }

  onChangeCurrentCompany(e){
      this.setState({currentCompany: e.target.value})
  }

  onChangeSchool(e){
      this.setState({school: e.target.value})
  }

  onChangeConcentration(e){
      this.setState({concentration: e.target.value})
  }

  onChangeSecConcentration(e){
      this.setState({secConcentration: e.target.value})
  }

  onChangeDegree(e){
      this.setState({degree: e.target.value})
  }

  onChangeGradYear(e){
      this.setState({gradYear: e.target.value})
  }

  onChangeAddress(e){
      this.setState({address: e.target.value})
  }

  onChangeCity(e){
      this.setState({city: e.target.value})
  }

  onChangeState(e){
      this.setState({locState: e.target.value})
  }
  
  onChangeZipcode(e){
      this.setState({zipcode: e.target.value})
  }

  onChangeLocationStart(e){
      this.setState({locStart: e.target.value})
  }

  onChangeLocationEnd(e){
      this.setState({locEnd: e.target.value})
  }

  onChangeCurrentLocation(e){
      this.setState({currentLocation: e.target.value})
  }

  saveCredentialsInternal(type){
      this.props.saveCredentials(cookie.load('cookie').id, type, this.state.position, this.state.company, this.state.careerStart, this.state.careerEnd, this.state.currentCompany,
      this.state.school, this.state.concentration, this.state.secConcentration, this.state.degree, this.state.gradYear,
      this.state.address, this.state.city, this.state.locState, this.state.zipcode, this.state.locStart, this.state.locEnd, this.state.currentLocation
      )
  }
  render() {
    
    let followVar = null;
    if(this.props.followers.indexOf(cookie.load('cookie').id) >= 0){
        console.log("")
        followVar = <button onClick={() => {this.props.unfollow(cookie.load('cookie'), this.props.match.params.user_id)}}>Unfollow</button>
    }
    else {
        followVar = <button onClick={() => {this.props.follow(cookie.load('cookie'), this.props.match.params.user_id)}}>Follow</button>
    
    }
    
    
    
    return(
        <div>
         
            <div>
                <Navigationbar></Navigationbar>
            </div>
            <Container id="profile_body">
                <Row id="profile_body_row">
                    <Col xs={9}>
                        <Row id="profile_main">
                            <Col id="user_image_col" xs={3}>
                                <div>
                                    <span><img id="user_image" src={user_img}></img></span>
                                </div>
                            </Col>
                            <Col xs={9}>
                                <div>
                                    <h3>{this.props.userDetails.firstName} {this.props.userDetails.lastName}</h3>
                                    <p>{this.props.userDetails.aboutMe ? this.props.userDetails.aboutMe : ""}</p>
                                    <p>{this.props && this.props.followers ? (this.props.followers).length : 0} followers</p>
                                    <div>{followVar}</div>
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
                                                <Answers user={this.props.match.params.user_id}></Answers>
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
                                                <Questions user={this.props.match.params.user_id}></Questions>
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
                                                <Answers user={this.props.match.params.user_id}></Answers>
                                            </div>
                                            :
                                            <span></span>
                                    }
                                    {
                                        this.state.selectedTab === "Followers" ?
                                            <div>
                                                <div className="tab_details">
                                                    <h6>{this.props && this.props.followers ? (this.props.followers).length : 0} followers</h6>
                                                </div>
                                                <List
                                                    grid={{ gutter: 16, column: 2 }}
                                                    dataSource={this.props.followers}
                                                    renderItem={item => (
                                                    <List.Item>
                                                        <Card title={item}>Card content</Card>
                                                    </List.Item>
                                                    )}
                                                />
                                            </div>
                                            :
                                            <span></span>
                                    }
                                    {
                                        this.state.selectedTab === "Following" ?
                                            <div>
                                                <div className="tab_details">
                                                    <h6>{this.props && this.props.following ? (this.props.following).length : 0} following</h6>
                                                </div>
                                                <List
                                                    grid={{ gutter: 16, column: 2 }}
                                                    dataSource={this.props.following}
                                                    renderItem={item => (
                                                    <List.Item>
                                                        <Card title={item}>Card content</Card>
                                                    </List.Item>
                                                    )}
                                                />
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
                                <h6 >Credentials & Highlights</h6>
                            </div>
                                <span>
                                    {
                                        this.props.userDetails.credentials && this.props.userDetails.credentials.career && this.props.userDetails.credentials.career[(this.props.userDetails.credentials.career.length)-1]? <p> Worked at {this.props.userDetails.credentials.career[(this.props.userDetails.credentials.career.length)-1].company} as a  {this.props.userDetails.credentials.career[(this.props.userDetails.credentials.career.length)-1].position}</p>:
                                        ""
                                    }
                                </span>
                                <span>
                                    {
                                        this.props.userDetails.credentials && this.props.userDetails.credentials.education && this.props.userDetails.credentials.education[(this.props.userDetails.credentials.education.length)-1]? <p> Studied at {this.props.userDetails.credentials.education[(this.props.userDetails.credentials.education.length)-1].school} </p>:
                                        ""
                                    }
                                </span>
                                <span>
                                    {
                                        this.props.userDetails.credentials && this.props.userDetails.credentials.location && this.props.userDetails.credentials.location[(this.props.userDetails.credentials.location.length)-1]? <p> Lived at {this.props.userDetails.credentials.location[(this.props.userDetails.credentials.location.length)-1].address},   {this.props.userDetails.credentials.location[(this.props.userDetails.credentials.location.length)-1].city}, {this.props.userDetails.credentials.location[(this.props.userDetails.credentials.location.length)-1].state} - {this.props.userDetails.credentials.location[(this.props.userDetails.credentials.location.length)-1].zipcode}</p>:
                                        ""
                                    }
                                </span> 
                        </Row>
                        <Row id="languages">
                            <div id="languages_title">
                                <h6>Knows About</h6>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
  }
}

function mapStatetoProps(state) {
    return{
        userDetails: state.profile.userDetails,
        firstName: state.profile.userDetails.firstName,
        lastName: state.profile.userDetails.lastName,
        followers: state.profile.followers,
        following: state.profile.following,
    }
}

function mapDispatchToProps(dispatch) {
    
    return {
        getUserDetails: (user_id) => dispatch(actions.getUserDetails(user_id)),
        saveProfilePicture: (user_id, image_file) => dispatch(actions.saveProfilePicture(user_id, image_file)),
        saveCredentials: (id, type, position, company, careerStart, careerEnd, currentCompany,
      school, concentration, secConcentration, degree, gradYear, address, city, locState, zipcode, locStart, locEnd, currentLocation) => dispatch(actions.saveCredentials(id, type, position, company, careerStart, careerEnd, currentCompany,
      school, concentration, secConcentration, degree, gradYear, address, city, locState, zipcode, locStart, locEnd, currentLocation)),
      getFollowers: (user_id) => dispatch(actions.getFollowers(user_id)),
        getFollowing: (user_id) => dispatch(actions.getFollowing(user_id)),
        follow: (user_id, following) => dispatch(actions.follow(user_id, following)),
        unfollow: (user_id, following) => dispatch(actions.unfollow(user_id, following)),
    };
}

export default connect(mapStatetoProps,mapDispatchToProps)(UserProfile);

