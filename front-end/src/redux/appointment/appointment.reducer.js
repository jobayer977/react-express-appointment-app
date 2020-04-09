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

const initState = {
	appointmentDate: null,
	appointments: [],
	loading: true,
	error: [],
	status: {},
};

const appointmentReducer = (state = initState, action) => {
	switch (action.type) {
		case PICK_APPOINTMENT_DATE:
			return {
				...state,
				appointmentDate: action.payload,
			};
		case GET_STATUS_COUNT:
			return {
				...state,
				loading: false,
				status: action.payload,
			};
		case MAKE_APPOINTMENT:
			return {
				...state,
				appointments: [...state.appointments, action.payload],
				loading: false,
				status: { ...state.status, total: state.total + 1 },
			};
		case UPDATE_APPOINTMENT_STATUS:
			return {
				...state,
				appointments: state.appointments.map((x) =>
					x._id === action.payload.data._id
						? { ...x, status: action.payload.value }
						: x
				),
				loading: false,
			};
		case GET_APPOINTMENTS:
			return {
				...state,
				appointments: action.payload,
				loading: false,
			};
		case CREATE_PRESCRIPTION:
			return {
				...state,
				appointments: state.appointments.map((x) =>
					x._id === action.payload._id
						? { ...x, prescription: { ...x.prescription, status: true } }
						: x
				),
				loading: false,
			};
		case UPDATE_MEDICINE: {
			return {
				...state,
				appointments: state.appointments.map((x) =>
					x._id === action.payload.prescriptionId
						? {
								...x,
								prescription: {
									...x.prescription,
									medicine: [...x.prescription.medicine, action.payload],
								},
						  }
						: x
				),
			};
		}
		case APPOINTMENT_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};

		default:
			return state;
	}
};

export default appointmentReducer;
