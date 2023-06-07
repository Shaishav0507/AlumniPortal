import React, { Component } from "react";
import {
  withRouter,
} from "react-router-dom";
import { logOut } from "../_shared/commonFunction";
import {
  dashBoard,
  allDoctors,
  approveDoctor,
  removeAppointmentData,
} from "./adminApiActions";
import Header from "../templetes/_common/header";
import TextField from "@material-ui/core/TextField";

class CreateJob extends Component {
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
                    You can create job, please fulfill the below details.
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
                          Create Job
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
                    Job Details
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
                        label="Title"
                        placeholder="Title"
                        className="mt-0 mb-0 d-flex"
                        margin="normal"
                        variant="outlined"
                        name="userId"
                        onChange={(ev) => this.changeValue(ev)}
                        value={this.state.userId}
                      />

                      <div className="error-wrapper">
                        {this.state.emptyUserId ? (
                          <span>Title is empty</span>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-group-icon position-relative form-group col-md-4 px-2 pb-1">
                      <TextField
                        id="outlined-textarea"
                        label="Salary Offered"
                        placeholder="Salary Offered"
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
                        label="Minimum Experiance"
                        placeholder="Minimum Experiance"
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

                      <div className="error-wrapper">
                        {this.state.lastNmae ? (
                          <span>Description is empty</span>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-group-icon position-relative form-group col-md-4 px-2 pb-1">
                      <TextField
                        id="outlined-textarea"
                        label="Skills"
                        placeholder="Skills"
                        className="mt-0 mb-0 d-flex"
                        margin="normal"
                        variant="outlined"
                        onChange={(ev) => this.changeValue(ev)}
                        value={this.state.Skills}
                        name="Skills"
                        multiline
                        rows="3"
                      />

                      <div className="error-wrapper">
                        {this.state.phone ? <span>Skills is empty</span> : null}
                      </div>
                    </div>
                    <div className="pb-3 px-3 col-12 text-center btn-wrapper">
                      <button
                        type="submit"
                        className="btn btn-own btn-own-primary min-width-lg min-height-btn"
                      >
                        CREATE
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

export default withRouter(CreateJob);
