import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { globalLoader } from "../actions/commonActions";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { validEmail } from "../_shared/commonFunction";
import { signUpStepOne } from "./adminApiActions";
import TextField from "@material-ui/core/TextField";
import DatePicker from "react-datepicker";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      validEmail: false,
      emptyEmail: false,
      emptyPassword: false,
      notMatchedPassword: false,
      emptyConfirmPassword: false,
      minLengthPassword: false,
      currentForm: "signup",
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

  adminSignupStepOne = (ev) => {
    ev.preventDefault();
    this.formValidation().then((value) => {
      if (value) {
        globalLoader(true);
        let obj = {
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          role: 3,
        };
        this.setState({
          email: "",
          password: "",
          confirmPassword: "",
        });

        signUpStepOne(obj)
          .then((response) => {
            console.log(response);

            if (response.data.status == "200") {
              let userToken = response.data.data.userToken;
              let userId = response.data.data.userInfo._id;

              localStorage.setItem("userToken", userToken);
              localStorage.setItem("userId", userId);

              this.props.history.push("/admin/signup-step-two");
            } else {
              globalLoader(false);
              alert(response.data.message);
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
      validEmail: false,
      emptyEmail: false,
      emptyPassword: false,
      notMatchedPassword: false,
      emptyConfirmPassword: false,
      minLengthPassword: false,
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
    } else if (this.state.password.length < 6) {
      formValidation = false;
      this.setState({
        minLengthPassword: true,
      });
    }
    if (!this.state.confirmPassword) {
      formValidation = false;
      this.setState({
        emptyConfirmPassword: true,
      });
    } else if (this.state.confirmPassword != this.state.password) {
      formValidation = false;
      this.setState({
        notMatchedPassword: true,
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
                          <span
                            className={`tab-text cursor ${
                              this.state.currentForm === "signup"
                                ? "active"
                                : null
                            }`}
                          >
                            Add User
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="form-wrapper">
                      <div>
                        <div className="step-txt-wrapper pb-4">Step 1 of 2</div>
                        <form
                          className="form-own"
                          noValidate
                          autoComplete="off"
                          onSubmit={(ev) => this.userSignup(ev)}
                        >
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
                          <div className="form-group-icon position-relative form-group pb-1">
                            <TextField
                              type="text"
                              id="outlined-textarea-own"
                              label="Secondary Email ID"
                              placeholder="Secondary Email ID"
                              className="mt-0 mb-0 d-flex"
                              margin="normal"
                              variant="outlined"
                              name="userId"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.userId}
                            />
                            <div className="form-img-wrapper no-pointer">
                              <img
                                src="/assets/img/lock-arrow.png"
                                alt="lock"
                              />
                            </div>
                            <div className="error-wrapper">
                              {this.state.emptyUserId ? (
                                <span>Secondary Email is empty</span>
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

                          <div className="form-group-icon form-group">
                            <TextField
                              type={
                                this.state.confirmPasswordVisible
                                  ? "text"
                                  : "password"
                              }
                              id="outlined-confirm-password-input"
                              label="Working"
                              placeholder="Working"
                              className="mt-0 mb-0 d-flex"
                              margin="normal"
                              variant="outlined"
                              name="confirmPassword"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.confirmPassword}
                            />

                            <div className="error-wrapper">
                              {this.state.emptyConfirmPassword ? (
                                <span>Working is empty</span>
                              ) : null}

                              {this.state.matchPassword ? (
                                <span>Passwords don't match</span>
                              ) : null}
                            </div>
                          </div>
                          {/* <div className="form-group-icon form-group">
                    <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          variant="outlined"
          label="Working"
          
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </div> */}
                          <div className="form-group-icon form-custom-date form-group calender-form-wrapper">
                            <DatePicker
                              selected={this.state.dob}
                              onChange={(ev) => this.changeValueDate(ev)}
                              placeholderText="Joined On"
                              name="dob"
                              className="form-control"
                              maxDate={new Date()}
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                            />
                            {/* <input type="text" onChange={(ev)=>this.changeValue(ev)} value={this.state.dob} name="dob" placeholder="Date of Birth" className="form-control" /> */}
                            <div className="icon-wrapper">
                              <img src="/assets/img/calendar.png" />
                            </div>
                            <div className="error-wrapper">
                              {this.state.emptyDob ? (
                                <span>Joined On is empty</span>
                              ) : null}
                            </div>
                          </div>

                          <div className="pb-3 px-3 btn-wrapper">
                            <button
                              type="submit"
                              className="btn btn-own btn-block btn-own-primary min-height-btn"
                            >
                              CONTINUE
                            </button>
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

export default withRouter(AddUser);
