import { GET_SERVICE, GET_SERVICE_ERROR } from "./service.types";

const initState = {
	allServices: [],
	error: {},
	loading: true,
};

const serviceReducer = (state = initState, action) => {
	switch (action.type) {
		case GET_SERVICE:
			return {
				...state,
				allServices: action.payload,
				loading: false,
			};
		case GET_SERVICE_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default serviceReducer;
