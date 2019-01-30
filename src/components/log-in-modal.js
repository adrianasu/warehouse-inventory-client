import React from 'react';
import { connect } from 'react-redux';

import { hideModal }  from '../actions/modal';
import LoginForm from './log-in-form';
import Modal from './modal';
import '../css/log-in.css';

export class LogInModal extends React.Component{
    onClose(){
        this.props.hideModal();
    }

    render(){
       
        return(
            <Modal onClose={this.onClose.bind(this)}> 
                    <h1>Log In</h1>
                    <LoginForm />
            </Modal>
        )
    }

}

const mapDispatchToProps = {
    hideModal: () => hideModal()
};

export default connect( null, mapDispatchToProps ) (LogInModal);
