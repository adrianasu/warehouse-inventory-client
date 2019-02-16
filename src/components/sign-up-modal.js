import React from 'react';
import {connect} from 'react-redux';

import { fetchOptions } from '../actions/fetch-options';
import { getExamples } from '../utils/utils';
import { hideModal }  from '../actions/modal';
import lightbulb from '../images/lightbulb.png';
import Loader from './loader';
import Modal from './modal';
import SignupForm from './sign-up-form';
import '../css/sign-up.css';

export class SignUpModal extends React.Component{
    onClose(){
        this.props.hideModal();
    }

    componentDidMount() {
    // Fetch options to display examples in demo.
    if (!this.props.options) {
        return this.props.fetchOptions()   
    }
    }

   

    examples(){
        // Get ids of employees with no user account
        let idsWithNoAccount = this.props.options.idsWithNoAccount;
        let ids = getExamples( idsWithNoAccount, 'id' );
        return <p>Employee IDs: { ids.join(", ") }</p>;
    }
    
    render(){
      
        return (
            <Modal onClose={this.onClose.bind(this)}>
                <div className="sign-up">
                    <h1 className="tooltip">Sign Up
                    <span className="tooltiptext">
                        { this.props.options ? this.examples() : <Loader /> }
                    </span>
                    <img src={ lightbulb } alt="Lightbulb icon" className="icon"/>
                </h1>
                    <SignupForm />
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    options: state.options.options,
})
const mapDispatchToProps = {
    fetchOptions,
    hideModal,
};

export default connect( mapStateToProps, mapDispatchToProps )(SignUpModal);

