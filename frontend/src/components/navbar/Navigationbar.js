import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom'
import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap'
import navbarLogo from "../../resources/images/quoraNavbarLogo.svg"
import '../../resources/css/navbar.css';
import homelogo from "../../resources/images/home.svg";
import answerlogo from "../../resources/images/answer.svg";
import spaceslogo from "../../resources/images/spaces.svg";
import notificationslogo from "../../resources/images/notifications.svg";
import SVG from 'react-inlinesvg';
class Navigationbar extends Component{
render(){
    return(
      <div className="navbar-parent">
        <Navbar  expand="lg">
        <div className="container">

  <Navbar.Brand href="#home"><img className="navbar-logo" src={navbarLogo}></img></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home"><SVG src={homelogo}></SVG>Home</Nav.Link>
      <Nav.Link href="#home"><SVG src={answerlogo}></SVG>Answer</Nav.Link>
      <Nav.Link href="#home"><SVG src={spaceslogo}></SVG>Spaces</Nav.Link>
      <Nav.Link href="#home"><SVG src={notificationslogo}></SVG>Notifications</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
  </div>

</Navbar>
</div>
    )
}
}

export default Navigationbar;