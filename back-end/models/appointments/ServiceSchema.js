const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	form: {
		type: String,
	},
	to: {
		type: String,
	},
	spaces: {
		type: Number,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Service = mongoose.model("services", ServiceSchema);
