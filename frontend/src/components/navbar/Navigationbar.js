import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Modal } from 'react-bootstrap'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getprofile, getAllUsers, getalltopics, getallquestions } from '../../actions/navbarActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
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
import Questionadd from "../Questionadd/questionadd";
class Navigationbar extends Component {

  constructor(props, context) {
    super(props);

    this.state = {
      show: false,
      showaddquestion: false,
      searchText: props.text?props.text:"",
      searchArray:[],
      counter:6,
      loadagain:props.loadagain
    };
  }
//   static getDerivedStateFromProps(nextProps, prevState){
//      if(nextProps.text!==prevState.searchText){
//       return { searchText: nextProps.text};
//     }
//     else return null;
//  }
componentWillReceiveProps(nextProps){
  if(nextProps.text!==this.props.text){
    //Perform some operation
    this.setState({searchText: nextProps.text,loadagain:0 });
    // this.classMethod();
  }
}
  componentDidMount() {
    if (cookie.load("cookie")) {
      let data = cookie.load("cookie");
      this.props.ongetallusers();
      this.props.ongetalltopics();
      this.props.ongetallquestions();
      this.props.ongetprofile(data.id);
    }
  }
  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }
  handleClosequestion = () => {
    this.setState({ showaddquestion: false });
  }

  handleShowquestion = () => {
    this.setState({ showaddquestion: true });
  }
  nameclicked=(data)=>{
    this.setState({
      searchText:""
    })
    console.log(data);
  }

  changeHandler = (property, e) => {

    (async () => {
      
      await this.setState({
        [property]: e.target.value
      });
      let {searchText}=this.state;
      if (property == "searchText" && searchText.length==0) {
        this.setState({
          searchArray:[],
          loadagain:1
        })
      }
      if (property == "searchText" && searchText.length!=0) {
        let searchKeywords=searchText.trim().split(" ");
        let topics=this.props.navbar.topics.map((data)=>{
          let found=false;
            searchKeywords.forEach((elem)=>{
              if(data.name.indexOf(elem)>=0){
                found=true;
              }
            })
           if(found){
             return {type:"Topic :",link:`/topic/${data._id}`,value:data.name,id:data._id};
           }
        });
        let questions=this.props.navbar.questions.map((data)=>{
          let found=false;
            searchKeywords.forEach((elem)=>{
              if(data.questionText&&data.questionText.indexOf(elem)>=0){
                found=true;
              }
            })
           if(found){
            return {type:"Question :",link:`/question/${data._id}`,value:data.questionText,id:data._id};
          }
        });
        let users=this.props.navbar.userList.map((data)=>{
          let found=false;
          let name=`${data.firstName} ${data.lastName}`;
            searchKeywords.forEach((elem)=>{
              if(name.indexOf(elem)>=0){
                found=true;
              }
            })
           if(found){
            return {type:"Profile :",link:`/profile/${data._id}`,value:name,id:data._id};
          }
        });
        users=_.compact(users);
        questions=_.compact(questions);
        topics=_.compact(topics);
        let arry=[...users,...questions,...topics];
        this.setState({
          searchArray:arry,
          loadagain:1
        })
      }
    })();

  }

  render() {
    let ModalVar = <Modal className="inbox-modal-parent" show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Inbox</Modal.Title>
      </Modal.Header>
      <Modal.Body><Inbox></Inbox></Modal.Body>
    </Modal>

    let ModalQuestionVar = <Modal show={this.state.showaddquestion} onHide={this.handleClosequestion}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Question</Modal.Title>
      </Modal.Header>
      <Modal.Body><Questionadd></Questionadd></Modal.Body>
    </Modal>

    const imgUrl = _.has(this, 'props.navbar.profile.data.profileImage');
    let {counter,searchArray}=this.state;
    counter=Math.min(counter,searchArray.length);
    const image = <img className="profile-image" src={imgUrl ? this.props.navbar.profile.data.profileImage : stockimage}></img>
    return (
      <div className="navbar-parent">
        <Navbar fixed="top" expand="lg">
          <div className="container">
            <Navbar.Brand><Link to="/"><img className="navbar-logo" src={navbarLogo}></img></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link className={window.location.pathname == "/" ? "active" : ""}><Link to="/"><SVG src={homelogo}></SVG>Home</Link></Nav.Link>
                <Nav.Link onClick={this.handleShow}><SVG src={answerlogo}></SVG>Inbox</Nav.Link>
                <Nav.Link><SVG src={spaceslogo}></SVG>Spaces</Nav.Link>
                <Nav.Link ><SVG src={notificationslogo}></SVG>Notifications</Nav.Link>
              </Nav>

              {/* <FormControl type="text" placeholder="Search" className="mr-sm-2 navbar-search" /> */}
              <div className="search-parent">
              <input type="text" placeholder="Search" value={this.state.searchText} className="mr-sm-2 navbar-search form-control" onChange={(e) => { this.changeHandler("searchText", e) }}></input>
              <ul className={`search-list ${this.state.searchText.length > 0 &&this.state.loadagain? "active" : ""}`}>
                <div className="modal-overlay"></div>
              <li className="search-option" onClick={() => { this.nameclicked("search") }}><Link to={"/search/"+this.state.searchText}>{` Search: ${this.state.searchText}`} <FontAwesomeIcon className="search-arrows" icon={faAngleRight} /></Link></li>

                {  
                  _.times(counter,(index)=>{
                    return (<li onClick={() => { this.nameclicked(searchArray[index]) }} key={index}><Link to={searchArray[index].link}>{` ${searchArray[index].type} ${searchArray[index].value}`}<FontAwesomeIcon className="search-arrows" icon={faAngleRight} /></Link></li>)
                  })
                }
                {/* {this.state.searchArray.map((data, index) => {
                  return (<li onClick={() => { this.nameclicked(data) }} key={index} value={data._id}>{` ${data.type} ${data.value}`}</li>)
                })} */}
              </ul>
              </div>
              <NavDropdown title={image} id="basic-nav-dropdown">
                <NavDropdown.Item><Link to="/profile">Profile</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/settings">Settings</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/content">Your Content</Link></NavDropdown.Item>
              </NavDropdown>
              <Button className="question-button" onClick={this.handleShowquestion}>Add Question</Button>


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
    ongetallusers: getAllUsers,
    ongetalltopics: getalltopics,
    ongetallquestions: getallquestions
  }, dispatch);
}

export default connect(mapStatetoProps, mapActionToProps)(Navigationbar);