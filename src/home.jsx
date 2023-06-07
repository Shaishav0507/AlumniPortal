import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {globalLoader} from './actions/commonActions';

class Home extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount=()=>{

        globalLoader(false)
    }

    render(){
        return(
            <section>

                <header className="home-header d-flex flex-wrap p-3 align-items-center">

                <div className="logo-wrapper-home">
                <img src="/assets/img/logo-blue.png"/>
                </div>
                <ul className="ml-auto list-unstyled menu-wrapper">
                <li>
                <Link to ='/doctor/login'>
                    <img src="/assets/img/doctor.png"/>
                    <span>Doctor Login</span>
                    </Link>
                </li>
                <li>
                <Link to ='/patient/login'>
                    <img src="/assets/img/patients.png"/>
                    <span>Patient Login</span>
                    </Link>
                </li>

                </ul>

                </header>
           <div className="banner-wrapper d-flex flex-wrap align-items-center p-3">
           <div className="banner-txt col-lg-6 col-xl-5 col-md-8 col-12">
           It helps to provide a better healthcare experience, by providing high satisfaction, continuing patient engagement remotely. From anywhere you can make an appointment in your busy schedule. 
           </div>
           
           </div>
            </section>
            
        )
    }

}

export default Home;