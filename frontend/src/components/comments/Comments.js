import React, { Component } from "react";
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
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
				<Comment content={comment.comment}/>
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
				if(this.props.updateFunc){
				this.props.updateFunc();
				}
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
							src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
							alt="Han Solo"
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

export default Comments;
