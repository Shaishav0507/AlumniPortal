import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
       let isAuthenticated=false;
        if(localStorage.getItem('userId')){
            isAuthenticated = true;
        }
    return (
      <Route
        {...rest}
        render={props =>
            isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;