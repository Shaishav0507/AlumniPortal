import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { globalLoader, globalAlert } from '../actions/commonActions';
import { withRouter } from 'react-router-dom';
import {validEmail} from '../_shared/commonFunction';
import {logIn} from './doctorApiActions';

class DoctorLogin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      validEmail: false,
      emptyEmail: false,
      emptyPassword: false,
      
    }
  }
  componentWillMount = () => {
    if (localStorage.userType === "doctor" && localStorage.userId && localStorage.userToken) {
      this.props.history.push('/doctor/dashboard')

    }
  }
  componentDidMount = () => {
    globalLoader(false)
  }


  changeValue = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;
    this.setState({
      [name]: value,
    })
  }


  doctorLogin = (ev) => {
    ev.preventDefault();
    this.formValidation().then((value) => {
     
      if (value) {
        globalLoader(true)
        let obj = {
          email: this.state.email,
          password: this.state.password,
        }
        this.setState({
          email: '',
          password: '',
        })
        logIn(obj).then((response) => {
          console.log(response);

          if (response.data.status === 200) {
            globalAlert('success', response.data.message)
            let userToken = response.data.data.userToken;
            let userId = response.data.data.userInfo._id;

            localStorage.setItem("userToken", userToken);
            localStorage.setItem('userId', userId);
           
            if (response.data.data.userInfo.status === 0) {
              this.props.history.push('/doctor/signup-step-two')
            }
            else {
              localStorage.setItem('userType', 'doctor')
              this.props.history.push('/doctor/dashboard')
            }
          }
          else {
            globalLoader(false)
            globalAlert('error',response.data.message)
          }
        })
          .catch((error) => {
            
            globalAlert('error',"error.data.message")
            globalLoader(false)
          });
      }
    })
  }

  formValidation = async () => {
    this.setState({
      validEmail: false,
      emptyEmail: false,
      emptyPassword: false,
    })
    let formValidation = true;

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

    if (!this.state.password) {
      formValidation = false;
      this.setState({
        emptyPassword: true,
      })
    }
    return formValidation
  }
    render(){
        return(
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
                        <Link to="/"><img alt="img" src="/assets/img/logo-white.png" className="img-fluid " /></Link>
                      </div>
                      <div className="col-md-7 col-12 bg-wrapper" style={{backgroundImage: 'url(/assets/img/doctor-female.jpg)'}}>
                      </div>
                      <div className="col-md-5 col-12 bg-white right-side-form">
                        <div className="px-0 px-md-2">
                          <div className="form-heading link-color">
                          Doctor Login
                          </div>
                          <form className="form-own" onSubmit={(ev) => this.doctorLogin(ev)}>
                            <div className="form-group-icon form-group">
                              <input type="text" onChange={(ev) => this.changeValue(ev)} name="email" value={this.state.email} placeholder="Email" className="form-control" />
                              <div className="icon-wrapper">
                                <img alt="img" src="/assets/img/mail.png" />
                              </div>

                              <div className="error-wrapper">
                                {this.state.emptyEmail ? <span >Email is empty</span> : null}
                                {this.state.validEmail ? <span >Email is in invalid format</span> : null}
                              </div>
                            </div>
                            <div className="form-group-icon form-group">
                              <input type="password" onChange={(ev) => this.changeValue(ev)} name="password" value={this.state.password} placeholder="Password" className="form-control" />
                              <div className="icon-wrapper">
                                <img alt="img" src="/assets/img/lock.png" />
                              </div>
                              <div className="error-wrapper">
                                {this.state.emptyPassword ? <span >Password is empty</span> : null}

                              </div>
                            </div>
                            {/* <div className="link-color pb-3 pb-md-4 forgot-pswrd-txt">
                            <Link to="/doctor/forgot-password"> Forgot Password?</Link> 
                            </div> */}
                            <div className="pb-3 pb-md-4">
                              <button className="btn full-width-btn blue-btn curve-btn-own">
                                Login
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

export default withRouter(DoctorLogin)