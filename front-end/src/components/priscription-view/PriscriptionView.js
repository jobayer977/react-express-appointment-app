import React, { useState } from "react";
import Popup from "reactjs-popup";
import Moment from "react-moment";
import CustomButton from "../custom-button/CustomButton";
import logo from "../../assets/logo-1x.png";

const PriscriptionView = ({ data }) => {
	const [modal, setModal] = useState({
		open: false,
	});
	const { contact, name, sex, age, medicine, date } = data;
	const openModal = () => {
		setModal({ open: true });
	};
	const closeModal = () => {
		setModal({ open: false });
	};

	return (
		<div className="prescription-form">
			<div onClick={openModal}>
				<CustomButton small>View</CustomButton>
			</div>
			<Popup open={modal.open} closeOnDocumentClick onClose={closeModal}>
				<div className="prescription-view-content">
					<div className="container">
						<div className="row py-2">
							<div className="col-12">
								<div className="card">
									<div className="card-body py-2">
										<div className="row pt-3">
											<div className="col-md-6 text-left">
												<img src={logo} alt="logo" />
											</div>

											<div className="col-md-6 text-right">
												<p className="text-muted">
													Due to:
													<Moment format="D MMM YYYY" withTitle>
														{date}
													</Moment>
												</p>
											</div>
										</div>

										<div className="row pb-5 p-5">
											<div className="col-md-6 text-left">
												<p className="font-weight-bold mb-2">
													Patient Information
												</p>
												<p className="mb-1">{name}</p>
												<p>Acme Inc</p>
												<p className="mb-1">Age : {age}</p>
												<p className="mb-1">Sex : {sex}</p>
												<p className="mb-1">Contact : {contact}</p>
											</div>
										</div>

										<div className="row p-5">
											<div className="col-md-12">
												<table className="table">
													<thead>
														<tr>
															<th className="border-0 text-uppercase small font-weight-bold">
																#ID
															</th>
															<th className="border-0 text-uppercase small font-weight-bold">
																Medicean Name
															</th>
															<th className="border-0 text-uppercase small font-weight-bold">
																Time
															</th>
															<th className="border-0 text-uppercase small font-weight-bold">
																Days
															</th>
														</tr>
													</thead>
													<tbody>
														{medicine.map((x, i) => (
															<tr key={i}>
																<td>#{x.i}</td>
																<td className="text-left">{x.mediceanName}</td>
																<td>{x.time ? x.time : "After Lunch"}</td>
																<td>{x.days}</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Popup>
		</div>
	);
};

export default PriscriptionView;
