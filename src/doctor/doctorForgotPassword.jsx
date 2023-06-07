import React, { Component } from 'react';
import { globalLoader } from '../actions/commonActions';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { validEmail } from '../_shared/commonFunction';
import { globalAlert } from '../actions/commonActions';
import { forgotPasswordApi } from './doctorApiActions';


class DoctorForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emptyEmail: false,
      validEmail: false,
    }
  }

  componentDidMount = () => {
    globalLoader(false)
  }

  inputChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    })
  }

  forgotPassword = (ev) => {
    ev.preventDefault();
    this.formValidation().then((value) => {
      if (value) {
        let obj = {
          email: this.state.email,
        }
        this.setState({
          email: '',
        })
        forgotPasswordApi(obj).then((response) => {
          console.log(response);


          if (response.data.status === 200) {
            globalAlert('success', response.data.message)
          }
        })
          .catch((error) => {

            globalAlert('error', error.data.message)
            globalLoader(false)
          });
      }
    })
  }
  formValidation = async () => {
    let formValidation = true;
    this.setState({
      validEmail: false,
      emptyEmail: false,
    })


    if (!this.state.email) {
      formValidation = false;
      this.setState({
        emptyEmail: true,
      })
    }
    else {
      let res = await validEmail(this.state.email);
      if (!res) {
        formValidation = false;
        this.setState({
          validEmail: true,
        })
      }

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
                      <div className="col-md-7 col-12 bg-wrapper" style={{ backgroundImage: 'url(/assets/img/doctor-4.jpg)' }}>
                      </div>
                      <div className="col-md-5 col-12 bg-white right-side-form">
                        <div className="px-0 px-md-2">
                          <div className="form-heading link-color">
                            Doctor Forgot Password
                          </div>
                          <form className="form-own" onSubmit={(ev) => this.forgotPassword(ev)}>
                            <div className="form-group-icon form-group">
                              <input type="text" name="email" value={this.state.email} onChange={(ev) => this.inputChange(ev)} placeholder="Email" className="form-control" />
                              <div className="icon-wrapper">
                                <img src="/assets/img/mail.png" />
                              </div>
                              <div className="error-wrapper">
                                {this.state.emptyEmail ? <span >Email is empty</span> : null}
                                {this.state.validEmail ? <span >Email is in invalid format</span> : null}
                              </div>
                            </div>

                            <div className="pb-3 pb-md-4">
                              <button className="btn full-width-btn blue-btn curve-btn-own">
                                Send
                              </button>
                            </div>
                            <div className="pb-3 pb-md-4 pb-lg-5">
                              <span>Don’t have an account?<span className="link-color"> <Link to="/doctor/signup"> Sign Up</Link> </span></span>

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

export default DoctorForgotPassword