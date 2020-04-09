import React, { useEffect } from "react";
import "./dashboard-style.css";
import Tab from "react-bootstrap/Tab";
import { Link } from "react-router-dom";
// Bootstrap
import Nav from "react-bootstrap/Nav";
// Material icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import EventRoundedIcon from "@material-ui/icons/EventRounded";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import Dashboard from "../../components/dashboard/Dashboard";
import Patients from "../../components/Patients/Patients";
import Appointment from "../../components/appointment/Appointment";
import Prescriptions from "../../components/prescriptions/Prescriptions";

const DashboardPage = () => {
	useEffect(() => {
		window.scrollTo({
			top: 100,
			behavior: "smooth",
		});
	}, []);
	return (
		<div className="dashboard-page">
			<div className="container-fluid">
				<div className="dashboard-content">
					<div className="dashboard-panels">
						<Tab.Container id="left-tabs-example" defaultActiveKey="dashboard">
							<div className="dashboard-content-block">
								<div className="dashboard-content-navigation">
									<div className="custom-tab-pills">
										<Nav variant="pills" className="flex-column ">
											<Nav.Item>
												<Nav.Link eventKey="dashboard">
													<DashboardIcon />
													Dashboard
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link eventKey="appointment">
													<EventRoundedIcon />
													Appointment
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link eventKey="patients">
													<PeopleAltOutlinedIcon />
													Patients
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link eventKey="prescriptions">
													<NoteAddOutlinedIcon />
													Prescriptions
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link eventKey="setting">
													<SettingsOutlinedIcon />
													Setting
												</Nav.Link>
											</Nav.Item>
										</Nav>

										<div className="tab-action">
											<Link to="#">
												<ExitToAppOutlinedIcon />
												Logout
											</Link>
										</div>
									</div>
								</div>
								<div className="dashboard-content-items">
									<div className="custom-tab-content">
										<Tab.Content>
											<Tab.Pane eventKey="dashboard">
												<Dashboard />
											</Tab.Pane>
											<Tab.Pane eventKey="appointment">
												<Appointment />
											</Tab.Pane>
											<Tab.Pane eventKey="patients">
												<Patients />
											</Tab.Pane>
											<Tab.Pane eventKey="prescriptions">
												<Prescriptions />
											</Tab.Pane>
											<Tab.Pane eventKey="setting">
												<p>
													setting dddzzLorem ipsum dolor sit amet consectetur
													adipisicing elit. Voluptate obcaecati minus, repellat,
													ducimus mollitia cupiditate impedit nam praesentium
													molestias quis iure eligendi eius aperiam qui iusto
													corporis id perspiciatis accusantium?
												</p>
											</Tab.Pane>
										</Tab.Content>
									</div>
								</div>
							</div>
						</Tab.Container>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
