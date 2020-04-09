import React from "react";
import "./secondary-title.style.css";

const SecondaryTitle = ({ children, small, primary }) => {
	return (
		<div className="secondary-title">
			<h4
				className={`${small ? "st-small" : " "} ${
					primary ? "st-color-primary" : ""
				}`}>
				{children}
			</h4>
		</div>
	);
};

export default SecondaryTitle;
