import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import {signUp} from './_actions/authActions';
import {withRouter} from 'react-router-dom';
import {validEmail} from '../../_shared/commonFunction';
import {globalLoader, globalAlert} from '../../actions/commonActions';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: '',
            confirmPassword: '',
            userId: '',
            emptyPassword: false,
            emptyEmail: false,
            emptyConfirmPassword: false,
            emptyUserId: false,
            validEmail: false,
            matchPassword: false,
            passwordVisible:false,
            confirmPasswordVisible:false,
        }
    }

    changeValue = (ev) => {
        let name = ev.target.name;
        let value = ev.target.value;
        this.setState({
            [name]: value,
        })
    }

    toggleEye = (val)=>{
        this.setState(prevState=>{
            
            return{
                [val]:!prevState[val]
            }
        })
    }


    userSignup = (ev) => {
        ev.preventDefault();
        this.formValidation().then((value) => {
    
          if (value) {
            globalLoader(true)
            // var cipherPassword = encryptString(this.state.password);
            var cipherPassword = this.state.password;


            let obj = {
              email: this.state.email,
              password: cipherPassword,
              confirmPassword: this.state.confirmPassword,
              userId: this.state.userId 
            }


            this.setState({
              email: '',
              password: '',
              confirmPassword: '',
              userId:''
            })
            signUp(obj).then(data=>{
                if(data.data.status===200){
                    this.props.changeTab('login');
                    globalAlert('success', data.data.message);
                    globalLoader(false)
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
            validEmail: false,
            emptyEmail: false,
            emptyPassword: false,
            emptyConfirmPassword: false,
            emptyUserId: false,
        })
        let formValidation = true;

        if (!this.state.email) {
            formValidation = false;
            this.setState({
                emptyEmail: true,
            })
        }else {
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

        if(!this.state.confirmPassword){
            formValidation = false;
            this.setState({
                emptyConfirmPassword: true,
            })
        }

        if(this.state.password !== this.state.confirmPassword){
            formValidation = false;
            this.setState({
                matchPassword: true,                
            })
        }

        if (!this.state.userId) {
            formValidation = false;
            this.setState({
                emptyUserId: true,
            })
        }

        if (!this.state.confirmPassword) {
            formValidation = false;
            this.setState({
                emptyConfirmPassword: true,
            })
        }
        return formValidation
    }


    render() {
        return (
            <div>
                <form className="form-own" noValidate autoComplete="off" onSubmit={(ev) => this.userSignup(ev)}>
                    <div className="form-group-icon position-relative form-group pb-1">
                        <TextField
                            type="text"
                            id="outlined-textarea-own"
                            label="User ID"
                            placeholder="User ID"
                            className='mt-0 mb-0 d-flex'
                            margin="normal"
                            variant="outlined"
                            name="userId"
                            onChange={(ev) => this.changeValue(ev)}
                            value={this.state.userId}
                        />
                        <div className="form-img-wrapper no-pointer">
                            <img src="/assets/img/lock-arrow.png" alt="lock"/ >
                        </div>
                        <div className="error-wrapper">
                            {this.state.emptyUserId ? <span >UserId is empty</span> : null}
                        </div>
                    </div>
                    <div className="form-group-icon position-relative form-group pb-1">
                        <TextField
                            id="outlined-textarea"
                            label="Email ID"
                            placeholder="Email ID"
                            className='mt-0 mb-0 d-flex'
                            margin="normal"
                            variant="outlined"
                            name="email"
                            onChange={(ev) => this.changeValue(ev)}
                            value={this.state.email}
                        />
                        <div className="form-img-wrapper no-pointer">
                            <img src="/assets/img/mail.png" alt="lock"/ >
                        </div>
                        <div className="error-wrapper">
                            {this.state.emptyEmail ? <span>Email is empty</span> : null}
                            {this.state.validEmail ? <span>Email is invalid</span> : null}
                        </div>
                    </div>
                    <div className="form-group-icon form-group">
                        <TextField
                            type={this.state.passwordVisible?"text":"password"}
                            id="outlined-password-input"
                            label="Password"
                            placeholder="Password"
                            className='mt-0 mb-0 d-flex'
                            margin="normal"
                            variant="outlined"
                            name="password"
                            onChange={(ev) => this.changeValue(ev)}
                            value={this.state.password}
                        />
                        <div className="form-img-wrapper cursor" onClick={()=>this.toggleEye('passwordVisible')}>
                            {this.state.passwordVisible?<img src="/assets/img/eye-close.png" alt="lock" />:<img src="/assets/img/eye.png" alt="lock" />} 
                        </div>
                        <div className="error-wrapper">
                            {this.state.emptyPassword ? <span >Password is empty</span> : null}
                        </div>
                    </div>
                    <div className="form-group-icon form-group">
                        <TextField
                            type={this.state.confirmPasswordVisible?"text":"password"}
                            id="outlined-confirm-password-input"
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            className='mt-0 mb-0 d-flex'
                            margin="normal"
                            variant="outlined"
                            name="confirmPassword"
                            onChange={(ev) => this.changeValue(ev)}
                            value={this.state.confirmPassword}
                        />
                        <div className="form-img-wrapper cursor" onClick={()=>this.toggleEye('confirmPasswordVisible')}>
                            {this.state.confirmPasswordVisible?<img src="/assets/img/eye-close.png" alt="lock" />:<img src="/assets/img/eye.png" alt="lock" />} 
                        </div>
                        <div className="error-wrapper">
                        {this.state.emptyConfirmPassword ? <span >Confirm password is empty</span> : null}

                        
                            {this.state.matchPassword ? <span>Passwords don't match</span> : null}
                        </div>
                    </div>

                    <div className="pb-3 px-3 btn-wrapper">
                        <button type="submit" className="btn btn-own btn-block btn-own-primary min-height-btn">SIGNUP</button>
                    </div>
                </form>

            </div>
        )
    }

}

export default withRouter(Signup);

