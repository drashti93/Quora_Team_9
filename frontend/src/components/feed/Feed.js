import React, { Component } from "react";
import { List, Avatar, Icon, Divider } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

export class Feed extends Component {

	constructor(props){
		super(props)
	
		this.state={
		  val:""
		}
		this.handleAnswerComments = this.handleAnswerComments.bind(this)
	}

	changeHandlerValue=(e)=>{
		this.setState({
		  value:e.target.value
		});
	  }
	componentDidMount() {
		this.props.getQuestionsAnswersForFeed();
	}

	handleAnswerUpvote = (answerId) => {
		console.log(`In handleUpvote: answerId - ${answerId}`);

		const body = {
			//TODO: Remove hardcoding
			"userId": "5cc3f69dd23457601476d016"
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
		const body = {
			//TODO: Remove hardcoding
			"userId": "5cc3f69dd23457601476d016"
		}
		console.log(answerId)

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
	// 	console.log(`In handleComments: answerId - ${answerId}`);
	// 	const body = {
	// 		//TODO: Remove hardcoding of uer_id and comment
	// 		"userId": "5cc3f69dd23457601476d016",
	// 		"answer_id": answerId,
	// 		"comment":"comment"

	// 	}
	// 	console.log(answerId)
	// axios.defaults.withCredentials = true;
	// axios.post(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/comment/${answerId}/comment`,body)
	// .then(response =>{
	// 	console.log(`Response: ${response}`);
	// 	if(response.status === 200){
	// 		console.log(`comment answer successfully questionActions->postCommentAnswersForFeed(): ${response.data}`);
	// 		// dispatch({
	// 		// 	type: FEED,
	// 		// 	payload: response.data
	// 		// });
	// 	}
	// }).catch(error =>{
	// 	console.log(`comments answer failed: questionActions->postCommentAnswersForFeed() - ${error}`)
	// })
	


	}
	handleAnswerBookmarks = (answerId) => {
		console.log(`In handleBookmarks: answerId - ${answerId}`);

		const body = {
			//TODO: Remove hardcoding of uer_id and comment
			"userId": "5cc3f69dd23457601476d016",
			"answer_id": answerId,
	

		}
	console.log(answerId)
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
	handleQuestionFollowers= (questionId) => {
		console.log(`In handleQuestionAnswer: questionId - ${questionId}`);

	}

	// HandleFunctionforComment = (data) => {

	// 	//console.log("In comment handler function")
	
	// 		this.setState({
	// 			val:data
	// 		})
		
		
	// }

	render() {

		const listData = [];
		for (let i = 0; i < 23; i++) {
			listData.push({
				href: "http://ant.design",
				title: `ant design part ${i}`,
				avatar:
					"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
				description:
					"Ant Design, a design language for background applications, is refined by Ant UED Team.",
				content:
					"We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
			});
		}

		const IconText = ({ type, text }) => (
			<span>
				<Icon type={type} style={{ marginRight: 8 }} />
				{text}
			</span>
		);

		return (
			<div>
				<List
					itemLayout="vertical"
					size="large"
					pagination={{
						onChange: page => {
							console.log(page);
						},
						pageSize: 3
					}}
					dataSource={listData}
					renderItem={item => (
						<div>
							<List.Item
								key={item.title}
								actions={[
<<<<<<< Updated upstream
									<IconText
										type="star-o"
										text="156"
									/>,
									<IconText
										type="like-o"
										text="156"
									/>,
									<IconText type="message" text="2" />
=======
									<Tooltip title="Answers" onClick={()=>{this.handleQuestionAnswer(question._id)}}><Icon type="form" style={{ marginRight: 8 }} />{question.answers.length}</Tooltip>,
									<Tooltip title="Followers" onClick={()=>{this.handleQuestionFollowers(question._id)}}><Icon type="wifi" style={{ marginRight: 8 }} />{question.followers.length}</Tooltip>
>>>>>>> Stashed changes
								]}
								// extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
							>
								<List.Item.Meta
									// avatar={<Avatar src={item.avatar} />}
									title={
										<a href={item.href}>
											{item.title}
										</a>
									}
									description={
										<div>
<<<<<<< Updated upstream
											<Avatar src={item.avatar} />
											&nbsp; &nbsp;
											{item.description}
=======
											<List.Item 
												split={true}
												key={answer._id}
												actions={[
													<Tooltip title="Upvotes" onClick={()=>{this.handleAnswerUpvote(answer._id)}}><Icon type="like" style={{ marginRight: 8 }} />{answer.upvotes.length}</Tooltip>,
													<Tooltip title="Downvotes" onClick={()=>{this.handleAnswerDownvote(answer._id)}}><Icon type="dislike" style={{ marginRight: 8 }} />{answer.downvotes.length}</Tooltip>,
													<Tooltip title="Comments" onClick={()=>{this.handleAnswerComments(answer._id)}}><Icon type="submit" style={{ marginRight: 8 }} />{answer.bookmarks.length}</Tooltip>, 
													<Tooltip title="Bookmarks" onClick={()=>{this.handleAnswerBookmarks(answer._id)}}><Icon type="book" style={{ marginRight: 8 }} />{answer.comments.length}</Tooltip>
												]}
											>
												<List.Item.Meta
													avatar={
														<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
													}
													title={answer.userId}
												/>
												{answer.answerText}
											</List.Item>
											<Comments answer_id={answer._id}/>
>>>>>>> Stashed changes
										</div>
									}
								/>
								{item.content}
							</List.Item>
							<div>This is my comment</div>

							<Divider />
						</div>
					)}
				/>
				,
			</div>
		);
	}
}

const mapStateToProps = state => ({
	
});

Feed.propTypes = {
	
};

<<<<<<< Updated upstream
export default connect(mapStateToProps, {  })(Feed);
=======
export default connect(
	mapStateToProps,
	mapActionToProps
)(Feed);

>>>>>>> Stashed changes
