const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
useNewUrlParser: true;

//MIDDLEWARE
app.use(express.json({ extended: false }));
app.use(cors());

// ROUTERS
app.use("/api/appointment", require("./routers/api/appointments"));
app.use("/api/prescription", require("./routers/api/prescription"));
//DB CONNECTION
mongoose.connect(
	process.env.MONGODB_URI,
	{
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	},
	() => {
		console.log("Database connected successfully");
	}
);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("../front-end/build"));
}

app.listen(process.env.PORT || 4000, function () {
	console.log("Express server listening on port 4000");
});
