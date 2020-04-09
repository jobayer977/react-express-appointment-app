import React, { useState, useEffect } from "react";
import "./prescriptions.styles.css";
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
} from "../../redux/appointment/appointment.actions";

import PriscriptionView from "../priscription-view/PriscriptionView";
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

const Prescriptions = ({
	getAppointments,
	getAppointmentsByDate,
	appointments,
	updateAppointmentStatus,
	makePrescription,
	updateMedicine,
	loading,
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
	const arr = [];
	appointments.map((x) => {
		return x.prescription.status == true
			? arr.push({
					name: x.patientName,
					contact: x.phone,
					prescription: x.prescription,
					schedule: x.schedule,
					date: x.date,
			  })
			: "";
	});

	console.log(arr);

	return loading ? (
		<PulseLoaderSpinner loading={loading} />
	) : (
		<div className="custom-table-block custom-tbl-prescription">
			<div className="table-heading">
				<Alert />
				<SecondaryTitle primary>All Prescription</SecondaryTitle>
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
								<TableCell align="center">#Sr. No</TableCell>
								<TableCell align="center">Date</TableCell>
								<TableCell align="left">Name</TableCell>
								<TableCell align="left">Contact</TableCell>
								<TableCell align="center">Prescription</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{arr &&
								arr.slice(0, 6).map((prescription, i) => (
									<TableRow key={i}>
										<TableCell
											className="tbl-sr-no"
											component="th"
											align="center"
											scope="row">
											{i}
										</TableCell>
										<TableCell align="center">
											{prescription.schedule}
										</TableCell>
										<TableCell align="left">{prescription.name}</TableCell>
										<TableCell align="left">{prescription.contact}</TableCell>
										<TableCell align="center">
											<PriscriptionView data={prescription} />
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
	loading: state.appointment.loading,
});

export default connect(mapStateToProps, {
	getAppointments,
	getAppointmentsByDate,
	updateAppointmentStatus,
})(Prescriptions);
