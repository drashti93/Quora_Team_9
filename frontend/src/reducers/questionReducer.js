import { FEED } from "../actions/types";


const initialState = {
	feed: {
		followers: [],
		topicsArray: [],
		answers: [{
			upvotes: [],
			downvotes: [],
			bookmarks: [],
			comments: [],
			images: []
		}]
	}
}

export default function loginReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FEED:
			return {
				...state,
				feed: payload
			};
		default:
			return state;
	}
}
