import React from "react";
import "./herocontent.style.css";
import heroThumbnail from "../../assets/hero-thumbanil.png";

const HeroContent = ({ children }) => {
	return (
		<div className="hero-content-wrapper">
			<div className="container">
				<div className="hero-content">
					<div className="row">
						<div className="col-md-5">{children}</div>
						<div className="col-md-7">
							<div className="hero-thumbnail">
								<img src={heroThumbnail} alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroContent;
