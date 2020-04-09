const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema({
	appointmentID: {
		type: String,
	},
	name: {
		type: String,
	},
	sex: {
		type: String,
	},
	age: {
		type: String,
	},
	medicine: [
		{
			prescriptionId: {
				type: String,
			},
			mediceanName: {
				type: String,
			},
			time: {
				type: String,
			},
			days: {
				type: String,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Prescription = mongoose.model(
	"prescription",
	PrescriptionSchema
);
