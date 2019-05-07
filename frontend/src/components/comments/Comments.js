import React, { Component } from "react";
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import moment from 'moment';
import axios from 'axios';

const TextArea = Input.TextArea;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
	<div>
		<Form.Item>
			<TextArea autosize onChange={onChange} value={value} />
		</Form.Item>
		<Form.Item>
			<Button
				htmlType="submit"
				loading={submitting}
				onClick={onSubmit}
				type="primary"
			>
				Add Comment
			</Button>
		</Form.Item>
	</div> 
);

const CommentList = ( {comments} ) => (
	<List
		dataSource={comments}
		split={true}
		itemLayout="horizontal"
		renderItem={comment => (
			<List.Item 
				key={comment._id}
			>
				<List.Item.Meta
					avatar={<Avatar src={comment.userId.profileImage ? comment.userId.profileImage.url : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />}
					title={<div>{comment.userId.firstName} {comment.userId.lastName}</div>}
				/>
				{/* <Comment style={{float: "left"}} content={comment.comment}/> */}
				{comment.comment}
			</List.Item>
		)}
	/>
);

export class Comments extends Component {
	state = {
		comments: [],
		submitting: false,
		value: ""
	};

	

	handleSubmit = () => {

		console.log(`Comments passed: ${this.props.commentsList}`)

		if (!this.state.value) {
			return;
		}

		this.setState({
			submitting: true
		});

		setTimeout(() => {
			this.setState({
				submitting: false,
				value: "",
				comments: [
					{
						author: "Han Solo",
						avatar:
							"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
						content: <p>{this.state.value}</p>
					},
					...this.state.comments
					// ...this.props.commentsList
				]
			});
		}, 1000);

		const body = {
			//TODO: Remove hardcoding of uer_id and comment
			"userId": "5cc3f69dd23457601476d016",
			"answerId": this.props.answerId,
			"comment":this.state.value
		}

		console.log(body)
		axios.defaults.withCredentials = true;
		axios.post(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/comments/comment`,body)
		.then(response =>{
			console.log(`Response: ${response}`);
			if(response.status === 200){
				console.log(`comment answer successfully questionActions->postCommentAnswersForFeed(): ${response.data}`);
				// dispatch({
				// 	type: FEED,
				// 	payload: response.data
				// });
			}
		}).catch(error =>{
			console.log(`comments answer failed: questionActions->postCommentAnswersForFeed() - ${error}`)
		})

	};

	handleChange = e => {
		this.setState({
			value: e.target.value
		});
	};

	render() {
		const { comments, submitting, value } = this.state;

		return (
			<div>
				{this.props.showComments === true && (
					<CommentList comments={this.props.commentsList} />
				)}
				<Comment
					avatar={
						<Avatar
							src={this.props.navbar.profile.data.profileImage? this.props.navbar.profile.data.profileImage.url : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
							alt={ <div>{this.props.navbar.profile.data.firstName} {this.props.navbar.profile.data.firstName}</div> }
						/>
					}
					content={
						<Editor
							onChange={this.handleChange}
							onSubmit={this.handleSubmit}
							submitting={submitting}
							value={value}
						/>
					}
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

		},
		dispatch
	);
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(Comments);
