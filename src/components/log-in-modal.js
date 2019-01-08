import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { hideModal }  from '../actions/modal';
import LoginForm from './log-in-form';
import Modal from './modal';


export class LogInModal extends React.Component{
    onClose(){
        this.props.hideModal();
    }


    render(){
       
        return(
            <Modal onClose={this.onClose.bind(this)}> 
                <div className="log-in">
                    <h1>Log In</h1>
                    <LoginForm />
                </div>
            </Modal>
        )
    }

}

const mapDispatchToProps = {
    hideModal: () => hideModal()
};

export default connect( null, mapDispatchToProps ) (LogInModal);
