import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import DoctorLogin from './login';
import DoctorSignup from './doctorSignUp';
import DoctorSignUpStepTwo from './doctorSignUpstepTwo';
import DoctorForgotPassword from './doctorForgotPassword';
import DoctorResetPassowrd from './resetPassword';
import DoctorDashboard from './dashboard'
// import PatientSignup from './signup.jsx';

const DoctorRouter = (props) => {
    return (
   <Switch>
      <Route exact path={`${props.match.path}/login`} component={DoctorLogin}/>
      <Route exact path={`${props.match.path}/signup`} component={DoctorSignup}/>
      <Route exact path={`${props.match.path}/signup-step-two`} component={DoctorSignUpStepTwo}/>
      <Route exact path={`${props.match.path}/dashboard`} component={DoctorDashboard}/>
      {/* <Route exact path={`${props.match.path}/appointment`} component={PatientAppointment}/> */}
      <Route exact path={`${props.match.path}/forgot-password`} component={DoctorForgotPassword}/>
      <Route exact path={`${props.match.path}/reset-password/:token`} component={DoctorResetPassowrd}/>
    </Switch>
   
  )}

  export default DoctorRouter