import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { logOut } from "../_shared/commonFunction";
import {
  dashBoard,
  allDoctors,
  approveDoctor,
  removeAppointmentData,
} from "./adminApiActions";
import Header from "../templetes/_common/header";

class AdminDashboard extends Component {
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
  // logOut = () => {
  //   logOut(this);
  // };

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
                    Let’s stay connected with Alumni Portal, even if you had
                    moved forward we are still have many things to explore.
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
                          Admin Directory
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
              <div className="row">
                <div className="col-12">
                  <div className="container-fluid below-box-wrapper">
                    <div className="row">
                      <div className="flex-1 px-3 home-list-wrapper">
                        <ul className="row list-unstyled no-gutters dsh-home-list py-3">
                          <li className="col-lg-4 col-md-6 col-sm-12">
                            <Link to="/admin/upload">
                            <div className="home-list-box cursor">
                              <div className="box-img-wrapper half-width text-right">
                                <img
                                  src="/assets/img/form-icon-2.png"
                                  alt="img"
                                  className="mw-100"
                                />
                              </div>
                              <div className="box-txt-wrapper half-width">
                                Upload Document
                              </div>
                            </div>
                            </Link>
                          </li>
                          <li className="col-lg-4 col-md-6 col-sm-12">
                            <Link to="/admin/add-user">
                              <div className="home-list-box cursor">
                                <div className="box-img-wrapper half-width text-right">
                                  <img
                                    src="/assets/img/piggy.png"
                                    alt="img"
                                    className="mw-100"
                                  />
                                </div>
                                <div className="box-txt-wrapper half-width">
                                  Add User
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li className="col-lg-4 col-md-6 col-sm-12">
                            <Link to="/admin/edit-user">
                              <div className="home-list-box cursor">
                                <div className="box-img-wrapper half-width text-right">
                                  <img
                                    src="/assets/img/form-icon-1.png"
                                    alt="img"
                                    className="mw-100"
                                  />
                                </div>
                                <div className="box-txt-wrapper half-width">
                                  Edit User
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li className="col-lg-4 col-md-6 col-sm-12">
                            <Link to="/admin/activate-user">
                              <div className="home-list-box cursor">
                                <div className="box-img-wrapper half-width text-right">
                                  <img
                                    src="/assets/img/form-icon-2.png"
                                    alt="img"
                                    className="mw-100"
                                  />
                                </div>
                                <div className="box-txt-wrapper half-width">
                                  Activate User
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li className="col-lg-4 col-md-6 col-sm-12">
                            <Link to="/admin/deactivate-user">
                              <div className="home-list-box cursor">
                                <div className="box-img-wrapper half-width text-right">
                                  <img
                                    src="/assets/img/settlement-form.png"
                                    alt="img"
                                    className="mw-100"
                                  />
                                </div>
                                <div className="box-txt-wrapper half-width">
                                  Deactivate User
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li className="col-lg-4 col-md-6 col-sm-12">
                            <Link to="/admin/job-list">
                              <div className="home-list-box cursor">
                                <div className="box-img-wrapper half-width text-right">
                                  <img
                                    src="/assets/img/form-pf.png"
                                    alt="img"
                                    className="mw-100"
                                  />
                                </div>
                                <div className="box-txt-wrapper half-width">
                                  Job Applicants
                                </div>
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="more-home-wrapper">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-12">
                              <Link to="/admin/create-job">
                                <div className="more-txt-wrapper">More</div>
                                <div className="more-slider-list">
                                  <div className="slider-box-wrapper text-center">
                                    <div className="slider-img-wrapper">
                                      <img
                                        src="/assets/img/entrepreneurs.png"
                                        alt="img"
                                        className="mw-100"
                                      />
                                    </div>
                                    <div className="slider-heading">
                                      Create Job Post
                                    </div>
                                    <div className="slider-txt">
                                      Annuity Advice & Statement
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default withRouter(AdminDashboard);
