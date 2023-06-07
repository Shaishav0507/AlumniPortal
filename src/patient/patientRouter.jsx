import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PatientLogin from './login.jsx';
import PatientSignup from './signup.jsx';
import SignUpStepTwo from './signupStepTwo';
import PatientDashboard from './dashboard';
import PatientAppointment from './appointment';
import ForgotPassword from './forgotPassword';
import ResetPassowrd from './resetPassword';


const PatientRouter = (props) =>

  (
    <Switch>
      <Route exact path={`${props.match.path}/login`} component={PatientLogin} />
      <Route exact path={`${props.match.path}/signup`} component={PatientSignup} />
      <Route exact path={`${props.match.path}/signup-step-two`} component={SignUpStepTwo} />
      <Route exact path={`${props.match.path}/dashboard`} component={PatientDashboard} />
      <Route exact path={`${props.match.path}/appointment`} component={PatientAppointment} />
      <Route exact path={`${props.match.path}/forgot-password`} component={ForgotPassword} />
      <Route exact path={`${props.match.path}/reset-password/:token`} component={ResetPassowrd} />
    </Switch>

  )

export default PatientRouter