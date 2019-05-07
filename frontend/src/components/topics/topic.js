import React from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { List } from "antd";
import { Icon } from "antd";
import { Component } from "react";
import cookie from "react-cookies";
import {Link} from "react-router-dom";
import { Redirect } from "react-router";
import { Button } from "react-bootstrap";

class TopicBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		// this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		let data = cookie.load("cookie");
		let u_id = data.id;
		console.log(u_id);

		axios
			.get("http://localhost:3001/users/" + u_id + "/topics")
			.then(response => {
				if (response.status === 200) {
					console.log("------------->", response.data);
					this.setState({
						data: [...response.data]
					});
				}
			});
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
					header={<div>{<Icon type="copy" />} Feed</div>}
					footer={
						<Link to="/bookmarks">
							<div>{<Icon type="book" />} Bookmark</div>
						</Link>
					}
					split={false}
					dataSource={this.state.data}
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

export default TopicBar;
