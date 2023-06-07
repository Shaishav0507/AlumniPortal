import React, { Component } from 'react';
import Login from './login'
import Signup from './signup';
import ChangePasswordForm from './changePasswordForm';
import { Link } from 'react-router-dom';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        console.log('render')
        return (
            <div>
                <div className="bg-top">
                    <div className="own-container-md">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-2 logo">
                                    <Link to='/dashboard'>
                                        {/* <img src="/assets/img/logo.png" /> */}
                                    </Link>

                                </div>
                                <div className="col-sm-8 text-center pt-1">
                                    <h3 className="main-heading pt-1">Hi, {this.props.userName}</h3>
                                    <div className="normal-txt pb-3 color-blue-two">{this.props.userDesignation}</div>
                                    <div className="own-txt own-close-txt color-blue-three">Let’s stay connected with this Portal, even if you had moved forward we are still have many things to explore.</div>
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
                                        <div className="heading-forgot">
                                            <span className="py-3">Change Password</span>
                                        </div>
                                        <div className="form-wrapper">
                                            <ChangePasswordForm />
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

export default ChangePassword;