import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { globalLoader } from '../actions/commonActions';
import { signUpStepTwo } from './doctorApiActions';
import { withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
import {locationList} from '../actions/commonActions'


class DoctorSignUpStepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      dob: null,
      phone: '',
      emptyFisrtName: false,
      emptyLastName: false,
      emptyDob: false,
      emptyPhone: false,
      location:'',
      locationListArray : [],

    }
  }

  componentDidMount = () => {
    // if (!localStorage.token) {
    //   this.props.history.push('/')
    // }
    locationList().then(res=>{
      let arrayList = [];
      arrayList = res.data.data.locations;
      this.setState({
        locationListArray : arrayList,
      })
    })

    globalLoader(false)
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
      dob: date
    });
  }

  doctorSignupStepTwo = (ev) => {
    ev.preventDefault();
    this.formValidation().then((value) => {
      if (value) {
        globalLoader(true)
        let obj = {
          userToken: localStorage.getItem('userToken'),
          userId: localStorage.getItem('userId'),
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          birthDate: this.state.dob,
          contactNumber: this.state.phone,
          location:this.state.location,
        }
        this.setState({
          firstName: '',
          lastName: '',
          dob: null,
          phone: '',
          location:'1',
        })

        signUpStepTwo(obj).then((response) => {
          console.log(response);

          if (response.data.status == "200") {
            localStorage.setItem('userType', 'doctor')
            this.props.history.push('/doctor/dashboard')
          }
          else if (response.data.status == "204") {
            globalLoader(false)
            alert('something went wrong')
          }
        })
          .catch((error) => {
            globalLoader(false)
            console.log(error);
          });
      }
    })
  }

  formValidation = async () => {
    this.setState({
      emptyFisrtName: false,
      emptyLastName: false,
      emptyDob: false,
      emptyPhone: false,
    })
    let formValidation = true;

    if (!this.state.firstName) {
      formValidation = false;
      this.setState({
        emptyFisrtName: true,
      })
    }


    if (!this.state.lastName) {
      formValidation = false;
      this.setState({
        emptyLastName: true,
      })
    }
    if (!this.state.dob) {
      formValidation = false;
      this.setState({
        emptyDob: true,
      })

    }
    if (!this.state.phone) {
      formValidation = false;
      this.setState({
        emptyPhone: true,
      })
    }

    return formValidation
  }

  render() {
    return (
      <div className="bg-full py-3">
        <div className="container-fluid">
          <div className="row px-3">
            <div className="container page-wrapper ">
              <div className="row">
                <div className="col-12 px-0">
                  {/* start content container */}
                  <div className="container-fluid h-100">
                    <div className="row h-100">
                      <div className="col-12 text-center pb-4 registration-logo-wrapper">
                        <Link to="/"><img src="/assets/img/logo-white.png" className="img-fluid" /></Link>
                      </div>
                      <div className="col-md-7 col-12 bg-wrapper" style={{ backgroundImage: 'url(/assets/img/General-Physician-Doctors.jpg)' }}>
                      </div>
                      <div className="col-md-5 col-12 bg-white right-side-form">
                        <div className="px-0 px-md-2">
                          <div className="form-heading link-color">
                            Doctor Sign Up
                          </div>
                          <form className="form-own" onSubmit={(ev) => this.doctorSignupStepTwo(ev)}>
                            <div className="form-group-icon form-group">
                              <input type="text" onChange={(ev) => this.changeValue(ev)} value={this.state.firstName} name="firstName" placeholder="First Name" className="form-control" />
                              <div className="icon-wrapper">
                                <img src="/assets/img/user.png" />
                              </div>
                              <div className="error-wrapper">
                                {this.state.emptyFisrtName ? <span >First Name is empty</span> : null}

                              </div>
                            </div>
                            <div className="form-group-icon form-group">
                              <input type="text" onChange={(ev) => this.changeValue(ev)} value={this.state.lastName} name="lastName" placeholder="Last Name" className="form-control" />
                              <div className="icon-wrapper">
                                <img src="/assets/img/user.png" />
                              </div>
                              <div className="error-wrapper">
                                {this.state.emptyLastName ? <span >Last Name is empty</span> : null}

                              </div>
                            </div>
                            <div className="form-group-icon form-custom-date form-group">
                              <DatePicker
                                selected={this.state.dob}
                                onChange={(ev) => this.changeValueDate(ev)}
                                placeholderText="Date of Birth"
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
                                {this.state.emptyDob ? <span >Date of birth is empty</span> : null}

                              </div>
                            </div>
                            <div className="form-group-icon form-group">
                              <input type="tel" onChange={(ev) => this.changeValue(ev)} value={this.state.phone} name="phone" placeholder="Phone" className="form-control" />
                              <div className="icon-wrapper">
                                <img src="/assets/img/phone.png" />
                              </div>
                              <div className="error-wrapper">
                                {this.state.emptyPhone ? <span >Phone number is empty</span> : null}

                              </div>
                            </div>
                            <div className="form-group-icon form-group">
                              <select onChange={(ev) => this.changeValue(ev)} value={this.state.location} name="location" placeholder="Last Name" className="form-control">
                              <option value="" disabled>
                                    Select Location
                              </option>
                              {this.state.locationListArray.map((x, index)=>(
                              <option key={index} value={x._id}>
                                    {x.location}
                              </option>))}

                              </select>
                              {/* <input type="text" onChange={(ev) => this.changeValue(ev)} value={this.state.lastName} name="lastName" placeholder="Last Name" className="form-control" /> */}
                            
                              <div className="error-wrapper">
                                {this.state.emptyLastName ? <span >Last Name is empty</span> : null}

                              </div>
                            </div>
                            <div className="pb-3 pb-md-4">
                              <button className="btn full-width-btn blue-btn curve-btn-own">
                                Confirm
                              </button>
                            </div>
                            <div className="pb-3 pb-md-4 pb-lg-5">
                              <span>Already Member?<span className="link-color cursor"> <Link to="/patient/login"> Sign In</Link></span></span>
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
      </div>
    )
  }

}

export default withRouter(DoctorSignUpStepTwo); 