import React, { useEffect } from "react";
import "./patient-table.style.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";
import SecondaryTitle from "../secondary-title/SecondaryTitle";
import { getAppointments } from "../../redux/appointment/appointment.actions";
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

const PatientTable = ({ getAppointments, appointments, loading }) => {
	const classes = useStyles();
	useEffect(() => {
		getAppointments();
	}, [getAppointments]);
	return loading ? (
		<PulseLoaderSpinner loading={loading} />
	) : (
		<div className="patient-table-block">
			<div className="content-heading">
				<SecondaryTitle primary>All Patients</SecondaryTitle>
			</div>
			<div className="table-content-block">
				<Paper>
					<TableContainer component={Paper}>
						<Table
							className={classes.table}
							stickyHeader
							aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell className="tbl-sr-no" align="center">
										#Sr. No
									</TableCell>
									<TableCell className="tbl-ptName" align="left">
										Name
									</TableCell>
									<TableCell className="tbl-gender" align="center">
										Gender
									</TableCell>
									<TableCell className="tbl-age" align="center">
										Age
									</TableCell>
									<TableCell className="tbl-weight" align="center">
										Weight
									</TableCell>
									<TableCell className="tbl-contactNumber" align="center">
										Contact
									</TableCell>
									<TableCell className="tbl-address" align="center">
										Address
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
											<TableCell className="tbl-ptName" align="left">
												{appointment.patientName}
											</TableCell>
											<TableCell className="tbl-gender" align="center">
												{appointment.gender}
											</TableCell>
											<TableCell className="tbl-age" align="center">
												{appointment.age}
											</TableCell>
											<TableCell className="tbl-weight" align="center">
												{appointment.weight} Kg
											</TableCell>
											<TableCell className="tbl-contactNumber" align="center">
												{appointment.phone}
											</TableCell>
											<TableCell className="tbl-address" align="center">
												{appointment.address}
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => ({
	appointments: state.appointment.appointments,
	loading: state.appointment.loading,
});
export default connect(mapStateToProps, { getAppointments })(PatientTable);
