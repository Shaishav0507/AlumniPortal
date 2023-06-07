import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {

    openFeedback =()=>{
        this.props.openFeedback()
    }

    render() {
        return (<div className="header-container">
            <header className="own-header-wrapper">
                <div className="container">
                    <div className="row">


                        <div className="own-header d-flex flex-wrap col-12 justify-content-between">
                            <div className="logo-wrapper">
                                <Link to={'/dashboard'}>
                                    {/* <img src="/assets/img/logo.png" className="mw-100" alt="logo" /> */}
                                </Link>
                            </div>

                            <div className="menu-list-wrapper flex-1 text-right">
                                <ul className="list-inline header-menu-list font-poppins">
                                    <li className="list-inline-item">
                                        <Link to={'/change-password'}><span className="menu-list-txt">Change Password</span></Link>
                                    </li>
                                    {/* <li className="list-inline-item">
                                        <Link to={'/profile'}><span className="menu-list-txt">My Profile</span></Link>
                                    </li> */}
                                    <li className="logout cursor list-inline-item" onClick={this.openFeedback}>
                                        <span className="menu-list-txt">Logout</span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </header>
        </div>)
    }
}

export default withRouter(Header)