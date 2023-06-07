import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Link, withRouter } from 'react-router-dom';
import {changePassword} from './_actions/authActions';
import {globalAlert, globalLoader} from '../../actions/commonActions'


class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            confirmNewPassword: '',
            newPassword: '',
            emptyOldPassword: false,
            emptyNewPassword: false,
            emptyNewConfirmPassword: false,
            passwordVisible:false,
            confirmPasswordVisible:false,
            newPasswordVisible:false,
            matchPassword: true,
        }
    }

    changeValue = (ev) => {
        let name = ev.target.name;
        let value = ev.target.value;
        this.setState({
            [name]: value,
        })
    }

    userChangePassword = (ev) => {
        ev.preventDefault();
        this.formValidation().then((value) => {

            if (value) {
                globalLoader(true)
                var cipherPassword = this.state.newPassword;

                let obj = {
                    oldPassword: this.state.oldPassword,
                    newPassword: cipherPassword,
                    confirmNewPassword: this.state.confirmNewPassword,
                    token:localStorage.getItem('userToken'),
                    userId:localStorage.getItem('userId')
                }
                this.setState({
                    oldPassword: '',
                    newPassword: '',
                    confirmNewPassword: '',
                })
                changePassword(obj).then(data=>{
                    if(data.data.status===200){
                        globalLoader(false)
                        globalAlert('success', data.data.message);
                        this.props.history.push('/dashboard')
                    }
                    
                    else{
                        globalLoader(false)
                        globalAlert('error', data.data.message);
                    }

                })
                .catch(err=>{
                    console.log(err)
                })
            }
        })
    }

    formValidation = async () => {
        this.setState({
            emptyOldPassword: false,
            emptyNewPassword: false,
            emptyNewConfirmPassword: false,
            matchPassword: false
        })
        let formValidation = true;

        if (!this.state.oldPassword) {
            formValidation = false;
            this.setState({
                emptyOldPassword: true,
            })
        }
        if (!this.state.newPassword) {
            formValidation = false;
            this.setState({
                emptyNewPassword: true,
            })
        }
        if (!this.state.confirmNewPassword) {
            formValidation = false;
            this.setState({
                emptyNewConfirmPassword: true,
            })
        }
        if(this.state.newPassword != this.state.confirmNewPassword){
            formValidation = false;
            this.setState({
                matchPassword: true,                
            })
        }
        return formValidation
    }
    toggleEye = (val)=>{
        this.setState(prevState=>{
            
            return{
                [val]:!prevState[val]
            }
        })
    }

    render() {
        return (
            <div>
                <form className="form-own" noValidate autoComplete="off" onSubmit={(ev) => this.userChangePassword(ev)}>
                    <div className="form-group-icon position-relative form-group pb-1">
                        <TextField
                            type={this.state.passwordVisible?"text":"password"}
                            id="outlined-textarea"
                            label="Old Password"
                            placeholder="Old Password"
                            className='mt-0 mb-0 d-flex'
                            margin="normal"
                            variant="outlined"
                            name="oldPassword"
                            onChange={(ev) => this.changeValue(ev)}
                            value={this.state.oldPassword}
                        />
                        <div className="form-img-wrapper cursor" onClick={()=>this.toggleEye('passwordVisible')}>
                            {this.state.passwordVisible?<img src="/assets/img/eye-close.png" alt="lock" />:<img src="/assets/img/eye.png" alt="lock" />} 
                        </div>
                        <div className="error-wrapper">
                            {this.state.emptyOldPassword ? <span >Please enter old password</span> : null}
                        </div>
                    </div>
                    <div className="form-group-icon form-group">
                        <TextField
                            type={this.state.newPasswordVisible?"text":"password"}
                            id="outlined-password-input"
                            label="New Password"
                            placeholder="New Password"
                            className='mt-0 mb-0 d-flex'
                            margin="normal"
                            variant="outlined"
                            name="newPassword"
                            onChange={(ev) => this.changeValue(ev)}
                            value={this.state.newPassword}
                        />
                        <div className="form-img-wrapper cursor" onClick={()=>this.toggleEye('newPasswordVisible')}>
                            {this.state.newPasswordVisible?<img src="/assets/img/eye-close.png" alt="lock" />:<img src="/assets/img/eye.png" alt="lock" />} 
                        </div>
                        <div className="error-wrapper">
                            {this.state.emptyNewPassword ? <span>Password is empty</span> : null}
                        </div>
                    </div>
                    <div className="form-group-icon form-group">
                        <TextField
                            type={this.state.confirmPasswordVisible?"text":"password"}
                            id="outlined-password-input-two"
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            className='mt-0 mb-0 d-flex'
                            margin="normal"
                            variant="outlined"
                            name="confirmNewPassword"
                            onChange={(ev) => this.changeValue(ev)}
                            value={this.state.confirmNewPassword}
                        />
                        <div className="form-img-wrapper cursor" onClick={()=>this.toggleEye('confirmPasswordVisible')}>
                            {this.state.confirmPasswordVisible?<img src="/assets/img/eye-close.png" alt="lock" />:<img src="/assets/img/eye.png" alt="lock" />} 
                        </div>
                        <div className="error-wrapper">
                            {this.state.emptyNewConfirmPassword ? <span >Please Confirm New Password</span> : null}
                            {this.state.matchPassword ? null : <span>Password doesn't match</span>}
                        </div>
                    </div>
                    <div className="pb-3 px-3 btn-wrapper">
                        <button type="submit" className="btn btn-own btn-block btn-own-primary min-height-btn">CHANGE PASSWORD</button>
                    </div>
                </form>

            </div>
        )
    }

}

export default withRouter(ChangePasswordForm);

