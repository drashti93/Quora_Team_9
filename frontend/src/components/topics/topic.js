import React from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { List } from "antd";
import { Icon } from "antd";
import { Component } from "react";
import cookie from "react-cookies";
import {Link} from "react-router-dom";
import { Redirect } from "react-router";
import { getTopicsFollowedByUser } from "../../actions/questionActions";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';

class TopicBar extends Component {
	
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		data: []
	// 	};
	// 	// this.handleClick = this.handleClick.bind(this);
	// }

	componentDidMount() {
		let data = cookie.load("cookie");
		if(data){
		let u_id = data.id;
		console.log(u_id);
		this.props.getTopicsFollowedByUser(u_id);
	}

	// handleClick = (data) => {
	// 	console.log("@@@@@@@", data);
	// 	// window.location.reload();
	// 	// this.props.history.push({
	// 	// 	pathname: "/topics/:topicId",
	// 	// 	state :{
	// 	// 		Topic_id : data
	// 	// 	}
	// 	// })
	// };


	render() {
		let redirectVar = null;
		if (cookie.load("cookie")) {
			redirectVar = <Redirect to="/" />;
		} else {
			redirectVar = <Redirect to="/login" />;
		}
		return (
			<div>
				{/* {redirectVar} */}
				<List
					size="small"
					header={
						<Link to="/">
							<div>{<Icon type="copy" />} Feed</div>
						</Link>
					}
					footer={
						<Link to="/bookmarks">
							<div>{<Icon type="book" />} Bookmark</div>
						</Link>
					}
					split={false}
					dataSource={this.props.question.topics}
					renderItem={item => (
						<List.Item>
							<Link to={`/topics/${item._id}`}>
								{<Icon type="read" />} {item.name}
							</Link>
						</List.Item>
					)}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		...state,
		...props
	};
};

const mapActionToProps = (dispatch, props) => {
	return bindActionCreators(
		{
			getTopicsFollowedByUser
		},
		dispatch
	);
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(TopicBar);
