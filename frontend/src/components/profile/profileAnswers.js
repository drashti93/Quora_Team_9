import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { List, Avatar, Icon, Divider, Tooltip, Button } from "antd";
import { connect } from "react-redux";
import Comments from "../comments/Comments"
import * as actions from "../../actions/profileActions"
import axios from "axios";
import ReactQuill from 'react-quill';

export class ProfileAnswers extends Component {

	update=()=>{
		this.props.getQuestionsAnswered(this.props.user)
		
	}
    constructor(props){
        super(props);
        this.state={
            answers: "",
			user_id: "",
			showComments1: [],
        }
    }
	componentDidMount() {
		// if(this.props.match.params.user_id){
		// 	this.props.getQuestionsAnswered(this.props.match.params.user_id);
		// }
		// else{
		// 	this.props.getQuestionsAnswered(cookie.load('cookie').id);
		// }
		this.update();
		var arr = [];
      for(var i=0; i<20; i++){
          arr.push(true);
      }
      this.setState({
          showComments1: arr
      })
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
				this.update();
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
				this.update();
			}
		}).catch(error => {
			console.log(`downvoting answer failed: questionActions->getQuestionsAnswersForFeed() - ${error}`);
		});

	}


	handleAnswerComments = (i, answer) => {
		console.log(`In handleComments: answerId - ${answer._id}`);
		let {showComments1}=this.state;
		showComments1[i]=!showComments1[i];
		this.setState({
			showComments1
		})
		// if(this.state.showComments1[i] == false) {
		// 	console.log(this.state.showComments1)
		// 	var arr = this.state.showComments1;
		// 	arr[i] = true;
		// 	this.setState({
		// 		showComments1: arr
		// 	})
		// 	console.log(this.state.showComments1)
		// } else if (this.state.showComments1[i] == true) {
		// 	// this.setState({showComments: false})
		// 	var arr = this.state.showComments1;
		// 	arr[i] = false;
		// 	this.setState({
		// 		showComments1: arr
		// 	})
		// }



		console.log(`Answer Comments - ${answer.comments}`)

		answer.comments.map(comment => {
			console.log(`Each comment - ${comment}`);
		})
		
		

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
				this.update();
			}
		}).catch(error =>{
			console.log(`comments answer failed: questionActions->postCommentAnswersForFeed() - ${error}`)
		})

	}

	handleQuestionAnswer = (questionId) => {
		console.log(`In handleQuestionAnswer: questionId - ${questionId}`);

	}

	handleChange = (content, delta, source, editor) => {
		const text = editor.getText(content);
		this.setState({ bodyText: content, plainText:text});

	}

	handleQuestionFollow = (questionId) => {
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
				this.update();
			}
		}).catch(error =>{
			console.log(`follow question failed: questionActions->postCommentAnswersForFeed() - ${error}`)
		})
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
			['bold', 'italic', 'underline'],
			[{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
			['link', 'image', 'video'],
			['clean']
		];

		let state=this.state;
		console.log(this.props.answers)
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
                    
					dataSource={this.props.answers}
					renderItem={(question, index) => (
						<div>
							<List.Item 
								key={question._id}
								actions={[
									<Tooltip title="Answers" onClick={()=>{this.postAnswer(question._id)}}><Icon type="form" style={{ marginRight: 8 }} />{question.answers.length}</Tooltip>,
									<Tooltip title="Followers" onClick={()=>{this.handleQuestionAnswer(question._id)}}><Icon type="wifi" style={{ marginRight: 8 }} />{question.followers.length}</Tooltip>
								]}
							>
								<List.Item.Meta
									title={question.questionText}
								/>
								<List
									itemLayout="vertical"
									dataSource={question.answers}
									renderItem={(answer, index) => (
										<div>
											<List.Item 
												split={true}
												key={answer._id}
												actions={[
													<Tooltip title="Upvotes" onClick={()=>{this.handleAnswerUpvote(answer._id)}}><Icon type="like" style={{ marginRight: 8 }} />{answer.upvotes.length}</Tooltip>,
													<Tooltip title="Downvotes" onClick={()=>{this.handleAnswerDownvote(answer._id)}}><Icon type="dislike" style={{ marginRight: 8 }} />{answer.downvotes.length}</Tooltip>,
													<Tooltip title="Comments" onClick={()=>{this.handleAnswerComments(index, answer)}}><Icon type="message" style={{ marginRight: 8 }} />{answer.comments.length}</Tooltip>, 
													<Tooltip title="Bookmarks" onClick={()=>{this.handleAnswerBookmarks(answer._id)}}><Icon type="book" style={{ marginRight: 8 }} />{answer.bookmarks.length}</Tooltip>
												]}
											>
												<List.Item.Meta
													avatar={
														<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
													}
													title={answer.userId?answer.userId.firstName+" "+answer.userId.lastName:""}
												/>
												<p dangerouslySetInnerHTML={{__html: answer.answerText}}></p>
											</List.Item>
											<Comments answerId={answer._id} showComments={state.showComments1[index]} commentsList={answer.comments}/>
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
		);
	}
}

function mapStatetoProps(state) {
    return{
        answers: state.profile.questionsAnswered
    }
}

function mapDispatchToProps(dispatch) {
    
    return {
        getQuestionsAnswered: (user_id) => dispatch(actions.getQuestionsAnswered(user_id))
    };
}

export default connect(mapStatetoProps,mapDispatchToProps)(ProfileAnswers);