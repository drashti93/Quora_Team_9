import { FEED, BOOKMARK_FEED, TOPIC_FEED, QUESTIONS_FEED } from "../actions/types";


const initialState = {
	feed: [],
	bookmarkFeed: [],
	topicFeed: [],
	questionsFeed: []
}

export default function loginReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FEED:
			return {
				...state,
				feed: payload
			};
		case BOOKMARK_FEED:
			return {
				...state,
				bookmarkFeed: payload
			};
		case TOPIC_FEED:
			return {
				...state,
				topicFeed: payload
			};
		case QUESTIONS_FEED:
			return {
				...state,
				questionsFeed: payload
			};
		default:
			return state;
	}
}
