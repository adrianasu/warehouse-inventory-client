import React from 'react';
import { connect } from 'react-redux';

import { showModal } from '../actions/modal';

class LoggedOutBar extends React.Component{

     logIn() {
         this.props.dispatch(showModal('LOG_IN_MODAL'));
     }

     signUp() {
         this.props.dispatch(showModal('SIGN_UP_MODAL'));
     }

    render() {
         return(
            <React.Fragment>
                <button onClick={() => this.logIn()}>Log In</button>
                <button onClick={() => this.signUp()}>Sign Up</button>
            </React.Fragment>
         )
    }
}

export default connect()(LoggedOutBar);