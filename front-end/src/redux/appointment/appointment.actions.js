import {
	PICK_APPOINTMENT_DATE,
	APPOINTMENT_ERROR,
	MAKE_APPOINTMENT,
	GET_APPOINTMENTS,
	UPDATE_APPOINTMENT_STATUS,
	GET_STATUS_COUNT,
	CREATE_PRESCRIPTION,
	UPDATE_MEDICINE,
} from "./appointment.types";
import { alertAction } from "../alert/alertAction";
import axios from "axios";

//PICK APPOINTMENT SECLUDE
export const getAppointmentDate = (data) => async (dispatch) => {
	try {
		dispatch({
			type: PICK_APPOINTMENT_DATE,
			payload: data,
		});
	} catch (error) {
		console.log(error.message);
	}
};

// PLACE APPOINTMENT
export const makeAppointment = (textData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const res = await axios.post("/api/appointment/create", textData, config);
		dispatch({
			type: MAKE_APPOINTMENT,
			payload: res.data,
		});
		dispatch(alertAction("Appointment Created Successfully", "success"));
	} catch (error) {
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};

// GET ALL APPOINTMENTS
export const getAppointments = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/appointment");
		dispatch({
			type: GET_APPOINTMENTS,
			payload: res.data.appointments,
		});
	} catch (error) {
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};
// GET ALL APPOINTMENTS BY DATE
export const getAppointmentsByDate = (date) => async (dispatch) => {
	function convert(str) {
		var date = new Date(str),
			mnth = ("0" + (date.getMonth() + 1)).slice(-2),
			day = ("0" + date.getDate()).slice(-2);
		return [date.getFullYear(), mnth, day].join("-");
	}
	try {
		const res = await axios.get(`/api/appointment/${convert(date)}`);
		dispatch({
			type: GET_APPOINTMENTS,
			payload: res.data,
		});
	} catch (error) {
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};

// UPDATE APPOINTMENT STATUS
export const updateAppointmentStatus = (appointment, textData) => async (
	dispatch
) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		await axios.post(
			`/api/appointment/action/${appointment._id}`,
			{ status: textData },
			config
		);
		dispatch({
			type: UPDATE_APPOINTMENT_STATUS,
			payload: {
				data: appointment,
				value: textData,
			},
		});
		dispatch(
			alertAction(`Appointment Status Updated into ${textData}`, "success")
		);
	} catch (error) {
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};

// GET ALL GET STATUS COUNT
export const getStatusCount = (date) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/appointment/statuscount`);
		dispatch({
			type: GET_STATUS_COUNT,
			payload: res.data,
		});
	} catch (error) {
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};

// PUT VISITED APPOINTMENT
export const updateVisitedAppointment = (data) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		await axios.post(`/api/appointment/visitstatus/${data._id}`, config);
		dispatch(alertAction("Appointment Updated Successfully", "success"));
	} catch (error) {
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};

export const makePrescription = (appointmentID) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.post(`/api/prescription/${appointmentID}`, config);
		dispatch({
			type: CREATE_PRESCRIPTION,
			payload: res.data,
		});
		dispatch(alertAction(`Prescription Created Successfully`, "success"));
	} catch (error) {
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};
export const updateMedicine = (appointmentID, formData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.put(
			`/api/prescription/medicean/${appointmentID}`,
			formData,
			config
		);
		dispatch({
			type: UPDATE_MEDICINE,
			payload: res.data,
		});
		dispatch(alertAction(`Medicean Added`, "success"));
	} catch (error) {
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};
