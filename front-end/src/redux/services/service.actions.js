import { GET_SERVICE, GET_SERVICE_ERROR } from "./service.types";
import axios from "axios";

// GET SERVICES DATA
export const getServices = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/appointment/services");
		dispatch({
			type: GET_SERVICE,
			payload: res.data.getAllServices,
		});
	} catch (e) {
		if (e.response) {
			dispatch({
				type: GET_SERVICE_ERROR,
				payload: {
					msg: e.response.data.msg,
					status: e.response.status,
				},
			});
		}
	}
};
