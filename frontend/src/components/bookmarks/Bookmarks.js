import React, { Component } from 'react'
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { List, Avatar, Icon, Tooltip, Button, Divider } from "antd";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { getBookmarkedAnswersWithCorrespondingQuestionsForBookmark } from "../../actions/questionActions";
import {Link} from "react-router-dom";
import ReactQuill from 'react-quill';
import axios from "axios";
import Comments from "../comments/Comments";

export class Bookmarks extends Component {

	componentDidMount() {
		this.update();
	}
	update=()=>{
		this.props.getBookmarkedAnswersWithCorrespondingQuestionsForBookmark();

	}
	constructor(props) {
		super(props);
		this.state = {
			bodyText: '',
			plainText: '',
			showComments: false
		};
	}

	handleAnswerUpvote = (answerId) => {
		console.log(`In handleUpvote: answerId - ${answerId}`);

		const body = {
			//TODO: Remove hardcoding
			"userId": cookie.load('cookie').id
		}

		axios.defaults.withCredentials = true;
		axios.post(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/answers/${answerId}/upvote`, body)
		.then(response => {
			console.log(`Response: ${response}`);
			if(response.status === 200){
				this.update();
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
		const body = {
			//TODO: Remove hardcoding
			"userId": cookie.load('cookie').id
		}

		axios.defaults.withCredentials = true;
		axios.post(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/answers/${answerId}/downvote`, body)
		.then(response => {
			console.log(`Response: ${response}`);
			if(response.status === 200){
				this.update();
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

	handleAnswerComments = (answer) => {
		console.log(`In handleComments: answerId - ${answer._id}`);

		if(this.state.showComments === false) {
			this.setState({showComments: true})
		} else if (this.state.showComments === true) {
			this.setState({showComments: false})
		}


		console.log(`Answer Comments - ${answer.comments}`)

		answer.comments.map(comment => {
			console.log(`Each comment - ${comment}`);
		})
		
		

	}

	handleAnswerBookmarks = (answerId) => {
		console.log(`In handleBookmarks: answerId - ${answerId}`);

		const body = {
			//TODO: Remove hardcoding of uer_id and comment
			"userId": cookie.load('cookie'.id),
			"answer_id": answerId,
		}
		console.log(answerId)
		axios.defaults.withCredentials = true;
		axios.post(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/answers/bookmark`,body)
		.then(response =>{
			console.log(`Response: ${response}`);
			if(response.status === 200){
				this.update();
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
	handleQuestionFollow = (questionId) => {
		console.log(`In handleQuestionAnswer: questionId - ${questionId}`);

	}

	handleChange = (content, delta, source, editor) => {
		const text = editor.getText(content);
		this.setState({ bodyText: content, plainText:text});
	}


	postAnswer=(qid)=>{
		(async()=>{
			let obj={ answerText:this.state.bodyText, userId:cookie.load('cookie').id, isAnonymous:false, credentials:null, questionId:qid }

			let result=await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/answers`,obj);
			alert("Answer Submitted successfully!")
			this.update();
		})();
	}
	render() {

		let redirectVar = null;
		if (!cookie.load("cookie")) {
			redirectVar = <Redirect to="/login" />;
		}

		const toolbarOptions = [
			['bold', 'italic', 'underline'],        // toggled buttons
			[{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
			['link', 'image', 'video'],
			['clean']                                         // remove formatting button
		];

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
					dataSource={this.props.question.bookmarkFeed}
					renderItem={question => (
						<div className="feed-container">
							<List.Item 
								key={question._id}
								actions={[
									<Tooltip title="Answers" onClick={()=>{this.handleQuestionAnswer(question._id)}}><Icon type="form" style={{ marginRight: 8 }} />{question.answers.length}</Tooltip>,
									<Tooltip title="Followers" onClick={()=>{this.handleQuestionFollow(question._id)}}><Icon type="wifi" style={{ marginRight: 8 }} />{question.followers.length}</Tooltip>
								]}
							>
								<List.Item.Meta
								className="card-heading"
								    key={question._id}
									title = {<Link to = {`/questions/${question._id}`} target="_blank">{question.questionText}</Link>}
								/>
								<List
									itemLayout="vertical"
									dataSource={question.answers}
									renderItem={answer => (
										<div class="answer-parent">
											<List.Item 
												key={answer._id}
												actions={[
													<Tooltip title="Upvotes" onClick={()=>{this.handleAnswerUpvote(answer._id)}}><Icon type="like" style={{ marginRight: 8 }} />{answer.upvotes.length}</Tooltip>,
													<Tooltip title="Downvotes" onClick={()=>{this.handleAnswerDownvote(answer._id)}}><Icon type="dislike" style={{ marginRight: 8 }} />{answer.downvotes.length}</Tooltip>,
													<Tooltip title="Comments" onClick={()=>{this.handleAnswerComments(answer)}}><Icon type="message" style={{ marginRight: 8 }} />{answer.comments.length}</Tooltip>, 
													<Tooltip title="Bookmarks" onClick={()=>{this.handleAnswerBookmarks(answer._id)}}><Icon type="book" style={{ marginRight: 8 }} />{answer.bookmarks.length}</Tooltip>
												]}
											>
												<List.Item.Meta
													avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
													title={answer.userId?answer.userId.firstName+" "+answer.userId.lastName:"" }
												/>
												<p dangerouslySetInnerHTML={{__html: answer.answerText}}></p>
											</List.Item>
											<Comments answerId={answer._id} showComments={this.state.showComments} commentsList={answer.comments}/>
										</div>
									)}
								/>
							</List.Item>

							<div>
								<ReactQuill 
									modules={{toolbar:toolbarOptions}}
									onChange={this.handleChange} 
									
								/>
								<Button className="btn-quora" type="primary" onClick={()=>{this.postAnswer(question._id)}} htmlType="submit">Submit</Button>
							</div>

							<br/>
							<br/>
							<Divider dashed={true}/>

						</div>
					)}
				/>
			</div>
		)
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
			getBookmarkedAnswersWithCorrespondingQuestionsForBookmark
		},
		dispatch
	);
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(Bookmarks);