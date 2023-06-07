import React, { Component } from 'react';
import Header from '../_common/header';
import DashboardTxt from './dashboardTxt';
import HomeDetails from './homeDetails';
import FeedbackModal from '../_common/feedbackModal';


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentForm: 'home',
            openFeedback: false,
        }
    }
    changeTab = (val) => {
        this.setState((prevState) => {
            if (prevState.currentForm === val) {
                return null
            }
            else {
                return {
                    currentForm: val
                }
            }
        })
    }

    toggleFeedbackState = () => {
        // this.setState({
        //     openFeedback: false
        // })
        this.setState(prevState=>{
            return{
                openFeedback:!prevState.openFeedback,
            }
        })
    }

    render() {
        return (<div className="top-Wrapper">
            <FeedbackModal open={this.state.openFeedback} closeFeedback={this.toggleFeedbackState} />
            <Header openFeedback={this.toggleFeedbackState}/>
            <DashboardTxt userName="Amit" userDesignation="UX Designer" />

            {/* tab section */}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="dashboard-tab-wrapper">
                            <div className="tab-wrapper">
                                <ul className="own-tab list-unstyled font-poppins">
                                    <li >
                                        <span className={`tab-text cursor ${this.state.currentForm === "home" ? 'active' : null}`} onClick={() => this.changeTab('home')}>Home</span>
                                    </li>
                                    <li >
                                        <span className={`tab-text cursor ${this.state.currentForm === "retrial" ? 'active' : null}`} onClick={() => this.changeTab('retrial')}>
                                            Retiral Forms
                                            </span>
                                    </li>
                                    <li >
                                        <span className={`tab-text cursor ${this.state.currentForm === "refer" ? 'active' : null}`} onClick={() => this.changeTab('refer')}>
                                            Refer a Friend
                                            </span>
                                    </li>
                                    <li >
                                        <span className={`tab-text cursor ${this.state.currentForm === "help" ? 'active' : null}`} onClick={() => this.changeTab('help')}>
                                            Help & Directory
                                            </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* details section */}
            <HomeDetails />
        </div>)
    }

}

export default Dashboard;