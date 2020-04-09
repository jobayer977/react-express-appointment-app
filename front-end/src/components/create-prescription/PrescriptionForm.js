import React, { useState } from "react";
import Popup from "reactjs-popup";
import "./prescriptionform.style.css";
import CustomButton from "../custom-button/CustomButton";
import {
	makePrescription,
	updateMedicine,
	getAppointments,
} from "../../redux/appointment/appointment.actions";
import { connect } from "react-redux";
import Alert from "../utils/Alert";
import { alertAction } from "../../redux/alert/alertAction";

const PrescriptionForm = ({
	makePrescription,
	data,
	updateMedicine,
	getAppointments,
	alertAction,
}) => {
	const { prescription, patientName, age, gender } = data;
	const [formData, setFormData] = useState(null);
	const [modal, setModal] = useState({
		open: false,
	});
	const openModal = () => {
		setModal({ open: true });
	};
	const closeModal = () => {
		setModal({ open: false });
	};

	const onChangeHandler = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmitHandler = (e) => {
		if (formData) {
			if (!formData.time) {
				alertAction("Please Select Time Field", "danger");
			} else {
				updateMedicine(data._id, formData);
				makePrescription(data._id);
				setFormData(null);
				setTimeout(() => {
					closeModal();
				}, 4000);
			}
		}
		e.preventDefault();
	};

	return (
		<div className="prescription-form">
			<div onClick={openModal}>
				<CustomButton small>Make</CustomButton>
			</div>
			<Popup open={modal.open} closeOnDocumentClick onClose={closeModal}>
				<div className="prescription-form-content">
					<div className="info">
						<h4>{patientName}</h4>
						<span>Sex : {gender}</span>
						<span>Age : {age}</span>
					</div>
					<div className="medicine-list">
						<Alert />
						<ul>
							{prescription.medicine.map((x, i) => (
								<li key={i}>
									<span>{x.mediceanName}</span>
									<span>{x.time}</span>
									<span>{x.days}</span>
								</li>
							))}
						</ul>
					</div>
					<form onSubmit={onSubmitHandler}>
						<div className="pf-item">
							<input
								type="text"
								name="mediceanName"
								placeholder="Medicine Name"
								onChange={onChangeHandler}
								required
							/>
							<select name="time" id="" onChange={onChangeHandler} required>
								<option value="time" disabled selected>
									Time
								</option>
								<option value="1+0+0">1+0+1</option>
								<option value="1+0+1">1+0+1</option>
								<option value="0+0+1">0+0+1</option>
								<option value="0+0+1">0+0+1</option>
								<option value="1+1+1">1+1+1</option>
							</select>
							<input
								type="number"
								placeholder="Days"
								name="days"
								onChange={onChangeHandler}
								required
							/>
						</div>
						<div className="custom-btn-group">
							<CustomButton type="submit">Add Medicine</CustomButton>
							<CustomButton onClick={closeModal} danger>
								Close
							</CustomButton>
						</div>
					</form>
				</div>
			</Popup>
		</div>
	);
};

export default connect(null, {
	makePrescription,
	updateMedicine,
	getAppointments,
	alertAction,
})(PrescriptionForm);
