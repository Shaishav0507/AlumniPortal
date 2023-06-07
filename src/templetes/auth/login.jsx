import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import {logIn} from './_actions/authActions';
import {withRouter} from 'react-router-dom';
import {globalLoader, globalAlert} from '../../actions/commonActions';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            userId: '',
            emptyuserId: false,
            emptyPassword: false,
            passwordVisible:false,
        }
    }
    toggleEye = (val)=>{
        this.setState(prevState=>{
            
            return{
                [val]:!prevState[val]
            }
        })
    }
    changeValue = (ev) => {
        let name = ev.target.name;
        let value = ev.target.value;
        this.setState({
            [name]: value,
        })
    }

    userLogin = (ev) => {
        ev.preventDefault();
        this.formValidation().then((value) => {
    
          if (value) {
            globalLoader(true)
            // var cipherPassword = encryptString(this.state.password);
            var cipherPassword = this.state.password;

            let obj = {
              userId: this.state.userId,
              password: cipherPassword,
            }
            this.setState({
              userId: '',
              password: '',
            })

            logIn(obj).then(data=>{
                if(data.data.status===200){                
                localStorage.setItem('userId',data.data.data.userInfo._id);
                localStorage.setItem('userToken',data.data.data.userToken);
                this.props.history.push('/dashboard');
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
            emptyuserId: false,
            emptyPassword: false,
        })
        let formValidation = true;

        if (!this.state.userId) {
            formValidation = false;
            this.setState({
                emptyuserId: true,
            })
        }

        if (!this.state.password) {
            formValidation = false;
            this.setState({
                emptyPassword: true,
            })
        }
        return formValidation
    }


    render() {
        return (
            <div>
                <form className="form-own" noValidate autoComplete="off" onSubmit={(ev) => this.userLogin(ev)}>
                    <div className="form-group-icon position-relative form-group pb-1">
                        <TextField
                            id="outlined-textarea"
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
                            {this.state.emptyuserId ? <span >UserId is empty</span> : null}
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
                    <div className="text-center forgot-wrapper pb-3 font-bold">
                        <Link to={'/forgot-password'} className="link-blue-color">Forgot Password?</Link>
                        </div>

                    <div className="pb-3 px-3 btn-wrapper">
                        <button type="submit" className="btn btn-own btn-block btn-own-primary min-height-btn">LOGIN</button>
                    </div>
                </form>

            </div>
        )
    }

}

export default withRouter(Login);

