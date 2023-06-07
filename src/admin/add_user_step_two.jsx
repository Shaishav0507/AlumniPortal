import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { globalLoader } from "../actions/commonActions";
import { signUpStepTwo } from "./adminApiActions";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";

import TextField from "@material-ui/core/TextField";

class AddUserStepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      dob: null,
      phone: "",
      emptyFisrtName: false,
      emptyLastName: false,
      emptyDob: false,
      emptyPhone: false,
      currentForm: "signup",
    };
  }

  componentDidMount = () => {
    // if (!localStorage.token) {
    //   this.props.history.push('/')
    // }
    globalLoader(false);
  };

  changeValue = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;
    this.setState({
      [name]: value,
    });
  };

  changeValueDate = (date) => {
    this.setState({
      dob: date,
    });
  };

  adminSignupStepTwo = (ev) => {
    ev.preventDefault();
    this.formValidation().then((value) => {
      if (value) {
        globalLoader(true);
        let obj = {
          userToken: localStorage.getItem("userToken"),
          userId: localStorage.getItem("userId"),
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          birthDate: this.state.dob,
          contactNumber: this.state.phone,
        };
        this.setState({
          firstName: "",
          lastName: "",
          dob: "",
          phone: "",
        });

        signUpStepTwo(obj)
          .then((response) => {
            console.log(response);

            if (response.data.status == "200") {
              localStorage.setItem("userType", "admin");
              this.props.history.push("/admin/dashboard");
            } else if (response.data.status == "204") {
              globalLoader(false);
              alert("something went wrong");
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
      emptyFisrtName: false,
      emptyLastName: false,
      emptyDob: false,
      emptyPhone: false,
    });
    let formValidation = true;

    if (!this.state.firstName) {
      formValidation = false;
      this.setState({
        emptyFisrtName: true,
      });
    }

    if (!this.state.lastName) {
      formValidation = false;
      this.setState({
        emptyLastName: true,
      });
    }
    if (!this.state.dob) {
      formValidation = false;
      this.setState({
        emptyDob: true,
      });
    }
    if (!this.state.phone) {
      formValidation = false;
      this.setState({
        emptyPhone: true,
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
                  <img src="/assets/img/logo.png" />
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
                        <div className="step-txt-wrapper pb-4">Step 2 of 2</div>
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
                              name="userId"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.userId}
                            />

                            <div className="error-wrapper">
                              {this.state.emptyUserId ? (
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
                              name="email"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.email}
                            />
                          </div>
                          <div className="form-group-icon position-relative form-group pb-1">
                            <TextField
                              id="outlined-textarea"
                              label="Address"
                              placeholder="Address"
                              className="mt-0 mb-0 d-flex"
                              margin="normal"
                              variant="outlined"
                              name="email"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.email}
                            />

                            <div className="error-wrapper">
                              {this.state.lastNmae ? (
                                <span>Address is empty</span>
                              ) : null}
                            </div>
                          </div>
                          <div className="form-group-icon position-relative form-group pb-1">
                            <TextField
                              id="outlined-textarea"
                              label="Pincode"
                              placeholder="Pincode"
                              className="mt-0 mb-0 d-flex"
                              margin="normal"
                              variant="outlined"
                              name="email"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.email}
                            />

                            <div className="error-wrapper">
                              {this.state.lastNmae ? (
                                <span>Pincode is empty</span>
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
                              name="email"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.email}
                            />

                            <div className="error-wrapper">
                              {this.state.phone ? (
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
                              name="email"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.email}
                            />
                          </div>
                          <div className="form-group-icon position-relative form-group pb-1">
                            <TextField
                              id="outlined-textarea"
                              label="Description"
                              placeholder="Description"
                              className="mt-0 mb-0 d-flex"
                              margin="normal"
                              variant="outlined"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.desc}
                              name="desc"
                              multiline
                              rows="3"
                            />
                          </div>

                          <div className="pb-3 px-3 btn-wrapper">
                            <button
                              type="submit"
                              className="btn btn-own btn-block btn-own-primary min-height-btn"
                            >
                              Add User
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

export default withRouter(AddUserStepTwo);
