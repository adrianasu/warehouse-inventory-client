import React from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { hideModal }  from '../actions/modal';
import { fetchOptions } from '../actions/fetch-options';
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

    getExamples(ids) {
        let examples = [];
        // Get only three examples
        for( let x=0; x< 3; x+=1 ){
            // Pick a random element from array
            let ranElem = Math.floor(Math.random() * ids.length);
            examples.push(ids[ranElem].id);
        }
        return examples.join(", ");
    }

    examples(){
        // Get ids of employees with no user account
        let idsWithNoAccount = this.props.options.idsWithNoAccount;
        return idsWithNoAccount.length === 0 ? 
            <p>No employee IDs available</p>
            : idsWithNoAccount.length <= 3 ?
                 <p>Employee IDs: { idsWithNoAccount.map(item => item.id).join(", ") }</p>
                 : <p>Employee IDs: { this.getExamples(idsWithNoAccount) }</p>;
    }
    
    render(){
      
        return (
            <Modal onClose={this.onClose.bind(this)}>
                <div className="sign-up">
                    <h1 className="tooltip">Sign Up
                    <span className="tooltiptext">
                        { this.props.options ? this.examples() : '...Loading' }
                    </span>
                    <FontAwesomeIcon icon="lightbulb" className="space orange"/>
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

