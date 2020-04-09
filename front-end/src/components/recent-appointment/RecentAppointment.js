import React, { useState, useEffect } from "react";
import "./react-appointment.style.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SecondaryTitle from "../secondary-title/SecondaryTitle";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import Alert from "../utils/Alert";

import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
	getAppointments,
	getAppointmentsByDate,
	updateAppointmentStatus,
	makePrescription,
	updateMedicine,
	getStatusCount,
} from "../../redux/appointment/appointment.actions";

import StatusItem from "../status-item/StatusItem";
import PrescriptionForm from "../create-prescription/PrescriptionForm";

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

const RecentAppointment = ({
	getAppointments,
	getAppointmentsByDate,
	appointments,
	updateAppointmentStatus,
	makePrescription,
	updateMedicine,
	getStatusCount,
}) => {
	const [selectedDate, handleDateChange] = useState(new Date());

	const classes = useStyles();
	useEffect(() => {
		getAppointments();
	}, [getAppointments]);

	const pickDateHandler = (date) => {
		handleDateChange(date);
		getAppointmentsByDate(date);
	};

	const actionsChanger = (appointment, e) => {
		getStatusCount();
		updateAppointmentStatus(appointment, e.target.value);
	};

	return (
		<div className="custom-table-block">
			<div className="table-heading">
				<Alert />
				<SecondaryTitle primary>Recent Appointment</SecondaryTitle>
				<div className="st-date-picker">
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							placeholder="2018/10/10"
							value={selectedDate}
							onChange={(date) => pickDateHandler(date)}
							format="yyyy/MM/dd"
						/>
					</MuiPickersUtilsProvider>
				</div>
			</div>
			<div className="table-content">
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell className="tbl-sr-no" align="center">
									#Sr. No
								</TableCell>
								<TableCell className="tbl-date" align="center">
									Date
								</TableCell>
								<TableCell className="tbl-time" align="center">
									Time
								</TableCell>
								<TableCell className="tbl-name" align="center">
									Name
								</TableCell>
								<TableCell className="tbl-number" align="center">
									Contact
								</TableCell>
								<TableCell className="tbl-prescription" align="center">
									Prescription
								</TableCell>
								<TableCell className="tbl-status" align="center">
									Action
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{appointments &&
								appointments.slice(0, 6).map((appointment, i) => (
									<TableRow key={i}>
										<TableCell
											className="tbl-sr-no"
											component="th"
											align="center"
											scope="row">
											{i}
										</TableCell>
										<TableCell className="tbl-date" align="center">
											{appointment.schedule}
										</TableCell>
										<TableCell className="tbl-time" align="center">
											{appointment.service && appointment.service.form}
										</TableCell>
										<TableCell
											className="tbl-name"
											align="left"
											padding="checkbox">
											{appointment.patientName}
										</TableCell>
										<TableCell className="tbl-number" align="center">
											{appointment.phone}
										</TableCell>
										<TableCell className="tbl-prescription" align="center">
											<PrescriptionForm data={appointment} />
										</TableCell>
										<TableCell className="tbl-status" align="center">
											<div className="select-action-options">
												<StatusItem status={appointment.status}>
													{appointment.status}
												</StatusItem>
												<select
													className="select-action"
													onChange={(e) => actionsChanger(appointment, e)}
													defaultValue={"Edit"}>
													<option value="Edit" className="icon" disabled>
														Edit
													</option>
													<option value="approved">Approved</option>
													<option value="pending">Pending</option>
													<option value="cancelled">Cancelled</option>
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
	);
};

const mapStateToProps = (state) => ({
	appointments: state.appointment.appointments,
});
export default connect(mapStateToProps, {
	getAppointments,
	updateMedicine,
	getAppointmentsByDate,
	updateAppointmentStatus,
	makePrescription,
	getStatusCount,
})(RecentAppointment);
