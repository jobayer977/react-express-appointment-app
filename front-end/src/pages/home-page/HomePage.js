import React from "react";
import HeroContent from "../../components/hero-content/HeroContent";
import { Link } from "react-router-dom";
import CustomButton from "../../components/custom-button/CustomButton";

const HomePage = () => {
	return (
		<div className="home-page">
			<HeroContent>
				<h1>Your New Smile starts here</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ex
					vitae earum dignissimos soluta maxime facilis cum unde nam rerum?
				</p>
				<Link to="/appointment">
					<CustomButton>Get Appointment</CustomButton>
				</Link>
			</HeroContent>
		</div>
	);
};

export default HomePage;
