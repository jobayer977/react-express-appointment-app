import React, { useEffect } from "react";
import "./service.style.css";
import { connect } from "react-redux";
import { getServices } from "../../redux/services/service.actions";
import ServiceItem from "../service-item/ServiceItem";
import { PulseLoaderSpinner } from "../utils/Spinner";

const Service = ({ getServices, service }) => {
	useEffect(() => {
		getServices();
	}, []);
	return service.loading ? (
		<PulseLoaderSpinner loading={service.loading} />
	) : (
		<div className="service-section">
			<div className="container">
				<h1>Available Appointments on Feb 08 20120 </h1>
				<div className="services">
					<div className="row">
						{service.allServices.map((x, i) => (
							<div className="col-md-4" key={i}>
								<ServiceItem service={x} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => ({
	service: state.services,
});
export default connect(mapStateToProps, { getServices })(Service);
