import React, { Component } from 'react';
import {Redirect} from "react-router";
import cookie from "react-cookies";
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Layout, Container, Grid, Row, Col, Modal, ModalFooter, Button, Form} from 'react-bootstrap';
import Navigationbar from '../navbar/Navigationbar'
import user_img from "../../resources/images/user.png"
import "../../resources/css/profile.css"
import Feed from '../feed/Feed'
import * as actions from '../../actions/profileActions';

class Profile extends Component {

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
      console.log('id is:');
      console.log(cookie.load('cookie').email);
      this.props.getUserDetails(cookie.load('cookie').email)
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
                                    <span><img id="user_image" src={user_img}></img><div onClick={this.handleShow}>Add Photo</div></span>
                                </div>
                                <Modal show={this.state.show} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Profile Photo</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body><input type="file" onChange={this.fileChange}></input></Modal.Body>
                                    <ModalFooter>
                                        <Button onClick ={() => {this.props.saveProfilePicture(this.props.userDetails._id, this.state.image_file)}}>Save</Button>
                                    </ModalFooter>
                                </Modal>
                            </Col>
                            <Col xs={9}>
                                <div>
                                    <h3>{this.props.userDetails.firstName} {this.props.userDetails.lastName}</h3>
                                    <p>{this.props && this.props.followers ? (this.props.followers).length : 0} followers</p>
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
                                <li onClick={this.handleShow1}><a>Add employment credential</a></li>
                                    <Modal show={this.state.show1} onHide={this.handleClose1}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit credentials</Modal.Title><br/>
                                            {/* <div><h6>Credentials also appear on answers you write</h6></div> */}
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h6>Add employment detail</h6>
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Position</Form.Label>
                                                <Form.Control as="textarea" rows="1" />
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Company</Form.Label>
                                                <Form.Control as="textarea" rows="1" />
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Start Year</Form.Label>
                                                <Form.Control as="select">
                                                {
                                                    this.state.years.map((year, index) => {
                                                        return(
                                                            <option>{year}</option>
                                                        )
                                                        
                                                    })
                                                }
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>End Year</Form.Label>
                                                <Form.Control as="select">
                                                {
                                                    this.state.years.map((year, index) => {
                                                        return(
                                                            <option>{year}</option>
                                                        )
                                                        
                                                    })
                                                }
                                                </Form.Control>
                                            </Form.Group>
                                            <Form>
                                                <Form.Check 
                                                    label="I currently work here"
                                                    
                                                />
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleClose1}>
                                            Close
                                            </Button>
                                            <Button variant="primary" onClick={this.handleClose1}>
                                            Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                <li onClick={this.handleShow2}><a>Add education credential</a></li>
                                    <Modal show={this.state.show2} onHide={this.handleClose2}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit credentials</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h6>Add education detail</h6>
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>School</Form.Label>
                                                <Form.Control as="textarea" rows="1" />
                                                <Form.Label>Concentration</Form.Label>
                                                <Form.Control as="textarea" rows="1" />
                                                <Form.Label>Secondary Concentration</Form.Label>
                                                <Form.Control as="textarea" rows="1" />
                                                <Form.Label>Degree Type</Form.Label>
                                                <Form.Control as="textarea" rows="1" />
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Graduation Year</Form.Label>
                                                <Form.Control as="select">
                                                {
                                                    [...this.state.years, 2020, 2021, 2022, 2023].map((year, index) => {
                                                        return(
                                                            <option>{year}</option>
                                                        )
                                                        
                                                    })
                                                }
                                                </Form.Control>
                                            </Form.Group>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleClose2}>
                                            Close
                                            </Button>
                                            <Button variant="primary" onClick={this.handleClose2}>
                                            Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                <li onClick={this.handleShow3}><a>Add a location credential</a></li>
                                    <Modal show={this.state.show3} onHide={this.handleClose3}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit Credentials</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h6>Add location detail</h6>
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Company</Form.Label>
                                                <Form.Control as="textarea" rows="1" />
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Start Year</Form.Label>
                                                <Form.Control as="select">
                                                {
                                                    this.state.years.map((year, index) => {
                                                        return(
                                                            <option>{year}</option>
                                                        )
                                                        
                                                    })
                                                }
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>End Year</Form.Label>
                                                <Form.Control as="select">
                                                {
                                                    this.state.years.map((year, index) => {
                                                        return(
                                                            <option>{year}</option>
                                                        )
                                                        
                                                    })
                                                }
                                                </Form.Control>
                                            </Form.Group>
                                            <Form>
                                                <Form.Check 
                                                    label="I currently work here"
                                                    
                                                />
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleClose3}>
                                            Close
                                            </Button>
                                            <Button variant="primary" onClick={this.handleClose3}>
                                            Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
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

function mapStatetoProps(state) {
    return{
        userDetails: state.profile.userDetails,
        firstName: state.profile.userDetails.firstName,
        lastName: state.profile.userDetails.lastName,
    }
}

function mapDispatchToProps(dispatch) {
    
    return {
        getUserDetails: (user_id) => dispatch(actions.getUserDetails(user_id)),
        saveProfilePicture: (user_id, image_file) => dispatch(actions.saveProfilePicture(user_id, image_file)),
    };
}

export default connect(mapStatetoProps,mapDispatchToProps)(Profile);

