const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
	serialNo: {
		type: Number,
	},
	schedule: {
		type: String,
	},
	service: {
		type: Object,
	},
	prescription: {
		schedule: {
			type: String,
		},
		status: {
			type: Boolean,
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
		contact: {
			type: String,
		},
		medicine: [
			{
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
	},
	patientName: {
		type: String,
	},
	phone: {
		type: String,
	},
	email: {
		type: String,
	},
	gender: {
		type: String,
	},
	age: {
		type: String,
	},
	weight: {
		type: String,
	},
	address: {
		type: String,
	},
	status: {
		type: String,
	},
	visited: {
		type: Boolean,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Appointment = mongoose.model(
	"Appointments",
	AppointmentSchema
);
