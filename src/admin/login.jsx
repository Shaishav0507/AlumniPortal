import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logIn } from "./adminApiActions";
import { globalLoader, globalAlert } from "../actions/commonActions";
import { withRouter } from "react-router-dom";
import { validEmail } from "../_shared/commonFunction";
import TextField from "@material-ui/core/TextField";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      validEmail: false,
      emptyEmail: false,
      emptyPassword: false,
      currentForm: "login",
    };
  }
  componentWillMount = () => {
    if (
      localStorage.userType === "admin" &&
      localStorage.userId &&
      localStorage.userToken
    ) {
      this.props.history.push("/admin/dashboard");
    }
  };
  componentDidMount = () => {
    globalLoader(false);
  };

  changeValue = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;
    this.setState({
      [name]: value,
    });
  };

  AdminLogin = (ev) => {
    ev.preventDefault();
    this.formValidation().then((value) => {
      if (value) {
        globalLoader(true);
        let obj = {
          email: this.state.email,
          password: this.state.password,
        };
        this.setState({
          email: "",
          password: "",
        });
        logIn(obj)
          .then((response) => {
            console.log(response);

            if (response.data.status === 200) {
              globalAlert("success", response.data.message);
              let userToken = response.data.data.userToken;
              let userId = response.data.data.userInfo._id;

              localStorage.setItem("userToken", userToken);
              localStorage.setItem("userId", userId);

              if (response.data.data.userInfo.status === 0) {
                localStorage.setItem("userType", "admin");
                // this.props.history.push("/admin/signup-step-two");
              } else {
                localStorage.setItem("userType", "admin");
                this.props.history.push("/admin/dashboard");
              }
            } else {
              globalLoader(false);
              globalAlert("error", response.data.message);
            }
          })
          .catch((error) => {
            globalAlert("error", "error.data.message");
            globalLoader(false);
          });
      }
    });
  };

  formValidation = async () => {
    this.setState({
      validEmail: false,
      emptyEmail: false,
      emptyPassword: false,
    });
    let formValidation = true;

    if (!this.state.email) {
      formValidation = false;
      this.setState({
        emptyEmail: true,
      });
    } else {
      let res = await validEmail(this.state.email);
      if (!res) {
        formValidation = false;
        this.setState({
          validEmail: true,
        });
      }
    }

    if (!this.state.password) {
      formValidation = false;
      this.setState({
        emptyPassword: true,
      });
    }
    return formValidation;
  };

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
                  <h3 className="main-heading pt-1 text-uppercase">
                    Alumni Portal
                  </h3>
                  <h4 className="second-heading">Stay Connected</h4>
                  <div className="own-txt color-blue-three">
                    Let's stay connected with Alumni Portal
                  </div>
                </div>
              </div>
            </div>

            <div></div>
          </div>
        </div>
        <div className="bg-bottom">
          <div className="own-container-md">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="white-box-wrapper negative-mar-top">
                    <div className="tab-wrapper">
                      <h2 className="form-heading- text-center pb-3">Admin</h2>
                      <ul className="own-tab list-unstyled">
                        <li>
                          <span
                            className={`tab-text cursor ${
                              this.state.currentForm === "login"
                                ? "active"
                                : null
                            }`}
                          >
                            Login
                          </span>
                        </li>
                        <li>
                          <Link to="/admin/signup">
                            <span
                              className={`tab-text cursor ${
                                this.state.currentForm === "signup"
                                  ? "active"
                                  : null
                              }`}
                            >
                              New Member
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="form-wrapper">
                      <div>
                        <form
                          className="form-own"
                          noValidate
                          autoComplete="off"
                          onSubmit={(ev) => this.userLogin(ev)}
                        >
                          <div className="form-group-icon position-relative form-group pb-1">
                            <TextField
                              id="outlined-textarea"
                              label="Email ID"
                              placeholder="Email ID"
                              className="mt-0 mb-0 d-flex"
                              margin="normal"
                              variant="outlined"
                              name="userId"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.userId}
                            />
                            <div className="form-img-wrapper no-pointer">
                              <img
                                src="/assets/img/lock-arrow.png"
                                alt="lock"
                              />
                            </div>
                            <div className="error-wrapper">
                              {this.state.emptyuserId ? (
                                <span>Email is empty</span>
                              ) : null}
                            </div>
                          </div>
                          <div className="form-group-icon form-group">
                            <TextField
                              type={
                                this.state.passwordVisible ? "text" : "password"
                              }
                              id="outlined-password-input"
                              label="Password"
                              placeholder="Password"
                              className="mt-0 mb-0 d-flex"
                              margin="normal"
                              variant="outlined"
                              name="password"
                              onChange={(ev) => this.changeValue(ev)}
                              value={this.state.password}
                            />
                            <div
                              className="form-img-wrapper cursor"
                              onClick={() => this.toggleEye("passwordVisible")}
                            >
                              {this.state.passwordVisible ? (
                                <img
                                  src="/assets/img/eye-close.png"
                                  alt="lock"
                                />
                              ) : (
                                <img src="/assets/img/eye.png" alt="lock" />
                              )}
                            </div>
                            <div className="error-wrapper">
                              {this.state.emptyPassword ? (
                                <span>Password is empty</span>
                              ) : null}
                            </div>
                          </div>
                          <div className="text-center forgot-wrapper pb-3 font-bold">
                            <Link
                              to={"/forgot-password"}
                              className="link-blue-color"
                            >
                              Forgot Password?
                            </Link>
                          </div>

                          <div className="pb-3 px-3 btn-wrapper">
                            <button
                              type="submit"
                              className="btn btn-own btn-block btn-own-primary min-height-btn"
                            >
                              LOGIN
                            </button>
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
    );
  }
}

export default withRouter(AdminLogin);
