import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminLogin from './login.jsx';
import AdminSignup from './signUp.jsx';
import AdminDashboard from './dashboard';
import create_job from './create_job.jsx';
import add_user from './add_user.jsx';
import activate_user from './activate_user.jsx';
import add_user_step_two from './add_user_step_two.jsx';
import deactivate_user from './deactivate_user.jsx';
import edit_user from './edit_user.jsx';
import edit_user_details from './edit_user_details.jsx';
import file_uplaod from './file_uplaod.jsx';
// import AdminAppointment from './appointment';
// import ForgotPassword from './forgotPassword';
// import ResetPassowrd from './resetPassword';


const AdminRouter = (props) =>

  (
    <Switch>
      <Route exact path={`${props.match.path}/login`} component={AdminLogin} />
      <Route exact path={`${props.match.path}/signup`} component={AdminSignup} />
      <Route exact path={`${props.match.path}/upload`} component={file_uplaod} />
      <Route exact path={`${props.match.path}/dashboard`} component={AdminDashboard} />
      <Route exact path={`${props.match.path}/create-job`} component={create_job} />
      <Route exact path={`${props.match.path}/add-user`} component={add_user} />
      <Route exact path={`${props.match.path}/edit-user`} component={edit_user} />
      <Route exact path={`${props.match.path}/edit-user-details`} component={edit_user_details} />
      <Route exact path={`${props.match.path}/add-user-step-two`} component={add_user_step_two} />
      <Route exact path={`${props.match.path}/activate-user`} component={activate_user} />
      <Route exact path={`${props.match.path}/deactivate-user`} component={deactivate_user} />
      {/* left */}
      <Route exact path={`${props.match.path}/job-list`} component={create_job} />
      {/* <Route exact path={`${props.match.path}/appointment`} component={AdminAppointment} />
      <Route exact path={`${props.match.path}/forgot-password`} component={ForgotPassword} />
      <Route exact path={`${props.match.path}/reset-password/:token`} component={ResetPassowrd} /> */}
    </Switch>

  )

export default AdminRouter