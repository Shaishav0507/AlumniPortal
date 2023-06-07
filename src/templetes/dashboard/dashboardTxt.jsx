import React from 'react';

class DashboardTxt extends React.PureComponent {

    render() {

        return (
            <div className="dashboard-txt-wrapper">
                <div className="conatiner-fluid own-container-sm">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h3 className="main-heading pt-1">Hi, {this.props.userName}</h3>
                            <div className="normal-txt pb-3 color-blue-two">{this.props.userDesignation}</div>
                            <div className="own-txt own-close-txt color-blue-three">Let’s stay connected with this Portal, even if you had moved forward we are still have many things to explore.</div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}
export default DashboardTxt;