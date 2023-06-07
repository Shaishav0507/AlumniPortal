import React,{Component} from 'react';
import Router from './router.jsx';
import {withRouter} from 'react-router-dom';
import Loader from './_shared/loader';
import AlertComponent from './_shared/alert'
import RouteChanged from './_shared/historyChange';
import "react-datepicker/dist/react-datepicker.css";


class App extends Component {

    render() {
       return (
           <React.Fragment>
            <RouteChanged/>
           <Loader/>
           <AlertComponent/>
           <Router/>
           </React.Fragment>
        );
    }
  }
  export default withRouter(App);
