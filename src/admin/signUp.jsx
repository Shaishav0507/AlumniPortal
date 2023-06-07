import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { globalAlert, globalLoader } from "../actions/commonActions";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { validEmail } from "../_shared/commonFunction";
import { signUpStepOne } from "./adminApiActions";
import TextField from "@material-ui/core/TextField";

class AdminSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phoneNumber: "",
      profilePic: "",
      validEmail: false,
      emptyFirstName: false,
      emptyLastName: false,
      emptyEmail: false,
      emptyPassword: false,
      emptyConfirmPassword: false,
      emptyAddress: false,
      emptyPhoneNumber: false,
      emptyProfilePic: false,
      matchPassword: false,
      passwordVisible: false,
      confirmPasswordVisible: false,
    };
  }

  componentDidMount = () => {
    globalLoader(false);
  };

  changeValue = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;
    this.setState({
      [name]: value,
    });
  };

  toggleEye = (val) => {
    this.setState((prevState) => {
      return {
        [val]: !prevState[val],
      };
    });
  };

  adminSignupStepOne = (ev) => {
    ev.preventDefault();
    this.formValidation().then((value) => {
      if (value) {
        globalLoader(true);
        let obj = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          address: this.state.address,
          phoneNumber: this.state.phoneNumber,
          profilePic: this.state.profilePic,
        };
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          address: "",
          phoneNumber: "",
          profilePic: "",
        });

        signUpStepOne(obj).then(data=>{
              if(data.data.status===200){
                this.props.history.push("/admin/login");
                globalAlert('success', data.data.message);
                globalLoader(false)
            }

            else{
                globalLoader(false)
                globalAlert('error', data.data.message);
            }
            
        })
          .catch((error) => {
            globalLoader(false);
            console.log(error);
          });
      }
    });
  };

  formValidation = async () => {
    this.setState({
      emptyFirstName: false,
      emptyLastName: false,
      validEmail: false,
      emptyEmail: false,
      emptyPassword: false,
      emptyConfirmPassword: false,
      emptyAddress: false,
      emptyPhoneNumber: false,
      emptyProfilePic: false,
    });
    let formValidation = true;

    if (!this.state.email) {
      formValidation = false;
      this.setState({
        emptyEmail: true,
      });
    } else {
      let res = await validEmail(this.state.email);
      if (!res) {
        formValidation = false;
        this.setState({
          validEmail: true,
        });
      }
    }

    if (!this.state.password) {
      formValidation = false;
      this.setState({
        emptyPassword: true,
      });
    }

    if (!this.state.confirmPassword) {
      formValidation = false;
      this.setState({
        emptyConfirmPassword: true,
      });
    }

    if (this.state.password !== this.state.confirmPassword) {
      formValidation = false;
      this.setState({
        matchPassword: true,
      });
    }

    if (!this.state.firstName) {
      formValidation = false;
      this.setState({
        emptyFirstName: true,
      });
    }

    if (!this.state.lastName) {
      formValidation = false;
      this.setState({
        emptyLastName: true,
      });
    }

    if (!this.state.address) {
      formValidation = false;
      this.setState({
        emptyAddress: true,
      });
    }

    if (!this.state.phoneNumber) {
      formValidation = false;
      this.setState({
        emptyPhoneNumber: true,
      });
    }

    if (!this.state.profilePic) {
      formValidation = false;
      this.setState({
        emptyProfilePic: true,
      });
    }

    return formValidation;
  };

  render() {
    return (
      <div className="top-Wrapper">
        <div className="bg-top">
          <div className="own-container-md">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-2 logo">
                  {/* <img src="/assets/img/logo.png" /> */}
                </div>
                <div className="col-sm-8 text-center pt-1">
                  <h3 className="main-heading pt-1 text-uppercase">
                    Alumni Portal
                  </h3>
                  <h4 className="second-heading">Stay Connected</h4>
                  <div className="own-txt color-blue-three">
                    Let's stay connected with Alumni Portal
                  </div>
                </div>
              </div>
            </div>

            <div></div>
          </div>
        </div>
        <div className="bg-bottom">
          <div className="own-container-md">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="white-box-wrapper negative-mar-top">
                    <div className="tab-wrapper">
                      <h2 className="form-heading- text-center pb-3">Admin</h2>
                      <ul className="own-tab list-unstyled">
                        <li>
                          <Link to="/admin/login">
                            <span
                              className={`tab-text cursor ${
                                this.state.currentForm === "login"
                                  ? "active"
                                  : null
                              }`}
                            >
                              Login
                            </span>
                          </Link>
                        </li>
                        <li>
                          <span
                            className={`tab-text cursor ${
                              this.state.currentForm === "signup"
                                ? "active"
                                : null
                            }`}
                          >
                            New Member
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="form-wrapper">
                      <div>
                        <form
                          className="form-own"
                          noValidate
                          autoComplete="off"
                          onSubmit={(ev) => this.userSignup(ev)}
                        >
                          <div className="form-group-icon position-relative form-group pb-1">
                            <TextField
                              type="text"
                              id="outlined-textarea-own"
                              label="First Name"
                              placeholder="First Name"
                              className="mt-0 mb-0 d-flex"
                              margin="normal"
                              variant="outlined"
                              name="firstName"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.firstName}
                            />

                            <div className="error-wrapper">
                              {this.state.emptyFirstName ? (
                                <span>First Name is empty</span>
                              ) : null}
                            </div>
                          </div>
                          <div className="form-group-icon position-relative form-group pb-1">
                            <TextField
                              id="outlined-textarea"
                              label="Last Name"
                              placeholder="Last Name"
                              className="mt-0 mb-0 d-flex"
                              margin="normal"
                              variant="outlined"
                              name="lastName"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.lastName}
                            />
                             <div className="error-wrapper">
                              {this.state.emptyLastName ? (
                                <span>Last Name is empty</span>
                              ) : null}
                            </div>
                          </div>
                          <div className="form-group-icon position-relative form-group pb-1">
                            <TextField
                              id="outlined-textarea"
                              label="Email ID"
                              placeholder="Email ID"
                              className="mt-0 mb-0 d-flex"
                              margin="normal"
                              variant="outlined"
                              name="email"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.email}
                            />
                            <div className="form-img-wrapper no-pointer">
                              <img src="/assets/img/mail.png" alt="lock" />
                            </div>
                            <div className="error-wrapper">
                              {this.state.emptyEmail ? (
                                <span>Email is empty</span>
                              ) : null}
                              {this.state.validEmail ? (
                                <span>Email is invalid</span>
                              ) : null}
                            </div>
                          </div>

                          <div className="form-group-icon form-group">
                            <TextField
                              type={
                                this.state.passwordVisible ? "text" : "password"
                              }
                              id="outlined-password-input"
                              label="Password"
                              placeholder="Password"
                              className="mt-0 mb-0 d-flex"
                              margin="normal"
                              variant="outlined"
                              name="password"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.password}
                            />
                            <div
                              className="form-img-wrapper cursor"
                              onClick={() => this.toggleEye("passwordVisible")}
                            >
                              {this.state.passwordVisible ? (
                                <img
                                  src="/assets/img/eye-close.png"
                                  alt="lock"
                                />
                              ) : (
                                <img src="/assets/img/eye.png" alt="lock" />
                              )}
                            </div>
                            <div className="error-wrapper">
                              {this.state.emptyPassword ? (
                                <span>Password is empty</span>
                              ) : null}
                            </div>
                          </div>
                          <div className="form-group-icon form-group">
                            <TextField
                              type={
                                this.state.confirmPasswordVisible
                                  ? "text"
                                  : "password"
                              }
                              id="outlined-confirm-password-input"
                              label="Confirm Password"
                              placeholder="Confirm Password"
                              className="mt-0 mb-0 d-flex"
                              margin="normal"
                              variant="outlined"
                              name="confirmPassword"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.confirmPassword}
                            />
                            <div
                              className="form-img-wrapper cursor"
                              onClick={() =>
                                this.toggleEye("confirmPasswordVisible")
                              }
                            >
                              {this.state.confirmPasswordVisible ? (
                                <img
                                  src="/assets/img/eye-close.png"
                                  alt="lock"
                                />
                              ) : (
                                <img src="/assets/img/eye.png" alt="lock" />
                              )}
                            </div>
                            <div className="error-wrapper">
                              {this.state.emptyConfirmPassword ? (
                                <span>Confirm password is empty</span>
                              ) : null}
                              {this.state.matchPassword ? (
                                <span>Passwords don't match</span>
                              ) : null}
                            </div>
                          </div>
                          <div className="form-group-icon position-relative form-group pb-1">
                            <TextField
                              id="outlined-textarea"
                              label="Address"
                              placeholder="Address"
                              className="mt-0 mb-0 d-flex"
                              margin="normal"
                              variant="outlined"
                              name="address"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.address}
                            />
                            <div className="error-wrapper">
                              {this.state.emptyAddress ? (
                                <span>Address is empty</span>
                              ) : null}
                            </div>
                          </div>
                          <div className="form-group-icon position-relative form-group pb-1">
                            <TextField
                              id="outlined-textarea"
                              label="Phone Number"
                              placeholder="Phone Number"
                              className="mt-0 mb-0 d-flex"
                              margin="normal"
                              variant="outlined"
                              name="phoneNumber"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.phoneNumber}
                            />

                            <div className="error-wrapper">
                              {this.state.emptyPhoneNumber ? (
                                <span>Phone Number is empty</span>
                              ) : null}
                            </div>
                          </div>
                          <div className="form-group-icon position-relative form-group pb-1">
                            <TextField
                              id="outlined-textarea"
                              label="Profile Image Link"
                              placeholder="Profile Image Link"
                              className="mt-0 mb-0 d-flex"
                              margin="normal"
                              variant="outlined"
                              name="profilePic"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.profilePic}
                            />
                            <div className="error-wrapper">
                              {this.state.emptyProfilePic ? (
                                <span>Profile Image Link is empty</span>
                              ) : null}
                            </div>
                          </div>

                          
                          <div className="pb-3 px-3 btn-wrapper">
                              <button type="submit" className="btn btn-own btn-block btn-own-primary min-height-btn">SIGNUP</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AdminSignup);

