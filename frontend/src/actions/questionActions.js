import axios from "axios";
import { FEED, BOOKMARK_FEED, TOPIC_FEED, QUESTIONS_FEED, TOPICDETAILS } from './types';

export const getQuestionsAnswersForFeed = () => dispatch => {

	axios.defaults.withCredentials = true;
	axios.get(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/users/5cc3f69dd23457601476d016/feed`)
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

export const getBookmarkedAnswersWithCorrespondingQuestionsForBookmark = () => dispatch => {

	axios.defaults.withCredentials = true;
	axios.get(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/users/5cc3f69dd23457601476d016/bookmarks`)
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