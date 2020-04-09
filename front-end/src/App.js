import React, { Fragment } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import Headers from "./components/headers/Headers";
import AppointmentPage from "./pages/appointment-page/AppointmentPage";
import DashboardPage from "./pages/dashboard-page/DashboardPage";
import NotFound from "./pages/not-found/NotFound";

function App() {
	return (
		<Fragment>
			<Headers />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/appointment" component={AppointmentPage} />
				<Route path="/dashboard" component={DashboardPage} />
				<Route path="*" component={NotFound} />
			</Switch>
		</Fragment>
	);
}

export default App;
