import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

class ForgotForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: "",
            email: "",
            emptyuserid: false,
            emptyemail: false,
        }
        this.formValidationVal = false;
    }

    userForgotForm = (ev) => {
        ev.preventDefault();
        this.formValidation().then((value) => {

            if (value) {

                let obj = {
                    userid: this.state.userid,
                    email: this.state.email
                }
                this.setState({
                    userid: '',
                    email: ''
                })
            }
        })
    }

    userForgotPassword = (ev) => {
        ev.preventDefault();
        console.log(this)
        this.formValidation().then((value) => {

            if (value) {

                let obj = {
                    userid: this.state.userid,
                    email: this.state.email
                }
                this.setState({
                    userid: '',
                    email: ''
                })
            }
        })
    }
   

    formValidation = async () => {
        this.setState({
            emptyuserid: false,
            emptyemail: false

        })
        

        if (!this.state.userid) {
            this.formValidationVal = false;
            this.setState({
                emptyuserid: true,
            })
        }

        if (!this.state.email) {
            this.formValidationVal = false;
            this.setState({
                emptyemail: true,
            })
        }

        return this.formValidationVal
    }

    
    handleuserid = (e) => {
        this.setState({
            userid: e.target.value
        })
    }

    handleemail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    render() {
        return (
            <div className="d-flex justify-content-center pb-3">
                <form className="form-own-forgot form-own" noValidate autoComplete="off" onSubmit={(ev) => this.userForgotPassword(ev)}>
                    <div className="container">
                        <div className="row">
                            <div className="form-group-icon position-relative form-group pb-3 col-sm-6">
                                <TextField
                                    id="outlined-textarea"
                                    label="User ID"
                                    placeholder="User ID"
                                    className='mt-0 mb-0 d-flex'
                                    margin="normal"
                                    variant="outlined"
                                    name="text"
                                    onChange={this.handleuserid}
                                    value={this.state.userid}
                                />
                                <div className="error-wrapper">
                                    {this.state.emptyuserid ? <span>Please enter User id</span> : null}
                                </div>
                            </div>
                            <div className="form-group-icon position-relative form-group pb-3 col-sm-6">
                                <TextField
                                    id="outlined-textarea"
                                    label="Email"
                                    placeholder="Enter the Email"
                                    className='mt-0 mb-0 d-flex'
                                    margin="normal"
                                    variant="outlined"
                                    name="email"
                                    onChange={this.handleemail}
                                    value={this.state.email}
                                />
                                <div className="error-wrapper">
                                    {this.state.emptyemail ? <span>Please enter correct Email</span> : null}
                                </div>
                            </div>
                        </div>

                        
                        <div className="row">

                            <div className="col-sm-3 d-flex justify-content-start align-items-center">
                                <Link to='/'>
                                    <span className="get-question">Get Question</span>
                                </Link>

                            </div>

                            <div className="col-sm-6 px-3 btn-wrapper d-flex justify-content-center">
                                <button type="submit" className="d-flex justify-content-center col-sm-6 btn btn-block btn-block-own btn-own-primary">PROCEED</button>
                            </div>
                        </div>



                    </div>
                </form>

            </div>
        )
    }
}

export default ForgotForm;