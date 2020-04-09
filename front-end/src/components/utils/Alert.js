import React, { Fragment } from "react";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
	return (
		<Fragment>
			{alerts !== null &&
				alerts.length > 0 &&
				alerts.map((alert) => (
					<div key={alert.id} className={`alert alert-${alert.alertType}`}>
						{alert.msg}
					</div>
				))}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
