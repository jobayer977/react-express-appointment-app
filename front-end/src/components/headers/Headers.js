import React from "react";
import "./headers-style.css";
import logo from "../../assets/logo-1x.png";
import { Link } from "react-router-dom";

const Headers = () => {
	return (
		<header className="header-section">
			<div className="container">
				<div className="nav-content">
					<div className="row">
						<div className="col-md-5">
							<div className="logo">
								<img src={logo} alt="" />
							</div>
						</div>
						<div className="col-md-7">
							<div className="options">
								<div className="option">
									<Link to="/">Home</Link>
								</div>
								<div className="option">
									<Link to="/about">About</Link>
								</div>
								<div className="option">
									<Link to="/dental">Dental Services</Link>
								</div>
								<div className="option">
									<Link to="/reviews">Reviews</Link>
								</div>
								<div className="option">
									<Link to="/dashboard">Dashboard</Link>
								</div>
								<div className="option">
									<Link to="/contact">Contact</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Headers;
