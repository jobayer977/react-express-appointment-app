import React, { useEffect } from "react";
import Calendar from "react-calendar";
import "./appointment.styles.css";
import "react-calendar/dist/Calendar.css";
import HeroContent from "../../components/hero-content/HeroContent";
import Service from "../../components/service/Service";
import { connect } from "react-redux";
import { getAppointmentDate } from "../../redux/appointment/appointment.actions";
import Alert from "../../components/utils/Alert";

const AppointmentPage = ({ getAppointmentDate }) => {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);
	const onChangeHandler = (date) => {
		getAppointmentDate(date);
	};
	return (
		<div className="appointment-page">
			<HeroContent>
				<h1>Appointment</h1>
				<Alert />
				<Calendar onClickDay={onChangeHandler} />
			</HeroContent>
			<Service />
		</div>
	);
};

export default connect(null, { getAppointmentDate })(AppointmentPage);
