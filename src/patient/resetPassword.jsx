import React, { Component } from 'react';
import { globalLoader, globalAlert } from '../actions/commonActions';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { checkResetTokenApi, resetPasswordApi } from './apiActions';

class ResetPassowrd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      emptyPassword: false,
      notMatchedPassword: false,
      emptyConfirmPassword: false,
      minLengthPassword: false,
      resetToken: null,
    }
  }

  componentWillMount = () => {
    let pathName = window.location.pathname;;
    let pathToken = pathName.split('/');
    pathToken = pathToken[3];
    this.setState({
      resetToken: pathToken,
    })
    let obj = {
      token: pathToken,
    }
    checkResetTokenApi(obj).then(res => {
      console.log(res);
      if (res.data.status != 200) {
        globalAlert('error', res.data.message)
      }
      globalLoader(false)


    }).catch((error) => {

      console.log(error);
      globalLoader(false)
    });
  }
  componentDidMount = () => {
  }
  changeValue = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    })
  }

  resetPassowrdForm = (ev) => {
    ev.preventDefault();
    this.formValidation().then(res => {
      if (res) {
        globalLoader(true)
        let obj = {
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          token: this.state.resetToken,
        }
        this.setState({
          email: '',
          password: '',
          token: null,
        })

        resetPasswordApi(obj).then((response) => {
          console.log(response);

          if (response.data.status == "200") {
            globalAlert('success', response.data.message)

            this.props.history.push('/patient/login')
          }

          else {
            globalLoader(false)
            globalAlert('error', response.data.message)
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
      emptyPassword: false,
      notMatchedPassword: false,
      emptyConfirmPassword: false,
      minLengthPassword: false,
    })
    let formValidation = true;

    if (!this.state.password) {
      formValidation = false;
      this.setState({
        emptyPassword: true,
      })
    }
    else if (this.state.password.length < 6) {
      formValidation = false;
      this.setState({
        minLengthPassword: true,
      })
    }
    if (!this.state.confirmPassword) {
      formValidation = false;
      this.setState({
        emptyConfirmPassword: true,
      })
    }
    else if (this.state.confirmPassword != this.state.password) {
      formValidation = false;
      this.setState({
        notMatchedPassword: true,
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
                      <div className="col-md-7 col-12 bg-wrapper" style={{ backgroundImage: 'url(/assets/img/img-1.png)' }}>
                      </div>
                      <div className="col-md-5 col-12 bg-white right-side-form">
                        <div className="px-0 px-md-2">
                          <div className="form-heading link-color">
                            Reset Password
                          </div>
                          <form className="form-own" onSubmit={(ev) => this.resetPassowrdForm(ev)}>
                            <div className="form-group-icon form-group">
                              <input type="password" onChange={(ev) => this.changeValue(ev)} value={this.state.password} name="password" maxLength="12" placeholder="Password" className="form-control" />
                              <div className="icon-wrapper">
                                <img src="/assets/img/lock.png" />
                              </div>
                              <div className="error-wrapper">
                                {this.state.emptyPassword ? <span >Password is empty</span> : null}
                                {this.state.minLengthPassword ? <span >Password must be minimum 6</span> : null}

                              </div>
                            </div>
                            <div className="form-group-icon form-group">
                              <input type="password" name="confirmPassword" onChange={(ev) => this.changeValue(ev)} maxLength="12" value={this.state.confirmPassword} placeholder="Confirm Password" className="form-control" />
                              <div className="icon-wrapper">
                                <img src="/assets/img/lock.png" />
                              </div>
                              <div className="error-wrapper">
                                {this.state.emptyConfirmPassword ? <span >Confirm Password is empty</span> : null}
                                {this.state.notMatchedPassword ? <span >Password not matched</span> : null}
                              </div>
                            </div>

                            <div className="pb-3 pb-md-4">
                              <button className="btn full-width-btn blue-btn curve-btn-own">
                                Reset
                              </button>
                            </div>
                            <div className="pb-3 pb-md-4 pb-lg-5">
                              <span>Don’t have an account?<span className="link-color"> Sign Up </span></span>
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

export default ResetPassowrd