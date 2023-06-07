import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../dashboard/dashboard';
import ChangePassword from '../auth/changePassword';

const ProtectedRoute = (props) =>

  (
    <Switch>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/change-password' component={ChangePassword}/>
    </Switch>

  )

export default ProtectedRoute