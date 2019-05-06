import axios from "axios";
import { TOPICFEED } from './types';

export const getQuestionsAnswersForFeedtopic = () => dispatch => {

	axios.defaults.withCredentials = true;
	axios.get(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/topics/5ccc9d24631fe28128847f84/questions/following`)
	.then(response => {
		console.log(`Response: ${response}`);
		if(response.status === 200){
			console.log(`Got question-answers for feed in questionActions->getQuestionsAnswersForFeed() topic wise: ${response.data}`);
			dispatch({
				type: TOPICFEED,
				payload: response.data
			});
		}
	}).catch(error => {
		console.log(`Something wrong in questionActions->getQuestionsAnswersForFeed(): ${error}`);
	});
}