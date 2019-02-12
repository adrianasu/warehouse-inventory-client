import React from 'react';
import { connect } from 'react-redux';
import { withRouter }  from 'react-router-dom';

import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import { landing } from  '../actions/landing';
import OverviewLinks from './overview-links';
import { PUBLIC_ACCESS_LEVEL } from '../utils/list-content';
import PublicAdminLinks from './public-admin-links';
import { underlineOption } from '../actions/underline-option';
import signOutIcon from '../images/sign-out.png';

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
            this.props.history.push('/start');
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
                <li className="tooltip">
                    <button 
                        value="log-out"
                        onClick={ () => this.logOut() }>
                        <span className="tooltiptext">Log Out</span>
                        <img src={ signOutIcon } alt="sign out icon" className="header-icon"/>
                        { this.props.fromSideDrawer ? ' Log Out' : ''}
                    </button>
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