import React, { Component } from "react";
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import axios from "axios";


const TextArea = Input.TextArea;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
	<div>
		<Form.Item>
			<TextArea rows={1} onChange={onChange} value={value} />
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

const CommentList = ({ comments }) => (
	<List
		dataSource={comments}
		header={`${comments.length} ${
			comments.length > 1 ? "replies" : "reply"
		}`}
		itemLayout="horizontal"
		renderItem={props => <Comment {...props} />}
	/>
);

export class Comments extends Component {

	constructor(props){
		super(props)
	this.state = {
		comments: [],
		submitting: false,
		value: ""
	};
}

	handleSubmit = () => {
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
						content: <p>{this.state.value}</p>,
						datetime: moment().fromNow()
					},
					...this.state.comments
				]
			});
		}, 1000);

		const body = {
			//TODO: Remove hardcoding of uer_id and comment
			"userId": "5cc3f69dd23457601476d016",
			"answer_id": this.props.answer_id,
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
				{comments.length > 0 && (
					<CommentList comments={comments} />
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

export default Comments

 
