import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { globalLoader } from '../actions/commonActions';
import { logOut } from '../_shared/commonFunction';
import {dashBoard,removeAppointmentData} from './doctorApiActions';
import {TIME} from '../actionsTypes/types';


class DoctorDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upcomingData: [],
            pastData: [],
        }
    }

    componentDidMount = () => {
        if (localStorage.userType === "doctor" && localStorage.userId && localStorage.userToken) {
            globalLoader(false);
            this.dashBoardListData()
        }

        

        

        else {
            this.props.history.push('/doctor/login')
        }

    }
    
    dashBoardListData = () => {
        let userId = localStorage.getItem('userId');
        let userTokene = localStorage.getItem('userToken');
        let obj = {
            userToken: userTokene,
            userId: userId
        }

        dashBoard(obj).then(response => {
            console.log(response)
            let that = this;
            let localUpcomingData = [];
            let localPastData = [];
            response.data.data.appointments.forEach(res => {
                if (res.status == 1) {
                    localUpcomingData.push(res)
                }
                else if (res.status == 2) {
                    localPastData.push(res);
                }
            });
            that.setState({
                upcomingData: localUpcomingData,
                pastData: localPastData,
            })
        })
    }

    removeAppointment = (id, attendance) => {
        let userId = localStorage.getItem('userId');
        let userTokene = localStorage.getItem('userToken');
        let obj = {
            userToken: userTokene,
            userId: userId,
            appointmentId: id,
            status: 3,
            attendance: attendance
        }
        removeAppointmentData(obj).then(res => {
            this.dashBoardListData();
        })

    }
    logOut = () => {
        logOut(this);
    }

    render() {

        return (
            <div>
                <header className="home-header d-flex flex-wrap p-3 align-items-center">

                    <div className="logo-wrapper-home">
                        <Link to='/'>
                            <img src="/assets/img/logo-blue.png" />
                        </Link>
                    </div>
                    <ul className="ml-auto list-unstyled menu-wrapper">
                        {/* <li>
                            <Link to='/doctor/login'>
                                <img src="/assets/img/doctor.png" />
                                <span>My Account</span>
                            </Link>
                        </li> */}
                        <li onClick={() => this.logOut()}>
                            <span className="link-color cursor">
                                <img src="/assets/img/patients.png" />
                                <span>Logout</span>
                            </span>
                        </li>

                    </ul>

                </header>
                <section className="min-height-less-header text-light bg-own-blue">
                    <div className="container-fluid pt-3">
                        <div className="row">

                            <h3 className="col-12 pt-3">Doctor Dashboard</h3>

                            <div className="col-12 pb-4">

                                <h5 className="pt-2 pb-2">Upcoming Appointment</h5>

                                <div className="data-table">
                                    <table className="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Appointment Type
                                        </th>
                                                <th>
                                                    Date and Time
                                        </th>
                                                <th>
                                                    Patient
                                        </th>
                                                <th>
                                                    Location
                                        </th>
                                                <th>Cancel Appointment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.upcomingData.length > 0 && this.state.upcomingData.map(data => {
                                                   let newTime = TIME.find(x => x.val == data.time);
                                                let newLocalDate = new Date(data.date)

                                                let localYear = newLocalDate.getFullYear();
                                                let localMonth = newLocalDate.getMonth();
                                                localMonth = localMonth + 1;
                                                let localDay = newLocalDate.getDate();
                                                let localFullDate = `${localDay}/${localMonth}/${localYear}`;
                                                // let localFullDate= 20;
                                                return <tr>
                                                    <td>
                                                        {data.type.name}
                                                    </td>
                                                    <td>
                                                        {localFullDate} {newTime.text}
                                                    </td>
                                                    <td>
                                                        {data.userId.firstName} {data.userId.lastName}
                                                    </td>
                                                    <td>
                                                        {data.location.location}
                                                    </td>
                                                    <td><span className="cursor" onClick={() => this.removeAppointment(data._id, data.attendance)}>Cancel Appointment</span></td>
                                                </tr>
                                            })}
                                        </tbody>

                                    </table>
                                </div>
                            </div>

                            <div className="col-12">

                                <h5 className="pt-2 pb-2">Past Appointment</h5>

                                <div className="data-table">
                                    <table className="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Appointment Type
                                                </th>
                                                <th>
                                                    Date and Time
                                                </th>
                                                <th>
                                                Patient
                                                 </th>
                                                <th>Attended</th>
                                                <th>
                                                    Location
                                                </th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.pastData.length > 0 && this.state.pastData.map(data => {
                                                   let newTime = TIME.find(x => x.val == data.time);
                                                let newLocalDate = new Date(data.date)

                                                let localYear = newLocalDate.getFullYear();
                                                let localMonth = newLocalDate.getMonth();
                                                localMonth = localMonth + 1;
                                                let localDay = newLocalDate.getDate();
                                                let localFullDate = `${localDay}/${localMonth}/${localYear}`;
                                                // let localFullDate= 20;
                                                return <tr>
                                                    <td>
                                                        {data.type.name}
                                                    </td>
                                                    <td>
                                                        {localFullDate} {newTime.text}
                                                    </td>
                                                    <td>
                                                        {data.docUserId.firstName} {data.docUserId.lastName}
                                                    </td>
                                                    <td>
                                                        {data.attendance?"Yes":"No"}
                                                    </td>
                                                    <td>
                                                        {data.location.location}
                                                    </td>
                                                    <td><span className="cursor" onClick={() => this.removeAppointment(data._id, data.attendance)}>Delete Appointment</span></td>
                                                </tr>
                                            })}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }


}

export default withRouter(DoctorDashboard);