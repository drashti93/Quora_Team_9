import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button,Modal } from 'react-bootstrap'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getprofile,getAllUsers } from '../../actions/navbarActions';
import _ from "lodash";
//resources
import navbarLogo from "../../resources/images/quoraNavbarLogo.svg"
import '../../resources/css/navbar.css';
import homelogo from "../../resources/images/home.svg";
import answerlogo from "../../resources/images/answer.svg";
import spaceslogo from "../../resources/images/spaces.svg";
import notificationslogo from "../../resources/images/notifications.svg";
import SVG from 'react-inlinesvg';
import stockimage from '../../resources/images/user.png';
import Inbox from "../inbox/inbox";
class Navigationbar extends Component {

  constructor(props, context) {
    super(props);

    this.state = {
      show: false,
      showaddquestion:false
    };
  }
  componentDidMount() {
    if(cookie.load("cookie")){
      let data=cookie.load("cookie");
      this.props.ongetallusers();
    this.props.ongetprofile(data.id);
    }
  }
  handleClose=()=>{
    this.setState({ show: false });
  }

  handleShow=()=> {
    this.setState({ show: true });
  }
  handleClosequestion=()=>{
    this.setState({ showaddquestion: false });
  }

  handleShowquestion=()=> {
    this.setState({ showaddquestion: true });
  }
  render() {
    let ModalVar=  <Modal className="inbox-modal-parent" show={this.state.show} onHide={this.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Inbox</Modal.Title>
    </Modal.Header>
    <Modal.Body><Inbox></Inbox></Modal.Body>
  </Modal>

    let ModalQuestionVar=  <Modal show={this.state.showaddquestion} onHide={this.handleClosequestion}>
    <Modal.Header closeButton>
      <Modal.Title>Add a Qustion</Modal.Title>
    </Modal.Header>
    <Modal.Body>Tips on getting good answers quickly
Make sure your question hasn't been asked already
Keep your question short and to the point
Double-check grammar and spelling</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={this.handleClosequestion}>
        Close
      </Button>
      <Button variant="primary" onClick={this.handleClosequestion}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>

    const imgUrl=_.has(this,'props.navbar.profile.data.profileImage');
    const image = <img className="profile-image" src={imgUrl?this.props.navbar.profile.data.profileImage:stockimage}></img>
    return (
      <div className="navbar-parent">
        <Navbar expand="lg">
          <div className="container">

            <Navbar.Brand><Link to="/"><img className="navbar-logo" src={navbarLogo}></img></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link className={window.location.pathname=="/"?"active":""}><Link to="/"><SVG src={homelogo}></SVG>Home</Link></Nav.Link>
                <Nav.Link onClick={this.handleShow}><SVG src={answerlogo}></SVG>Inbox</Nav.Link>
                <Nav.Link><SVG src={spaceslogo}></SVG>Spaces</Nav.Link>
                <Nav.Link ><SVG src={notificationslogo}></SVG>Notifications</Nav.Link>
                <NavDropdown title={image} id="basic-nav-dropdown">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  <NavDropdown.Item>Settings</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button className="question-button" onClick={this.handleShowquestion}>Add Question</Button>
              </Form>
            </Navbar.Collapse>
          </div>

        </Navbar>
        {ModalVar}
        {ModalQuestionVar}
      </div>
    )
  }
}

const mapStatetoProps = (state, props) => {
  return {
    ...state,
    ...props
  };
}
const mapActionToProps = (dispatch, props) => {
  return bindActionCreators({
    ongetprofile: getprofile,
    ongetallusers:getAllUsers
  }, dispatch);
}

export default connect(mapStatetoProps, mapActionToProps)(Navigationbar);