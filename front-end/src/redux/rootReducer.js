import { combineReducers } from "redux";
import alertReducer from "./alert/alertReducer";
import serviceReducer from "./services/service.reducer";
import appointmentReducer from "./appointment/appointment.reducer";

const rootReducer = combineReducers({
	alert: alertReducer,
	services: serviceReducer,
	appointment: appointmentReducer,
});
export default rootReducer;
