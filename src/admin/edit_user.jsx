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

class EditUser extends Component {
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
                  <div className="text-right">
                    <input value="Search User" />
                  </div>

                  <h3 className="table-heading pt-2 pb-3 color-black">
                    User Table
                  </h3>
                  <div className="own-table v-center-table table-responsive color-black">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>User ID</th>
                          <th>Email</th>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Contact</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>US1024</td>
                          <td>mohantest@gmail.com</td>
                          <td>Mohan Rao</td>
                          <td className="color-green">Active</td>
                          <td>
                            <div className="upload-wrapper">
                              <Link to="/admin/edit-user/US1024">
                                <button className="btn upload-btn btn-main">
                                  Connect
                                </button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>US1026</td>
                          <td>robintest@gmail.com</td>
                          <td>Robin Sharma</td>
                          <td className="color-red">Inactive</td>
                          <td>
                            <div className="upload-wrapper">
                              <button className="btn upload-btn btn-main">
                                Connect
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>US1032</td>
                          <td>shilpatest@gmail.com</td>
                          <td>Shilpa Trivedi</td>
                          <td className="color-green">Active</td>
                          <td>
                            <div className="upload-wrapper">
                              <button className="btn upload-btn btn-main">
                                Connect
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>US1037</td>
                          <td>kabirtest@gmail.com</td>
                          <td>Kabir bedi</td>
                          <td className="color-green">Active</td>
                          <td>
                            <div className="upload-wrapper">
                              <button className="btn upload-btn btn-main">
                                Connect
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>US1024</td>
                          <td>mohantest@gmail.com</td>
                          <td>Mohan Rao</td>
                          <td className="color-green">Active</td>
                          <td>
                            <div className="upload-wrapper">
                              <button className="btn upload-btn btn-main">
                                Connect
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(EditUser);
