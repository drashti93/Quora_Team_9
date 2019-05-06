import { FEED, BOOKMARK_FEED } from "../actions/types";


const initialState = {
	feed: [],
	bookmarkFeed: []
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
		default:
			return state;
	}
}
