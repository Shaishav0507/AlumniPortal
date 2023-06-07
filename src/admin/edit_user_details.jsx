import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import { globalLoader } from "../actions/commonActions";
import { logOut } from "../_shared/commonFunction";
import {
  dashBoard,
  allDoctors,
  approveDoctor,
  removeAppointmentData,
} from "./adminApiActions";
import { TIME } from "../actionsTypes/types";
import Header from "../templetes/_common/header";
import DatePicker from "react-datepicker";
import TextField from "@material-ui/core/TextField";

class EditUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingData: [],
      pastData: [],
      doctorApprovalList: [],
    };
  }

  componentDidMount = () => {
    // if (localStorage.userType === "admin" && localStorage.userId && localStorage.userToken) {
    //     globalLoader(false);
    //     let userId = localStorage.getItem('userId');
    // let userTokene = localStorage.getItem('userToken');
    // let obj = {
    //     userToken: userTokene,
    //     userId: userId
    // }
    //     this.allDoctorsList(obj);
    //     this.dashBoardListData();
    // }
    // else {
    //     this.props.history.push('/admin/login')
    // }
  };

  allDoctorsList = (obj) => {
    allDoctors(obj).then((res) => {
      console.log(res.data.data.doctors);
      this.setState({
        doctorApprovalList: res.data.data.doctors,
      });
    });
  };
  changeValue = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;
    this.setState({
      [name]: value,
    });
  };
  dashBoardListData = () => {
    let userId = localStorage.getItem("userId");
    let userTokene = localStorage.getItem("userToken");
    let obj = {
      userToken: userTokene,
      userId: userId,
    };

    dashBoard(obj).then((response) => {
      console.log(response);
      let that = this;
      let localUpcomingData = [];
      let localPastData = [];
      response.data.data.appointments.forEach((res) => {
        if (res.status == 1) {
          localUpcomingData.push(res);
        } else if (res.status == 2) {
          localPastData.push(res);
        }
      });
      that.setState({
        upcomingData: localUpcomingData,
        pastData: localPastData,
      });
    });
  };

  attendAppointment = (id, val) => {
    let userId = localStorage.getItem("userId");
    let userTokene = localStorage.getItem("userToken");
    let obj = {
      userToken: userTokene,
      userId: userId,
      appointmentId: id,
      status: 2,
      attendance: true,
    };
    removeAppointmentData(obj).then((res) => {
      this.dashBoardListData();
    });
  };

  removeAppointment = (id, attendance) => {
    let userId = localStorage.getItem("userId");
    let userTokene = localStorage.getItem("userToken");
    let obj = {
      userToken: userTokene,
      userId: userId,
      appointmentId: id,
      status: 3,
      attendance: attendance,
    };
    removeAppointmentData(obj).then((res) => {
      this.dashBoardListData();
    });
  };

  approveDoc = (docId) => {
    let userId = localStorage.getItem("userId");
    let userTokene = localStorage.getItem("userToken");
    let obj = {
      userToken: userTokene,
      userId: userId,
      docId: docId,
      active: true,
    };
    approveDoctor(obj).then((res) => {
      let userId = localStorage.getItem("userId");
      let userTokene = localStorage.getItem("userToken");
      let obj = {
        userToken: userTokene,
        userId: userId,
        docId: docId,
        active: true,
      };
      this.allDoctorsList(obj);
    });
  };
  logOut = () => {
    logOut(this);
  };

  render() {
    return (
      <div>
        <Header openFeedback={this.toggleFeedbackState} />
        <section className="min-height-less-header text-light bg-own-blue">
          <div className="dashboard-txt-wrapper">
            <div className="conatiner-fluid own-container-sm">
              <div className="row">
                <div className="col-12 text-center">
                  <h3 className="main-heading pt-1">Hi, Admin</h3>
                  {/* <div className="normal-txt pb-3 color-blue-two">{this.props.userDesignation}</div> */}
                  <div className="own-txt own-close-txt color-blue-three">
                    You can edit user details, for particular user to your
                    Alumni Portal using the edit user button below.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="dashboard-tab-wrapper">
                  <div className="tab-wrapper">
                    <ul className="own-tab list-unstyled font-poppins">
                      <li>
                        <span className={`tab-text cursor active`}>
                          Edit User
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="container">
              <div className="row px-3">
                <div className="col-12 below-box-wrapper pt-2">
                  <h3 className="table-heading pt-2 pb-3 color-black">
                    User Details
                  </h3>

                  <form
                    className="form-own d-flex flex-wrap px-2"
                    noValidate
                    autoComplete="off"
                    onSubmit={(ev) => this.userSignup(ev)}
                  >
                    <div className="form-group-icon position-relative form-group col-md-4 px-2 pb-1">
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
                    <div className="form-group-icon position-relative form-group col-md-4 px-2 pb-1">
                      <TextField
                        id="outlined-textarea"
                        label="Last Name"
                        placeholder="Last Name"
                        className="mt-0 mb-0 d-flex"
                        margin="normal"
                        variant="outlined"
                        name="lastname"
                        onChange={(ev) => this.changeValue(ev)}
                        value={this.state.lastname}
                      />
                    </div>
                    <div className="form-group-icon position-relative form-group col-md-4 px-2 pb-1">
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
                        {this.state.lastNmae ? (
                          <span>Address is empty</span>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-group-icon position-relative form-group col-md-4 px-2 pb-1">
                      <TextField
                        id="outlined-textarea"
                        label="Pincode"
                        placeholder="Pincode"
                        className="mt-0 mb-0 d-flex"
                        margin="normal"
                        variant="outlined"
                        name="pincode"
                        onChange={(ev) => this.changeValue(ev)}
                        value={this.state.pincode}
                      />

                      <div className="error-wrapper">
                        {this.state.lastNmae ? (
                          <span>Pincode is empty</span>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-group-icon position-relative form-group col-md-4 px-2 pb-1">
                      <TextField
                        id="outlined-textarea"
                        label="Phone Number"
                        placeholder="Phone Number"
                        className="mt-0 mb-0 d-flex"
                        margin="normal"
                        variant="outlined"
                        name="phone"
                        onChange={(ev) => this.changeValue(ev)}
                        value={this.state.phone}
                      />

                      <div className="error-wrapper">
                        {this.state.phone ? (
                          <span>Phone Number is empty</span>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-group-icon position-relative form-group col-md-4 px-2 pb-1">
                      <TextField
                        id="outlined-textarea"
                        label="Profile Image Link"
                        placeholder="Profile Image Link"
                        className="mt-0 mb-0 d-flex"
                        margin="normal"
                        variant="outlined"
                        name="imgLink"
                        onChange={(ev) => this.changeValue(ev)}
                        value={this.state.imgLink}
                      />
                    </div>

                    <div className="form-group-icon position-relative form-group col-md-4 px-2 pb-1">
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
                        disabled={true}
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
                    <div className="form-group-icon position-relative form-group col-md-4 px-2 pb-1">
                      <TextField
                        type="text"
                        id="outlined-textarea-own"
                        label="Secondary Email ID"
                        placeholder="Secondary Email ID"
                        className="mt-0 mb-0 d-flex"
                        margin="normal"
                        variant="outlined"
                        name="secondryEmail"
                        onChange={(ev) => this.changeValue(ev)}
                        value={this.state.secondryEmail}
                      />
                      <div className="form-img-wrapper no-pointer">
                        <img src="/assets/img/lock-arrow.png" alt="lock" />
                      </div>
                      <div className="error-wrapper">
                        {this.state.emptyUserId ? (
                          <span>Secondary Email is empty</span>
                        ) : null}
                      </div>
                    </div>

                    <div className="form-group-icon col-md-4 px-2 form-group">
                      <TextField
                        type={this.state.passwordVisible ? "text" : "password"}
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
                          <img src="/assets/img/eye-close.png" alt="lock" />
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

                    <div className="form-group-icon form-group col-md-4 px-2">
                      <TextField
                        type={"text"}
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
                    <div className="form-group-icon form-custom-date col-md-4 px-2 form-group calender-form-wrapper">
                      {/* <DatePicker
                                selected={this.state.dob}
                                onChange={(ev) => this.changeValueDate(ev)}
                                placeholderText="Joined On"
                                name="dob"
                                className="form-control"
                                maxDate={new Date()}
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                              /> */}
                      <TextField
                        id="outlined-textarea"
                        label="Joined On"
                        placeholder="Joined On"
                        className="mt-0 mb-0 d-flex"
                        margin="normal"
                        variant="outlined"
                        name="joined"
                        onChange={(ev) => this.changeValue(ev)}
                        value={this.state.joined}
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
                    <div className="form-group-icon position-relative form-group col-md-4 px-2 pb-1">
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

                    <div className="pb-3 px-3 col-12 text-center btn-wrapper">
                      <button
                        type="submit"
                        className="btn btn-own btn-own-primary min-width-lg min-height-btn"
                      >
                        UPDATE
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(EditUserDetails);
