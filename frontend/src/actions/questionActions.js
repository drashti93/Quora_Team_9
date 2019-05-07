import axios from "axios";
import { FEED, BOOKMARK_FEED, TOPIC_FEED, QUESTIONS_FEED, TOPICDETAILS, TOPICS } from './types';

export const getQuestionsAnswersForFeed = (userId) => dispatch => {

	axios.defaults.withCredentials = true;
	axios.get(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/users/${userId}/feed`)
	.then(response => {
		console.log(`Response: ${response}`);
		if(response.status === 200){
			console.log(`Got question-answers for feed in questionActions->getQuestionsAnswersForFeed(): ${response.data}`);
			dispatch({
				type: FEED,
				payload: response.data
			});
		}
	}).catch(error => {
		console.log(`Something wrong in questionActions->getQuestionsAnswersForFeed(): ${error}`);
	});
}

export const getBookmarkedAnswersWithCorrespondingQuestionsForBookmark = (userId) => dispatch => {

	axios.defaults.withCredentials = true;
	axios.get(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/users/${userId}/bookmarks`)
	.then(response => {
		console.log(`Response: ${response}`);
		if(response.status === 200){
			console.log(`Got question-answers for bookmark feed in questionActions->getBookmarkedAnswersWithCorrespondingQuestionsForBookmark(): ${response.data}`);
			dispatch({
				type: BOOKMARK_FEED,
				payload: response.data
			});
		}
	}).catch(error => {
		console.log(`Something wrong in questionActions->getBookmarkedAnswersWithCorrespondingQuestionsForBookmark(): ${error}`);
	});

}


export const getQuestionsAnswersForUserTopics = (topicId) => dispatch => {

	axios.defaults.withCredentials = true;
	axios.get(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/topics/${topicId}/questions/following`)
	.then(response => {
		console.log(`Response: ${response}`);
		if(response.status === 200){
			console.log(`Got question-answers for topics feed in questionActions->getQuestionsAnswersForUserTopics(): ${response.data}`);
			dispatch({
				type: TOPIC_FEED,
				payload: response.data
			});
		}
	}).catch(error => {
		console.log(`Something wrong in questionActions->getQuestionsAnswersForUserTopics(): ${error}`);
	});
}

export const getQuestionsAnswersByQuestionId = (questionId) => dispatch => {

	axios.defaults.withCredentials = true;
	axios.get(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/questions/${questionId}/details`)
	.then(response => {
		console.log(`Response: ${response}`);
		if(response.status === 200){
			console.log(`Got question-answers for question details feed in questionActions->getQuestionsAnswersByQuestionId(): ${response.data}`);
			dispatch({
				type: QUESTIONS_FEED,
				payload: response.data
			});
		}
	}).catch(error => {
		console.log(`Something wrong in questionActions->getQuestionsAnswersByQuestionId(): ${error}`);
	});

}

export const getTopicNameAndNumberOfFollowersById = (topicId) => dispatch => {

	axios.defaults.withCredentials = true;
	axios.get(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/topics/${topicId}/details`)
	.then(response => {
		console.log(`Response: ${response}`);
		if(response.status === 200){
			console.log(`Got topic details in questionActions->getTopicNameAndNumberOfFollowersById(): ${response.data}`);
			dispatch({
				type: TOPICDETAILS,
				payload: response.data
			});
		}
	}).catch(error => {
		console.log(`Something wrong in questionActions->getTopicNameAndNumberOfFollowersById(): ${error}`);
	});

}

export const followATopic = (topicData) => dispatch => {

	axios.defaults.withCredentials = true;
		axios.post(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/topics/follow`, topicData)
		.then(response =>{
			console.log(`Response: ${response}`);
			if(response.status === 200){
				console.log(`follow topic successfully questionActions->followATopic(): ${response.data}`);
				getTopicsFollowedByUser(topicData.userId)
				// dispatch({
				// 	type: TOPICS,
				// 	payload: 
				// });
			}
		}).catch(error =>{
			console.log(`follow topic failed: questionActions->followATopic() - ${error}`)
		})
}

export const getTopicsFollowedByUser = (userId) => dispatch => {

	axios.defaults.withCredentials = true;
	axios.get(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/users/${userId}/topics`)
	.then(response => {
		console.log(`Response: ${response}`);
		if(response.status === 200){
			console.log(`Got topics followed by user in questionActions->getTopicsFollowedByUser(): ${response.data}`);
			dispatch({
				type: TOPICS,
				payload: response.data
			});

			//TODO: remove and add it it follow topic
			// dispatch({ type: TOPICS, payload: this.props.getTopicsFollowedByUser(userId)})
		}
	}).catch(error => {
		console.log(`Something wrong in questionActions->getTopicsFollowedByUser(): ${error}`);
	});


	// axios
	// 		.get("http://localhost:3001/users/" + u_id + "/topics")
	// 		.then(response => {
	// 			if (response.status === 200) {
	// 				console.log("------------->", response.data);
	// 				this.setState({
	// 					data: [...response.data]
	// 				});
	// 			}
	// 		});

}