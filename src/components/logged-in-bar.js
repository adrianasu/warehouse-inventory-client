import React from 'react';
import { connect } from 'react-redux';
import { withRouter }  from 'react-router-dom';

import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import OverviewLinks from './overview-links';
import { PUBLIC_ACCESS_LEVEL } from '../utils/list-content';
import PublicAdminLinks from './public-admin-links';
import { underlineOption } from '../actions/underline-option';
import { landing } from  '../actions/landing';

export class LoggedInBar extends React.Component{
         closeOrUnderline() {
             // If click comes from side drawer, close it.
             if (this.props.fromSideDrawer) {
                 this.props.closeSideDrawer();
                 // If click comes from header-bar, underline
                 // selected option.
             } else {
                 this.props.underlineOption(null);
             }
         }

        logOut() {
            this.closeOrUnderline();
            this.props.history.push('/landing');
            this.props.landing(true)
            this.props.clearAuth();
            clearAuthToken();
        }
        
        render() {
            let barLinks;
            if( this.props.hasAccessLevel &&
                this.props.hasAccessLevel >= PUBLIC_ACCESS_LEVEL ){
                    barLinks = <PublicAdminLinks fromSideDrawer={ this.props.fromSideDrawer }/> 
            } else{
                barLinks = <OverviewLinks fromSideDrawer={ this.props.fromSideDrawer }/>
            }
            return(
            <React.Fragment>
                {barLinks}
                <li>
                    <button 
                        value="log-out"
                        onClick={ () => this.logOut() }> Log Out </button>
                </li> 
            </React.Fragment>
         )
    }
}

const mapStateToProps = state => ({
    activeOption: state.underline.activeOption,    
    hasAccessLevel: state.auth.currentUser.accessLevel,
})

const mapDispatchToProps = ({
    landing,
    clearAuth,
    underlineOption
})

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( LoggedInBar ));