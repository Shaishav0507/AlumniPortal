import React from 'react';
import {Switch, Route } from 'react-router-dom';
import ForgotPassword from './templetes/auth/forgotpass';
import Auth from './templetes/auth/auth';
import PrivateRoute from './templetes/_common/protected';
import Protected from './templetes/_common/allROuter'
import AdminRouter from './admin/adminRouter';

const Router = () =>  {
  return (
   
    <Switch>
      <Route exact path='/' component={Auth}/>
      <Route path='/admin' component={AdminRouter}/>
      <Route path='/forgot-password' component={ForgotPassword}/>
      <PrivateRoute path="/" component={Protected} />

    </Switch>
  )
  }
  export default Router