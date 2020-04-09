import React, { useEffect } from "react";
import "./dashboard.styles.css";
import SecondaryTitle from "../secondary-title/SecondaryTitle";
import Statistic from "../statistic/Statistic";
import RecentAppointment from "../recent-appointment/RecentAppointment";
import { connect } from "react-redux";
import { getStatusCount } from "../../redux/appointment/appointment.actions";
import { PulseLoaderSpinner } from "../utils/Spinner";

const Dashboard = ({ getStatusCount, count, appointments }) => {
	useEffect(() => {
		getStatusCount();
	}, [getStatusCount]);

	return count.loading ? (
		<PulseLoaderSpinner loading={count.loading} />
	) : (
		<div className="dashboard-area">
			<div className="dashboard-heading-block">
				<SecondaryTitle>Dashboard</SecondaryTitle>
				<div className="statistic-block">
					<Statistic
						number={count.status.pending}
						title="Pending Appointments"
						danger
					/>
					<Statistic
						number={count.status.todays}
						title="Today's Appointments"
						primary
					/>
					<Statistic
						number={count.status.total}
						title="Total Appointments"
						success
					/>
					<Statistic
						number={count.status.Patient}
						title="Total Patients"
						warning
					/>
				</div>
			</div>
			<div className="dashboard-content-block">
				<RecentAppointment />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	appointments: state.appointment.appointments,
	count: state.appointment,
});

export default connect(mapStateToProps, { getStatusCount })(Dashboard);
