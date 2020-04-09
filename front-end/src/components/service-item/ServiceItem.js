import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./service-item.style.css";
import Popup from "reactjs-popup";
import CustomButton from "../custom-button/CustomButton";
import FormAlert from "../utils/FormAlert";
import { connect } from "react-redux";
import { makeAppointment } from "../../redux/appointment/appointment.actions";
import Alert from "../../components/utils/Alert";
import { alertAction } from "../../redux/alert/alertAction";

const ServiceItem = ({
	service,
	getAppointmentDate,
	makeAppointment,
	alertAction,
}) => {
	const { title, form, to, spaces } = service;
	const { register, handleSubmit, errors } = useForm();
	const [appointmentData, setAppointmentData] = useState(null);
	const [modal, setModal] = useState({
		open: false,
	});
	useEffect(() => {
		function convert(str) {
			var date = new Date(str),
				mnth = ("0" + (date.getMonth() + 1)).slice(-2),
				day = ("0" + date.getDate()).slice(-2);
			return [date.getFullYear(), mnth, day].join("-");
		}
		if (getAppointmentDate) {
			const appointment = {
				...appointmentData,
				schedule: convert(getAppointmentDate && getAppointmentDate.toString()),
				service: service,
			};
			setAppointmentData(appointment);
		}
	}, [getAppointmentDate]);
	const openModal = () => {
		if (getAppointmentDate) {
			setModal({ open: true });
		} else {
			window.scrollTo({
				top: 100,
				behavior: "smooth",
			});
			alertAction("Please Select Your Appointment Date", "danger");
		}
	};
	const closeModal = () => {
		setModal({ open: false });
	};
	const onSubmithandler = (e) => {
		makeAppointment(appointmentData);
		setAppointmentData(null);
		setTimeout(() => {
			closeModal();
		}, 4000);
		// e.preventDefault();
	};

	const onChangeHandler = (e) => {
		setAppointmentData({
			...appointmentData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="service">
			<h4>{title}</h4>
			<h5>
				{form} - {to}
			</h5>
			<p>{spaces} Spaces available</p>
			<div>
				<div onClick={openModal}>
					<CustomButton>Book Appointment</CustomButton>
				</div>
				<Popup open={modal.open} closeOnDocumentClick onClose={closeModal}>
					<div className="appointment-form">
						<h4>{title}</h4>
						<form onSubmit={handleSubmit(onSubmithandler)}>
							<Alert />
							<input
								type="text"
								name="patientName"
								ref={register({ required: true })}
								placeholder="Patient Name"
								onChange={onChangeHandler}
							/>
							{errors.patientName && (
								<FormAlert>Patient Name is required</FormAlert>
							)}
							<input
								type="phone"
								name="phone"
								ref={register({ required: true })}
								placeholder="Phone Number"
								onChange={onChangeHandler}
							/>
							{errors.phone && (
								<FormAlert>Enter Your Valid Phone Number</FormAlert>
							)}
							<input
								type="email"
								name="email"
								ref={register({ required: true })}
								placeholder="Email"
								onChange={onChangeHandler}
							/>
							{errors.email && <FormAlert>Email is required</FormAlert>}
							<select
								className="select-gender"
								ref={register({ required: true })}
								name="gender"
								onChange={onChangeHandler}>
								<option value="male" selected>
									Male
								</option>
								<option value="female">Female</option>
								<option value="custom">Custom</option>
							</select>
							{errors.gender && (
								<FormAlert>Please Select your Gender</FormAlert>
							)}
							<input
								type="number"
								name="age"
								ref={register({ required: true })}
								placeholder="Age"
								onChange={onChangeHandler}
							/>
							{errors.age && <FormAlert>Age is required</FormAlert>}
							<input
								type="number"
								name="weight"
								ref={register({ required: true })}
								placeholder="Weight"
								onChange={onChangeHandler}
							/>
							{errors.weight && <FormAlert>Weight is required</FormAlert>}
							<input
								type="text"
								name="address"
								ref={register({ required: true })}
								placeholder="Enter your address"
								onChange={onChangeHandler}
							/>
							{errors.address && <FormAlert>address is required</FormAlert>}
							<div className="custom-btn-group">
								<CustomButton type="submit">Submit</CustomButton>
								<CustomButton onClick={closeModal} danger>
									Close
								</CustomButton>
							</div>
						</form>
					</div>
				</Popup>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => ({
	getAppointmentDate: state.appointment.appointmentDate,
});

export default connect(mapStateToProps, { makeAppointment, alertAction })(
	ServiceItem
);
