import React from "react";
import SecondaryTitle from "../secondary-title/SecondaryTitle";
import PatientTable from "../patient-table/PatientTable";

const Patients = () => {
	return (
		<div className="patient-area">
			<SecondaryTitle>Patients</SecondaryTitle>
			<PatientTable />
		</div>
	);
};

export default Patients;
