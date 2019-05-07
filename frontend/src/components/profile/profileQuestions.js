import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { List, Avatar, Icon, Divider, Tooltip, Skeleton } from "antd";
import { connect } from "react-redux";
import Comments from "../comments/Comments"
import * as actions from "../../actions/profileActions"

export class ProfileQuestions extends Component {

    constructor(props){
        super(props);
        this.state={
            questions: "",
            user_id: "",
        }
    }
	componentDidMount() {
		// this.props.getQuestionsAsked(cookie.load('cookie').id);
		this.props.getQuestionsAsked(this.props.user);
	}	

	handleAnswerDownvote = (answerId) => {
		console.log(`In handleDownvote: answerId - ${answerId}`);

	}

	handleQuestionAnswer = (questionId) => {
		console.log(`In handleQuestionAnswer: questionId - ${questionId}`);

	}
	handleQuestionAnswer = (questionId) => {
		console.log(`In handleQuestionAnswer: questionId - ${questionId}`);

	}

	render() {

		let redirectVar = null;
		if (!cookie.load("cookie")) {
			redirectVar = <Redirect to="/login" />;
		}

		return (
			<div className="main-div">
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
                    
					dataSource={this.props.questions.results}
					renderItem={question => (
						<div className="feed-container">
							<List.Item 
								key={question._id}
								actions={[
									<Tooltip title="Answers" onClick={()=>{this.handleQuestionAnswer(question._id)}}><Icon type="form" style={{ marginRight: 8 }} />{question.answers.length}</Tooltip>,
									<Tooltip title="Followers" onClick={()=>{this.handleQuestionAnswer(question._id)}}><Icon type="wifi" style={{ marginRight: 8 }} />{question.followers.length}</Tooltip>
								]}
							>
								<List.Item.Meta
									title={question.questionText}
								/>
								
							</List.Item>
						</div>
					)}
				/>
			</div>
		);
	}
}

function mapStatetoProps(state) {
    return{
        questions: state.profile.questions
    }
}

function mapDispatchToProps(dispatch) {
    
    return {
        getQuestionsAsked: (user_id) => dispatch(actions.getQuestionsAsked(user_id))
    };
}

export default connect(mapStatetoProps,mapDispatchToProps)(ProfileQuestions);