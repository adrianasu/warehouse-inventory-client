import React from 'react';
import {connect} from 'react-redux';

import { hideModal }  from '../actions/modal';
import Modal from './modal';
import SignupForm from './sign-up-form';

export class SignUpModal extends React.Component{
    onClose(){
        this.props.hideModal();
    }
    
    render(){
  
        return (
            <Modal onClose={this.onClose.bind(this)}>
                <div className="log-in">
                    <h2>Sign Up</h2>
                    <SignupForm />
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

const mapDispatchToProps = {
    hideModal: () => hideModal()
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal);

