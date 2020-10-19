// import external modules
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import IntlTelInput from "react-intl-tel-input";
import 'react-intl-tel-input/dist/main.css';
import {
	Row,
	Col,
	Input,
	Form,
	FormGroup,
	Button,
	Card,
	CardBody,
	CardFooter,
} from "reactstrap";
import { toastr } from "react-redux-toastr";
import { fetchUser } from '../../redux/actions/login/loginActions';
import { connect } from 'react-redux';
import sendApiRequest from "../../utility/api";

class Register extends Component {

	state = {
		isChecked: true,
		inputFirstname: '',
		inputLastname: '',
		inputEmail: '',
		inputPass: '',
		inputTel: '',
		isInputTelValid: false,
		showErrorMsg: false
	};

	handleChecked = e => {
		this.setState(prevState => ({
			isChecked: !prevState.isChecked
		}));
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value })
	};

	onPhoneNumberChange = (valid, number, obj, fullNumber) => {
		this.setState({ 'isInputTelValid': valid, 'inputTel': fullNumber });
		this.setState({ 'showErrorMsg': false });
	}

	handleInvalid = e => {
		// On vérifie si le numéro est valide
		if (!this.state.isInputTelValid) {
			this.setState({ 'showErrorMsg': true });
		}
	};

	handleSubmit = e => {
		e.preventDefault();
		if (!this.state.isInputTelValid) {
			this.setState({ 'showErrorMsg': true });
			return;
		} 

		var { inputFirstname, inputLastname, inputEmail, inputPass, inputTel } = this.state;		
		sendApiRequest({
			endPoint: '/users/register',
			method: 'POST',
			params: { firstname: inputFirstname, lastname: inputLastname, email: inputEmail, password: inputPass, phoneNumber: inputTel }
		})
		.then(() => {
			// We sent a request to verify the phone number
			sendApiRequest({endPoint : '/users/verifyPhoneNumber', params : { phoneNumber: this.state.inputTel }})
			.then(() => {
				// dispatch the connexion
				this.props.dispatch(fetchUser(this.state.inputEmail, this.state.inputPass, this.props.history));
			})
		})
		.catch((error) => {
			toastr.error('Error : ' + error);
		})
	};

	componentWillMount() {
		if (localStorage.getItem('user'))
			this.props.history.push('/');
	}

	render() {
		return (
			<div className="container">
				<Row className="full-height-vh">
					<Col xs="12" className="d-flex align-items-center justify-content-center">
						<Card className="gradient-indigo-purple text-center width-400">
							<CardBody>
								<h2 className="white py-4">Register</h2>
								<Form className="pt-2" onInvalid={this.handleInvalid} onSubmit={this.handleSubmit}>
									<FormGroup>
										<Col md="12">
											<Input
												type="text"
												className="form-control"
												name="inputFirstname"
												id="inputFirstname"
												placeholder="First name"
												onChange={this.handleChange}
												required
											/>
										</Col>
									</FormGroup>

									<FormGroup>
										<Col md="12">
											<Input
												type="text"
												className="form-control"
												name="inputLastname"
												id="inputLastname"
												placeholder="Last name"
												onChange={this.handleChange}
												required
											/>
										</Col>
									</FormGroup>

									<FormGroup>
										<Col md="12">
											<Input
												type="email"
												className="form-control"
												name="inputEmail"
												id="inputEmail"
												placeholder="Email"
												onChange={this.handleChange}
												required
											/>
										</Col>
									</FormGroup>

									<FormGroup>
										<Col md="12">
											<Input
												type="password"
												className="form-control"
												name="inputPass"
												id="inputPass"
												placeholder="Password"
												onChange={this.handleChange}
												required
											/>
										</Col>
									</FormGroup>

									<FormGroup>
										<Col md="12">
											<IntlTelInput
												fieldName="inputTel"
												preferredCountries={['be']}
												containerClassName="intl-tel-input"
												inputClassName="form-control"
												onPhoneNumberChange={this.onPhoneNumberChange}
											/>
										</Col>
										{this.state.showErrorMsg ? <span style={{ color: 'red' }}>Invalide phone number!</span> : ''}
									</FormGroup>

									<FormGroup>
										<Col md="12">
											<Button type="submit" color="danger" block className="btn-pink btn-raised">
												Submit
                                 </Button>
										</Col>
									</FormGroup>
								</Form>
							</CardBody>
							<CardFooter>
								<div className="float-left">
									<NavLink to="/pages/forgot-password" className="text-white">
										Forgot Password?
                           </NavLink>
								</div>
								<div className="float-right">
									<NavLink to="/pages/login" className="text-white">
										Login
                           </NavLink>
								</div>
							</CardFooter>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default connect()(Register);