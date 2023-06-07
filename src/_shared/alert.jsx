import React, { Component } from 'react';
import { connect } from 'react-redux';
import { globalAlertRemove } from '../actions/commonActions';

class AlertComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            count:0,
        }
    }

    update = () => {
        // let stateCount=this.state.count;
        // stateCount = stateCount+1;
        // this.setState({
        // count:stateCount
        // })
        
        setTimeout(() => {
            globalAlertRemove()
        }, 3000)
    }
    render() {
        
        const { alertArray } = this.props;
        return (
            <React.Fragment>
                {alertArray && alertArray.length > 0 ?
                    <div className="alert-box-wrapper">

                        <ul >

                            {alertArray.map((x, index) => (

                                <li key={index} className={x.alertType == "success" ? "alert-list success list-unstyled" : "alert-list error list-unstyled"}>
                                    {this.update()}
                                    {x.alertMessage}
                                </li>

                            ))}
                        </ul>
                    </div> : null}
            </React.Fragment>
        )
    }

}

const mapStateProps = state => ({
    alertArray: state.common.alertArray,
    alertArrayLength:state.common.alertArrayLength,

})

export default connect(mapStateProps)(AlertComponent)