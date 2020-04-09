const express = require("express");
const router = express.Router();
const Prescription = require("../../models/prescription/PrescriptionSchema");
const Appointment = require("../../models/appointments/AppointmentSchema");

router.get("/", async (req, res) => {
	try {
		const prescriptions = await Prescription.find().sort({
			date: -1,
		});
		if (!prescriptions) {
			return res.status(400).json({ msg: "No prescriptions" });
		}
		res.json(prescriptions);
	} catch (e) {
		if (!e.kind == ObjectId) {
			return res.status(404).json({ msg: "Appointments not found" });
		}
		res.status(500).send("SERVER ERROR...");
	}
});
// /api/prescription
router.post("/:appointmentId", async (req, res) => {
	try {
		const findPatient = await Appointment.findById(req.params.appointmentId);

		const makePrescription = {
			appointmentID: req.params.appointmentId,
			schedule: findPatient.schedule,
			contact: findPatient.phone,
			name: findPatient.patientName,
			sex: findPatient.gender,
			age: findPatient.age,
		};
		findPatient.prescription = makePrescription;
		findPatient.prescription.status = true;
		// SAVE TO DB
		await findPatient.save();
		// RESPONSE
		res.json(findPatient);
	} catch (e) {
		return res.status(404).json({ msg: "SERVER ERROR" + e.message });
	}
});

router.put("/medicean/:appointmentID", async (req, res) => {
	// CREATE medicean DATA IN OBJECT
	const { mediceanName, time, days } = req.body;
	const newMedicean = {
		prescriptionId: req.params.appointmentID,
		mediceanName,
		time,
		days,
	};
	try {
		const findPatient = await Appointment.findById(req.params.appointmentID);

		findPatient.prescription.medicine.unshift(newMedicean);

		// SAVE TO DB
		await findPatient.save();
		// RESPONSE
		res.json(newMedicean);
	} catch (e) {
		console.error(e);
		res.status(500).send("SERVER ERROR!");
	}
});

module.exports = router;
