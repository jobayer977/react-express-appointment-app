import React from "react";
import "./custombutton.style.css";

const CustomButton = ({ small, danger, children, ...otherprops }) => {
	return (
		<button
			className={`${danger ? "danger" : ""} ${
				small ? "cts-small" : ""
			} custom-btn`}
			{...otherprops}>
			{children}
		</button>
	);
};

export default CustomButton;
