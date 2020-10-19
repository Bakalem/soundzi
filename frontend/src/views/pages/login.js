// import external modules
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
   Row,
   Col,
   Input,
   Form,
   FormGroup,
   Button,
   Card,   
   CardBody,
   CardFooter
} from "reactstrap";
import { fetchUser } from '../../redux/actions/login/loginActions';
import { connect } from 'react-redux';


class Login extends Component {

   state = {
      inputEmail: '',
      inputPass: ''
   };

   handleChecked = e => {
      this.setState(prevState => ({
         isChecked: !prevState.isChecked
      }));
   };

   handleSubmit = e => {
      e.preventDefault();
      this.props.dispatch(fetchUser(this.state.inputEmail, this.state.inputPass, this.props.history));
   };

   handleChange = e => {
      const { name, value } = e.target;
      this.setState({[name] : value})
   };

   handleInvalid = e => {
      
   };

   componentWillMount() {
      if(localStorage.getItem('user'))
         this.props.history.push('/');
   }

   render() {
      return (
         <div className="container">
            <Row className="full-height-vh">
               <Col xs="12" className="d-flex align-items-center justify-content-center">
                  <Card className="gradient-indigo-purple text-center width-400">
                     <CardBody>
                        <h2 className="white py-4">Login</h2>
                        <Form className="pt-2" onInvalid={this.handleInvalid} onSubmit={this.handleSubmit}>
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
                           <NavLink to="/pages/register" className="text-white">
                              Register Now
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

//export default Login;
export default connect()(Login);