import React, { Component } from 'react';
import Login from './login'
import Signup from './signup';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentForm: 'login',
        }
    }

    componentDidMount = ()=>{
        if(localStorage.getItem('userId')){
            this.props.history.push('/dashboard')
        }
    }

    changeTab = (val) => {
        this.setState((prevState) => {
            if (prevState.currentForm === val) {
                return null
            }
            else {
                return {
                    currentForm: val
                }
            }
        })
    }


    render() {
        return (
            <div className="top-Wrapper">
                <div className="bg-top">
                    <div className="own-container-md">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-3 logo">
                                
                                <Link to="admin/login"><button type="submit" className="btn btn-own btn-block btn-own-danger min-height-btn">ADMIN</button></Link>
                                    
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
                                        <div className="tab-wrapper">
                                            <ul className="own-tab list-unstyled">
                                                <li >
                                                    <span className={`tab-text cursor ${this.state.currentForm === "login" ? 'active' : null}`} onClick={() => this.changeTab('login')}>Login</span>
                                                </li>
                                                <li >
                                                    <span className={`tab-text cursor ${this.state.currentForm === "signup" ? 'active' : null}`} onClick={() => this.changeTab('signup')}>
                                                        New Member
                                                </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="form-wrapper">
                                            {this.state.currentForm==="login"?
                                            <Login />:
                                            <div><Signup changeTab={this.changeTab}/></div>}
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

export default withRouter(Auth)