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
class Profile extends Component {

  constructor(props){
    super(props)

    this.state={
     
    }
  }

  render() {
    return(
        <div>
            <Navigationbar></Navigationbar>
            <Container id="profile_body">
                <Row>
                    <Col xs={9}>
                        <Row>
                            <Col id="user_image_col" xs={3}>
                                <div>
                                    <span><img id="user_image" src={user_img}></img>Add Photo</span>
                                </div>
                            </Col>
                            <Col xs={9}>
                                <div>
                                    Profile Information
                                </div>
                            </Col>
                        </Row>
                    
                        <Row>
                            <Col xs={3}>
                                <div>
                                    List of actions
                                </div>
                            </Col>
                            <Col xs={9}>
                                <div>
                                    Details
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={3}>Column 2</Col>
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

