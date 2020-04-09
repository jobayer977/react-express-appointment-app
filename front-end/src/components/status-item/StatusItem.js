import React from "react";
import "./status-item.styles.css";

const StatusItem = ({ children, status }) => {
	return (
		<div
			className={`${status === "pending" ? "st-pending" : ""} 
            ${status === "approved" ? "st-approved" : ""} 
            ${status === "cancelled" ? "st-cancelled" : ""} status-box`}>
			{children}
		</div>
	);
};

export default StatusItem;
