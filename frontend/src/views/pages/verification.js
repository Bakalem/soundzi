// import external modules
import React, { Component } from "react";
import { Row, Col, Input, Form, FormGroup, Button, Card, CardBody, Label } from "reactstrap";
import { toastr } from "react-redux-toastr";
import sendApiRequest from "../../utility/api";

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: ''
		}
	}

	componentWillMount() {
		if (localStorage.getItem('user')) {
			let user = JSON.parse(localStorage.getItem('user'))
			if (user.status !== 'notVerified')
				this.props.history.push('/');
		}
	}

	handleChange(evt) {
		const code = (evt.target.validity.valid) ? evt.target.value : this.state.code;
		if (!evt.target.validity.valid && evt.target.value.length === 0) {
			this.setState({ code: "" });
		} else {
			this.setState({ code });
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		let user = JSON.parse(localStorage.getItem('user'));

		sendApiRequest({
			endPoint: '/users/verificationChecks',
			method: 'POST',
			params: {
				phoneNumber: user.phoneNumber,
				code: this.state.code
			}
		})
		.then((res) => {
			let user = res.data
			localStorage.setItem('user', JSON.stringify(user));
			this.props.history.push('/');
		}).catch((err) => {
			toastr.error(err);
		});
	}

	render() {
		return (
			<div className="container">
				<Row className="full-height-vh">
					<Col xs="12" className="d-flex align-items-center justify-content-center">
						<Card className="gradient-indigo-purple text-center width-400">
							<CardBody>
								<div className="text-center">
									<h4 className="text-uppercase text-bold-400 white py-4">Phone Number Verification</h4>
								</div>
								<Form className="pt-2" onSubmit={this.handleSubmit}>
									<FormGroup>
										<Col md="12">
											<div className="text-left mt-3">
												<Label for="inputEmail">Enter the code you received by sms</Label>
											</div>
											<Input
												type="text"
												pattern="[0-9]*"
												className="form-control"
												name="inputCode"
												id="inputCode"
												placeholder="9856"
												required
												onChange={this.handleChange.bind(this)} value={this.state.code}
											/>
											<div className="text-center mt-3">
												<Button color="danger" block>Submit</Button>
											</div>
										</Col>
									</FormGroup>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
};

export default ForgotPassword;