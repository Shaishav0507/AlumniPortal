import React, { Component } from 'react';
import ForgotForm from './forgotForm';
import { Link } from 'react-router-dom';

class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }




    render() {
        return (
            <div className="top-Wrapper">
                <div className="bg-top">
                    <div className="own-container-md">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-2 logo">
                                    {/* <img src="/assets/img/logo.png" /> */}
                                </div>
                                <div className="col-sm-8 text-center pt-1">
                                    <h3 className="main-heading pt-1 text-uppercase">Alumni Portal</h3>
                                    <h4 className="second-heading">Stay Connected</h4>
                                    <div className="own-txt color-blue-three">Let's stay connected with this Portal</div>
                                </div>
                            </div>
                        </div>

                        <div>

                        </div>
                    </div>
                </div>
                <div className="bg-bottom">
                    <div className="own-container-md">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="white-box-wrapper negative-mar-top">
                                        <div className="d-flex justify-content-around align-items-end">
                                            <Link to='/'>
                                                <div className="d-flex justify-content-center align-items-center back-image">
                                                    <img src="/assets/img/back-arrow.png" />
                                                </div>
                                            </Link>
                                            <div className="heading-forgot">
                                                <span>Forgot Password</span>
                                            </div>
                                            <div></div>
                                        </div>

                                        <div className="form-wrapper form-wrapper-md">
                                            <ForgotForm />
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

export default Forgot;