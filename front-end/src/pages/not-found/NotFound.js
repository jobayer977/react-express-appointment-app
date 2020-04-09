import React from "react";
import { Link } from "react-router-dom";
import "./notfound-styles.css";
import herobg from "../../assets/hero-bg.png";

const NotFound = () => {
	return (
		<div className="not-found" style={{ backgroundImage: `url(${herobg})` }}>
			<h1>404</h1>
			<p>Under maintains</p>

			<Link to="/">Back to Home</Link>
		</div>
	);
};

export default NotFound;
