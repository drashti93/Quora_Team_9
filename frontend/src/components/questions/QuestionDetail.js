import React, { Component } from "react";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import { Link, Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
	Layout,
	Container,
	Grid,
	Row,
	Col,
	Modal,
	ModalFooter,
	Button,
	Form
} from "react-bootstrap";
import Navigationbar from "../navbar/Navigationbar";
import { Switch } from "antd";
import axios from "axios";

export class QuestionDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			question_id: this.props.match.params.question_id,
			payload : {},
		};

		this.onFollowToggle = this.onFollowToggle.bind(this);
	}

		onFollowToggle() {
		axios
			.get(`http://localhost:3001/answers/${this.state.question_id}/answers`)
			.then(response => {
				console.log("Status Code: ", response.status);
				if (response.status === 200) {
					console.log("Answers for question fetched");
					console.log(response.data.answers);
					this.setState({
						payload : response.data.answers
					});
				} else {
					console.log("Some error occurred in the backend");
				}
			});
	}


	render() {
		return (
			<div>
				<Navigationbar />
				<div className="container mt70">
					<div className="row">
						<div className="col-lg-2 col-md-2 col-xs-12 left-stick">
							<Row>
								<div id="feeds_title">
									<h6>Related Questions</h6>
								</div>
							</Row>
						</div>
						<div className="col-lg-8 col-md-8 col-xs-12">
							<div>
								{this.state.payload}
								{/* <Button onClick= {this.onFollowToggle}>Click</Button> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default QuestionDetail;
