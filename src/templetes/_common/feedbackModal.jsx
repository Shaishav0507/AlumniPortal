import React from 'react';
import Modal from 'react-responsive-modal';
import {feedBackArray} from '../../actionsTypes/types';
import {feedbackAction} from './_commonActions';
import {logOut} from '../../_shared/commonFunction';
import {withRouter} from 'react-router-dom';

class FeedbackModal extends React.PureComponent{

    onCloseModal = () => {
        this.props.closeFeedback()
    }

    feedbackModalData = (val)=>{
        let obj = {
            userId:localStorage.getItem('userId'),
            feedback:val,
        }
        
        feedbackAction(obj);
        logOut(this)
       
    }

    render(){
        return(<Modal closeOnOverlayClick={false} open={this.props.open} classNames={{
            overlay:'feedback-modal-wrapper',
            modal:'own-modal-sm'
        }} onClose={this.onCloseModal} center focusTrapped={false} showCloseIcon={false}>
            <div className="own-modal">
                <div className="modal-close text-right">
                    <span className="cross-icon cursor" onClick={this.onCloseModal}>X</span>
                    </div>
                <div className="feedback-modal-container">
                    <div className="modal-heading pb-3 text-center">
                        Rate Your Experience
                    </div>
                    <ul className="feedback-list pb-3 d-flex flex-wrap justify-content-around text-center list-unstyled">
                        {feedBackArray && feedBackArray.length>0 && feedBackArray.map(data=>(
                            <li onClick={()=>this.feedbackModalData(data.text)} className="cursor" key={data.name}>
                            <div className="img-container pb-1">                                
                                <img src={`/assets/img/${data.img}`} alt="img" className="mw-100" />
                            </div>
                            <div className="feedback-txt pt-1">
                                {data.text}
                            </div>
                        </li>
                        ))}

                    </ul>

                </div>

            </div>
 

        </Modal>)

    }
}

export default withRouter(FeedbackModal); 