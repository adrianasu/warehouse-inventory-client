import React from 'react';
import { connect } from 'react-redux';
import { withRouter }  from 'react-router-dom';

import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import { welcome } from  '../actions/welcome';
import { PUBLIC_ACCESS_LEVEL } from '../utils/list-content';


import PublicAdminLinks from './public-admin-links';
import OverviewLinks from './overview-links';

class LoggedInBar extends React.Component{

        logOut() {
            this.props.history.push('/welcome');
            this.props.welcome(true)
            this.props.clearAuth();
            clearAuthToken();
        }
        
        render() {
        
            let barLinks;
            if( this.props.hasAccessLevel &&
                this.props.hasAccessLevel >= PUBLIC_ACCESS_LEVEL ){
                    barLinks = <PublicAdminLinks /> 
            } else{
                barLinks = <OverviewLinks />
            }
            return(
            <React.Fragment>
                {barLinks}
                <button onClick={ () => this.logOut() }> Log Out </button>
                <div>
                    <p>User: FirstName LastName <span>Level#</span>@LoggedInBar</p>
                </div>
            </React.Fragment>
         )
    }
}


const mapStateToProps = state => ({
    hasAccessLevel: state.auth.currentUser.accessLevel
})

const mapDispatchToProps = ({
    welcome,
    clearAuth,
})

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( LoggedInBar ));