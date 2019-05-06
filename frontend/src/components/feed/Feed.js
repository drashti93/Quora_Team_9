import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { List, Avatar, Icon, Divider, Tooltip, Skeleton } from "antd";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { getQuestionsAnswersForFeed } from "../../actions/questionActions";
import {Link} from "react-router-dom";

import _ from "lodash";
import axios from "axios";
import Comments from "../comments/Comments";
import stockimage from '../../resources/images/user.png';

export class Feed extends Component {

	componentDidMount() {
		this.props.getQuestionsAnswersForFeed();
	}

	handleAnswerUpvote = (answerId) => {
		console.log(`In handleUpvote: answerId - ${answerId}`);
		let data = cookie.load("cookie");
		let u_id = data.id;
		console.log(u_id);

		const body = {
			//TODO: Remove hardcoding
			"userId": u_id
		}

		axios.defaults.withCredentials = true;
		axios.post(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/answers/${answerId}/upvote`, body)
		.then(response => {
			console.log(`Response: ${response}`);
			if(response.status === 200){
				console.log(`Upvoted answer successfully questionActions->getQuestionsAnswersForFeed(): ${response.data}`);
				// dispatch({
				// 	type: FEED,
				// 	payload: response.data
				// });
			}
		}).catch(error => {
			console.log(`Upvoting answer failed: questionActions->getQuestionsAnswersForFeed() - ${error}`);
		});
	}

	handleAnswerDownvote = (answerId) => {
		console.log(`In handleDownvote: answerId - ${answerId}`);

		console.log(`In handleDownvote: answerId - ${answerId}`);
		let data = cookie.load("cookie");
		let u_id = data.id;
		console.log(u_id);
		const body = {
			//TODO: Remove hardcoding
			"userId": u_id
		}

		axios.defaults.withCredentials = true;
		axios.post(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/answers/${answerId}/downvote`, body)
		.then(response => {
			console.log(`Response: ${response}`);
			if(response.status === 200){
				console.log(`downvoted answer successfully questionActions->getQuestionsAnswersForFeed(): ${response.data}`);
				// dispatch({
				// 	type: FEED,
				// 	payload: response.data
				// });
			}
		}).catch(error => {
			console.log(`downvoting answer failed: questionActions->getQuestionsAnswersForFeed() - ${error}`);
		});

	}

	handleAnswerComments = (answerId) => {
		console.log(`In handleComments: answerId - ${answerId}`);

	}
	handleAnswerBookmarks = (answerId) => {
		console.log(`In handleBookmarks: answerId - ${answerId}`);
		let data = cookie.load("cookie");
		let u_id = data.id;
		console.log(u_id);

		const body = {
			//TODO: Remove hardcoding of uer_id and comment
			"userId": u_id,
			"answerId": answerId,
		}
		console.log(body)
		axios.defaults.withCredentials = true;
		axios.post(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/answers/bookmark`,body)
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

	}

	handleQuestionAnswer = (questionId) => {
		console.log(`In handleQuestionAnswer: questionId - ${questionId}`);

	}
	handleQuestionAnswer = (questionId) => {
		console.log(`In handleQuestionAnswer: questionId - ${questionId}`);

	}

	QuestionFollow = (questionId) =>{
		console.log(`In handleFollowingQuestions : questionId - ${questionId}`);
		let data = cookie.load("cookie");
		let u_id = data.id;
		console.log(u_id);

		const body = {
			//TODO: Remove hardcoding of uer_id and comment
			"userId": u_id,
			"questionId": questionId,
		}
		console.log(body)
		axios.defaults.withCredentials = true;
		axios.post(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/questions/follow`,body)
		.then(response =>{
			console.log(`Response: ${response}`);
			if(response.status === 200){
				console.log(`follow question successfully questionActions->postCommentAnswersForFeed(): ${response.data}`);
				// dispatch({
				// 	type: FEED,
				// 	payload: response.data
				// });
			}
		}).catch(error =>{
			console.log(`follow question failed: questionActions->postCommentAnswersForFeed() - ${error}`)
		})



	}

	render() {

		let redirectVar = null;
		if (!cookie.load("cookie")) {
			redirectVar = <Redirect to="/login" />;
		}

		return (
			<div>
				{redirectVar}
				<List
					itemLayout="vertical"
					size="large"
					
					pagination={{
						onChange: page => {
							console.log(page);
						},
						pageSize: 5
					}}
					dataSource={this.props.question.feed}
					renderItem={question => (
						<div>
							<List.Item 
								key={question._id}
								actions={[
									<Tooltip title="Answers" onClick={()=>{this.handleQuestionAnswer(question._id)}}><Icon type="form" style={{ marginRight: 8 }} />{question.answers.length}</Tooltip>,
									<Tooltip title="Followers" onClick={()=>{this.QuestionFollow(question._id)}}><Icon type="wifi" style={{ marginRight: 8 }} />{question.followers.length}</Tooltip>
								]}
							>
								<List.Item.Meta
								    key={question._id}
									title = {<Link to = {`/questions/${question._id}`} target="_blank">{question.questionText}</Link>}
								/>
								<List
									itemLayout="vertical"
									dataSource={question.answers}
									renderItem={answer => (
										<div>
											<List.Item 
												split={true}
												key={answer._id}
												actions={[
													<Tooltip title="Upvotes" onClick={()=>{this.handleAnswerUpvote(answer._id)}}><Icon type="like" style={{ marginRight: 8 }} />{answer.upvotes.length}</Tooltip>,
													<Tooltip title="Downvotes" onClick={()=>{this.handleAnswerDownvote(answer._id)}}><Icon type="dislike" style={{ marginRight: 8 }} />{answer.downvotes.length}</Tooltip>,
													<Tooltip title="Comments" onClick={()=>{this.handleAnswerComments(answer._id)}}><Icon type="message" style={{ marginRight: 8 }} />{answer.bookmarks.length}</Tooltip>, 
													<Tooltip title="Bookmarks" onClick={()=>{this.handleAnswerBookmarks(answer._id)}}><Icon type="book" style={{ marginRight: 8 }} />{answer.comments.length}</Tooltip>
												]}
											>
												<List.Item.Meta
													avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
													title="Dummy Name"
												/>
												{answer.answerText}
											</List.Item>
											<Comments answerId={answer._id}/>
										</div>
									)}
								/>
							</List.Item>
						</div>
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
			getQuestionsAnswersForFeed
			
		},
		dispatch
	);
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(Feed);
