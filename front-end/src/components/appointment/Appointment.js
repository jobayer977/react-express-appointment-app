import React, { useEffect, useState } from "react";
import "./appointment.style.css";
import Calendar from "react-calendar";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Moment from "react-moment";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SecondaryTitle from "../secondary-title/SecondaryTitle";
import {
	getAppointmentsByDate,
	updateVisitedAppointment,
	getAppointments,
} from "../../redux/appointment/appointment.actions";
import { connect } from "react-redux";
import { PulseLoaderSpinner } from "../utils/Spinner";
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	table: {
		minWidth: 650,
	},
}));

const Appointment = ({
	getAppointmentsByDate,
	updateVisitedAppointment,
	appointments,
	getAppointments,
	loading,
}) => {
	const [secudule, setSecudule] = useState(null);
	const classes = useStyles();
	const onChangeHandler = (date) => {
		setSecudule(date);
		getAppointmentsByDate(date);
	};
	useEffect(() => {
		if (secudule) {
			getAppointmentsByDate(secudule);
		}
	}, [getAppointmentsByDate]);

	const actionsChanger = (appointment) => {
		updateVisitedAppointment(appointment);
		getAppointments();
	};
	console.log(secudule);

	return loading ? (
		<PulseLoaderSpinner loading={loading} />
	) : (
		<div className="appointment-area">
			<SecondaryTitle>Appointments</SecondaryTitle>
			<div className="appointment-block">
				<div className="pick-date-block">
					<Calendar onClickDay={onChangeHandler} />
				</div>
				<div className="appointments-block">
					<div className="content-heading">
						<SecondaryTitle primary>Appointments</SecondaryTitle>
						<div className="till-date">
							<span>
								<Moment format="D MMM YYYY" withTitle>
									{secudule ? secudule : new Date().toString()}
								</Moment>
							</span>
						</div>
					</div>
					<div className="appointment-list">
						<div className="table-content">
							<TableContainer component={Paper}>
								<Table
									className={`${classes.table} custom-table-fullwidth`}
									aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell align="left">Name</TableCell>
											<TableCell align="center">Schedule</TableCell>
											<TableCell align="right">Action</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{appointments &&
											appointments.slice(0, 6).map((appointment, i) => (
												<TableRow key={i}>
													<TableCell align="left">
														{appointment.patientName}
													</TableCell>
													<TableCell align="center">
														{appointment.schedule}
													</TableCell>
													<TableCell align="right">
														<div
															className="select-action-options customize"
															onChange={(e) => actionsChanger(appointment)}>
															<select
																className="select-action"
																defaultValue={
																	appointment.visited ? "visited" : "notvisited"
																}>
																<option value="visited">Visited</option>
																<option value="notvisited">NoVisited</option>
															</select>
														</div>
													</TableCell>
												</TableRow>
											))}
									</TableBody>
								</Table>
							</TableContainer>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => ({
	appointments: state.appointment.appointments,
	loading: state.appointment.loading,
});
export default connect(mapStateToProps, {
	updateVisitedAppointment,
	getAppointmentsByDate,
	getAppointments,
})(Appointment);
