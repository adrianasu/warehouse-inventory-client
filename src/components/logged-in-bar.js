import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

import ItemsManagement from './items-management';

class LoggedInBar extends React.Component{

        logOut() {
            this.props.dispatch(clearAuth());
            clearAuthToken();
        }

    render() {
         return(
            <React.Fragment>
                <Link to='/my-account'/>
                <button onClick={ () => this.logOut() }> Log Out </button>
                { this.props.hasAccessLevel ? <ItemsManagement /> : <span></span>}
            </React.Fragment>
         )
    }
}

export default connect()(LoggedInBar);