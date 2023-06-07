import React, { Component } from 'react';
import { globalLoader, globalAlert } from '../actions/commonActions';
import { withRouter, Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { appointmentList, locationList } from '../actions/commonActions';
import { TIME } from '../actionsTypes/types';
import { checkAppointment,confirmAppointment } from './apiActions';
import Modal from 'react-responsive-modal';

class PatientAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      appointmentListArray: [],
      locationListArray: [],
      timeArray: TIME,
      time: '',
      duration: '',
      appointmentDate: null,
      appointmentType: '',
      location: '',
      open: false,
      durationArray: [{ val: 30, text: "30 MIN" }, { val: 60, text: "60 MIN" }, { val: 90, text: "90 MIN" },],
      availableList: [],
      updatedDate: null,
      updatedTime: null,
    }
  }
  componentWillMount = () => {
    if (!localStorage.userToken) {
      this.props.history.push('/')
    }
  }

  changeValue = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;
    this.setState({
      [name]: value,
    })
  }
  changeValueDate = (date) => {
    this.setState({
      appointmentDate: date
    });
  }

  componentDidMount = () => {
    appointmentList().then(res => {
      this.setState({
        appointmentListArray: res.data.data.appointmentTypes
      })
    })
    locationList().then(res => {
      let arrayList = [];
      arrayList = res.data.data.locations;
      this.setState({
        locationListArray: arrayList,
      })
    })
    globalLoader(false)
  }

  confirmBooking =(id)=>{
    let userId = localStorage.getItem('userId');
    let userTokene = localStorage.getItem('userToken');
    let obj = {
      appointment: this.state.appointmentType,
      office: this.state.location,
      userId: userId,
      userToken: userTokene,
      durationBooked: this.state.duration,
      time: this.state.time,
      date: this.state.appointmentDate,
      doctor:id,
    }
    confirmAppointment(obj).then((response) => {
            globalAlert('success', response.data.message)

      this.props.history.push('/patient/dashboard')
    })
  }

  avialableAppointment = (ev) => {
    ev.preventDefault();
    this.formValidation().then((value) => {

      if (value) {
        globalLoader(true)
        let userId = localStorage.getItem('userId');
        let userTokene = localStorage.getItem('userToken');
        let obj = {
          appointment: this.state.appointmentType,
          office: this.state.location,
          userId: userId,
          userToken: userTokene,
          durationBooked: this.state.duration,
          time: this.state.time,
          date: this.state.appointmentDate,

        }
        this.setState({
          email: '',
          password: '',
        })
        checkAppointment(obj).then((response) => {
          console.log('res', response);

          if (response.data.status === 200) {
            // globalAlert('success', response.data.message)
            if (response.data.data.userInfo.status === 0) {
              localStorage.setItem('userType', 'patient')
              this.props.history.push('/patient/signup-step-two')
            }
            else {
              let newTime = TIME.find(x => x.val == this.state.time);
              let localYear = this.state.appointmentDate.getFullYear();
              let localMonth = this.state.appointmentDate.getMonth();
              localMonth =localMonth+1;
              let localDay = this.state.appointmentDate.getDate();
              let localFullDate = `${localDay}/${localMonth}/${localYear}`;

              this.setState({ availableList: response.data.data.doctorsList, open: true, updatedTime: newTime.text,
              updatedDate:localFullDate }, () => {
                globalLoader(false)
              });
              // localStorage.setItem('userType', 'patient')
              // this.props.history.push('/patient/dashboard')
            }
          }
          else {
            globalLoader(false)
            globalAlert('error', response.data.message)
          }
        })
          .catch((error) => {

            globalAlert('error', "error.data.message")
            globalLoader(false)
          });
      }
    })
  }

  formValidation = async () => {
    return true
    this.setState({
      validEmail: false,
      emptyEmail: false,
      emptyPassword: false,
    })
    let formValidation = true;

    if (!this.state.password) {
      formValidation = false;
      this.setState({
        emptyPassword: true,
      })
    }
    return formValidation
  }

  onCloseModal = () => {
    this.setState({
      open: false,
      time: '',
      duration: '',
      appointmentDate: null,
      appointmentType: '',
      location: '',
    })
  }
  render() {
    return (
      <div className>
        <div className="container-fluid">
          <div className="row">
            <div className="container page-wrapper ">
              <div className="row">
                <div className="col-12 px-0">
                  {/* start content container */}
                  <div className="container-fluid h-100">
                    <div className="row h-100 min-vh-100">
                      <div className="col-md-7 col-12 bg-wrapper" style={{ backgroundImage: 'url(/assets/img/img-4.png)' }}>
                        <div className="h-100 d-flex flex-wrap align-items-center justify-content-center">
                          <div className="appointment-txt-wrapper py-5">
                            <div className="make-an-txt">Make an </div>
                            <div className="appointment-txt pb-2">Appointment</div>
                            <div>Please let us know when and where you’d like to see us.</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 col-12 bg-white right-side-form">
                        <div className="px-0 px-md-2 px-lg-3">
                          <div className="form-heading-logo link-color text-center py-4">
                            <Link to="/patient/dashboard">
                              <img src="/assets/img/logo-blue.png" />
                            </Link>
                          </div>
                          <form className="form-own pt-3" onSubmit={(ev) => this.avialableAppointment(ev)}>
                            <div className="form-group-icon form-group-icon-select form-group">
                              <select className="form-control" onChange={(ev) => this.changeValue(ev)} value={this.state.appointmentType} name="appointmentType" >
                                <option disabled value="">Appointment Type</option>
                                {this.state.appointmentListArray.map(res => (
                                  <option key={res._id} value={res._id}>{res.name}</option>
                                ))}




                              </select>
                              <div className="icon-wrapper">
                                <img src="/assets/img/drop-down.png" />
                              </div>
                            </div>
                            <div className="form-group-icon form-group-icon-select form-group">
                              <select onChange={(ev) => this.changeValue(ev)} value={this.state.location} name="location" placeholder="Last Name" className="form-control">
                                <option value="" disabled>
                                  Select Location
                              </option>
                                {this.state.locationListArray.map((x, index) => (
                                  <option key={index} value={x._id}>
                                    {x.location}
                                  </option>))}
                              </select>
                              <div className="icon-wrapper">
                                <img src="/assets/img/drop-down.png" />
                              </div>
                            </div>

                            <div className="form-group-icon form-group-icon-select form-custom-date form-group">
                              <DatePicker
                                selected={this.state.appointmentDate}
                                onChange={(ev) => this.changeValueDate(ev)}
                                placeholderText="Choose Date"
                                className="form-control"
                                minDate={new Date()}
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                              />
                              <div className="icon-wrapper">
                                <img src="/assets/img/calendar.png" />
                              </div>
                            </div>
                            <div className="form-group-icon form-group-icon-select form-group">
                              <select onChange={(ev) => this.changeValue(ev)} value={this.state.time} name="time" className="form-control">
                                <option value="" disabled>
                                  Select Time
                              </option>
                                {this.state.timeArray.map((x, index) => (
                                  <option key={index} value={x.val}>
                                    {x.text}
                                  </option>))}
                              </select>
                              <div className="icon-wrapper">
                                <img src="/assets/img/drop-down.png" />
                              </div>
                            </div>
                            <div className="form-group-icon form-group-icon-select form-group">
                              <select onChange={(ev) => this.changeValue(ev)} value={this.state.duration} name="duration" className="form-control">
                                <option value="" disabled>
                                  Select Duration
                              </option>
                                {this.state.durationArray.map((x, index) => (
                                  <option key={index} value={x.val}>
                                    {x.text}
                                  </option>))}
                              </select>
                              <div className="icon-wrapper">
                                <img src="/assets/img/drop-down.png" />
                              </div>
                            </div>
                            <div className="pb-3 pb-md-4">
                              <button className="btn full-width-btn blue-btn curve-btn-own">
                                Available Appointments
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

        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <div className="modal-body">
            <div className="text-center modal-heading-own font-500 text-center">Available Appointments</div>
            <div className="table-responsive appointment-table color-white">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th />
                    <th>Date</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Doctor</th>
                    <th>Office</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>

                  {this.state.availableList && this.state.availableList.length > 0 && this.state.availableList.map(res => (
                    <tr>
                      <td><img src="/assets/img/clock.png" /></td>
                      <td>{this.state.updatedDate}</td>
                      <td>{this.state.updatedTime}</td>
                      <td>{this.state.duration} Min</td>
                      <td>{res.firstName} {res.lastName}</td>
                      <td>{res.location.location}</td>
                      <td className="text-center"><button className="btn btn-outline-own" onClick={() => this.confirmBooking(res._id)}>Confirm</button></td>
                    </tr>
                  ))}



                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      </div>

    )
  }

}

export default withRouter(PatientAppointment);