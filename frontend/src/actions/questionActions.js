import axios from "axios";
import { FEED, BOOKMARK_FEED } from './types';

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
			console.log(`Got question-answers for feed in questionActions->getBookmarkedAnswersWithCorrespondingQuestionsForBookmark(): ${response.data}`);
			dispatch({
				type: BOOKMARK_FEED,
				payload: response.data
			});
		}
	}).catch(error => {
		console.log(`Something wrong in questionActions->getBookmarkedAnswersWithCorrespondingQuestionsForBookmark(): ${error}`);
	});

}