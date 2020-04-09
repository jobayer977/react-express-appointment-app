const express = require("express");
const router = express.Router();
const Service = require("../../models/appointments/ServiceSchema");
const Appointment = require("../../models/appointments/AppointmentSchema");

// @ROUTER 		POST /api/appointment/services
// @des 		Create service
// @Access 		PUBLIC
router.post("/services", async (req, res) => {
	try {
		// CREATE STATUS OBJ
		const newService = new Service({
			title: req.body.title,
			form: req.body.form,
			to: req.body.to,
			spaces: req.body.spaces,
		});
		// SAVE TO DB
		const service = await newService.save();
		// RESPONSE
		res.json(service);
	} catch (e) {
		return res.status(404).json({ msg: "SERVER ERROR" });
	}
});

//@route 	GET api/appointment/services
//@desc 	SEE ALL SERVICES
//@access 	PUBLIC
router.get("/services", async (req, res) => {
	try {
		const getAllServices = await Service.find().sort({ date: -1 });
		if (!getAllServices) {
			return res.status(400).json({ msg: "No Status" });
		}
		res.json({ getAllServices });
	} catch (e) {
		if (!e.kind == ObjectId) {
			return res.status(404).json({ msg: "Post not found" });
		}
		res.status(500).send("SERVER ERROR...");
	}
});

// @ROUTER 		POST /api/place-appointment
// @des 		Customers place an appointment
// @Access 		PUBLIC
router.post("/create", async (req, res) => {
	const {
		serialNo,
		schedule,
		patientName,
		phone,
		email,
		gender,
		service,
		age,
		weight,
		address,
	} = req.body;
	try {
		// CREATE STATUS OBJ
		const newAppointment = new Appointment({
			serialNo,
			schedule,
			service,
			patientName,
			phone,
			email,
			gender,
			age,
			weight,
			status: "pending",
			visited: false,
			prescription: {
				status: false,
			},
			address,
		});
		// SAVE TO DB
		const appointment = await newAppointment.save();
		// RESPONSE
		res.json(appointment);
	} catch (e) {
		return res.status(404).json({ msg: "SERVER ERROR" + e.message });
	}
});

//@route 	GET api/appointment
//@desc 	SEE SERVICES
//@access 	PUBLIC
router.get("/", async (req, res) => {
	try {
		const appointments = await Appointment.find().sort({ date: -1 });
		if (!appointments) {
			return res.status(400).json({ msg: "No Appointments" });
		}
		res.json({ appointments });
	} catch (e) {
		if (!e.kind == ObjectId) {
			return res.status(404).json({ msg: "Appointments not found" });
		}
		res.status(500).send("SERVER ERROR...");
	}
});

//@route 	GET api/appointment/pendinglist
//@desc 	See Appointments pending list
//@access 	PUBLIC
router.get("/statuscount", async (req, res) => {
	try {
		const pendingAppointments = await Appointment.find({
			status: "pending",
		});
		const todaysAppointments = await Appointment.find({
			data: Date.now,
		});

		const totalAppointments = await Appointment.find();

		const statusCount = {
			pending: pendingAppointments.length,
			todays: todaysAppointments.length,
			total: totalAppointments.length,
			Patient: totalAppointments.length,
		};

		res.json(statusCount);
	} catch (e) {
		if (!error.kind == ObjectId) {
			return res.status(404).json({ msg: "Appointments not found" });
		}
		res.status(500).send("SERVER ERROR...");
	}
});

//@route 	GET api/appointment/:date
//@desc 	See Appointments by date
//@access 	PUBLIC
router.get("/:date", async (req, res) => {
	try {
		const appointments = await Appointment.find({
			schedule: req.params.date,
		});
		if (!appointments) {
			return res.status(400).json({ msg: "No Appointments exists" });
		}
		res.json(appointments);
	} catch (e) {
		if (!error.kind == ObjectId) {
			return res.status(404).json({ msg: "Appointments not found" });
		}
		res.status(500).send("SERVER ERROR...");
	}
});

//@route 	GET api/appointment/:id
//@desc 	See Appointments by date
//@access 	PUBLIC
router.post("/action/:id", async (req, res) => {
	try {
		let getAppointment = await Appointment.findById(req.params.id);
		await Appointment.updateOne(
			{ _id: req.params.id },
			{ $set: { status: req.body.status } }
		);
		const appointment = await getAppointment.save();
		res.json(appointment);
	} catch (e) {
		console.error(e);
		res.status(500).send("SERVER ERROR!");
	}
});
//@route 	GET api/appointment/visitstatus/id
//@desc 	See Appointments by date
//@access 	PUBLIC
router.post("/visitstatus/:id", async (req, res) => {
	try {
		let getAppointment = await Appointment.findById(req.params.id);

		if (getAppointment) {
			if (getAppointment.visited == false) {
				await Appointment.updateOne(
					{ _id: req.params.id },
					{ $set: { visited: true } }
				);
			} else {
				await Appointment.updateOne(
					{ _id: req.params.id },
					{ $set: { visited: false } }
				);
			}
		}
		const appointment = await getAppointment.save();
		res.json(appointment);
	} catch (e) {
		console.error(e);
		res.status(500).send("SERVER ERROR!");
	}
});

module.exports = router;
