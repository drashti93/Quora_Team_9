import { TOPICFEED } from "../actions/types";


const initialState = {
	topicfeed: []
}

export default function loginReducer(state = initialState, { type, payload }) {
	switch (type) {
		case TOPICFEED:
			return {
				...state,
				topicfeed: payload
			};
		default:
			return state;
	}
}
