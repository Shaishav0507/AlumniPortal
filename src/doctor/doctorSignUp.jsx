import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { globalLoader } from '../actions/commonActions';
import { withRouter } from 'react-router-dom';
import { validEmail } from '../_shared/commonFunction';
import { signUpStepOne } from './doctorApiActions';


class DoctorSignup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            validEmail: false,
            emptyEmail: false,
            emptyPassword: false,
            notMatchedPassword: false,
            emptyConfirmPassword: false,
            minLengthPassword: false,
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


    doctorSignupStepOne = (ev) => {
        ev.preventDefault();
        this.formValidation().then((value) => {
            if (value) {
                globalLoader(true)
                let obj = {
                    email: this.state.email,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword,
                    role: 2,
                }
                this.setState({
                    email: '',
                    password: '',
                    confirmPassword: '',
                })

                signUpStepOne(obj).then((response) => {
                    console.log(response);

                    if (response.data.status == "200") {
                        let userToken = response.data.data.userToken;
                        let userId = response.data.data.userInfo._id;

                        localStorage.setItem("userToken", userToken);
                        localStorage.setItem('userId', userId);

                        this.props.history.push('/doctor/signup-step-two')
                    }

                    else {
                        globalLoader(false)
                        alert(response.data.message)
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
            validEmail: false,
            emptyEmail: false,
            emptyPassword: false,
            notMatchedPassword: false,
            emptyConfirmPassword: false,
            minLengthPassword: false,
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
                                            <div className="col-md-7 col-12 bg-wrapper" style={{ backgroundImage: 'url(/assets/img/multiple-doctor.jpg)' }}>
                                            </div>
                                            <div className="col-md-5 col-12 bg-white right-side-form">
                                                <div className="px-0 px-md-2">
                                                    <div className="form-heading link-color">
                                                        Doctor Sign Up
                                                    </div>
                                                    <form className="form-own" onSubmit={(ev) => this.doctorSignupStepOne(ev)}>
                                                        <div className="form-group-icon form-group">
                                                            <input type="text" onChange={(ev) => this.changeValue(ev)} value={this.state.email} name="email" placeholder="Email" className="form-control" />
                                                            <div className="icon-wrapper">
                                                                <img src="/assets/img/mail.png" />
                                                            </div>
                                                            <div className="error-wrapper">
                                                                {this.state.emptyEmail ? <span >Email is empty</span> : null}
                                                                {this.state.validEmail ? <span >Email is in invalid format</span> : null}
                                                            </div>
                                                        </div>
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
                                                                Confirm
                                                            </button>
                                                        </div>
                                                        <div className="pb-3 pb-md-4 pb-lg-5">
                                                            <span>Already Member?<span className="link-color cursor"> <Link to="/doctor/login"> Sign In</Link></span></span>
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

export default withRouter(DoctorSignup)