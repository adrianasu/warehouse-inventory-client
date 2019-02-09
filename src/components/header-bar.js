import React from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withRouter } from 'react-router-dom';

import Hamburguer from './hamburguer';
import HeaderOptions from './header-options';
import { accessLevelToString } from '../utils/utils';
import { underlineOption } from '../actions/underline-option';
import { landing } from  '../actions/landing';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import '../css/header-bar.css';
import logo from '../images/logo.png';


export class HeaderBar extends React.Component { 

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
        let user = this.props.user;

        return (
            <header>
                <nav className="nav-container">
                    <div className="logo tooltip" onClick={ () => this.logOut() }>
                        <span className="tooltiptext">Start</span>
                        <img src={logo} alt="Hammer and screwdriver and warehouse word" className="logo" />
                    </div>
                    <div className="nav-toggle-button">
                        <Hamburguer click={this.props.drawerOpenClickHandler} />
                    </div>
                    <div className="site-nav">
                        <HeaderOptions 
                        // Let HeaderOptions know that it
                        // won't be displayed on SideDrawer.
                        // It'll be displayed on HeaderBar.
                        fromSideDrawer={ false }/>
                    </div>
                </nav>
                {/* If user is logged in, display his name and access level */}
                <div className='user-info'>
                { !this.props.loggedIn ? null :
                    <p><FontAwesomeIcon icon="user-circle" /> {user.employee.firstName} {user.employee.lastName } 
                    <span className="tooltip"><FontAwesomeIcon icon="star" />{ accessLevelToString(user.accessLevel) }
                    <span className="tooltiptext">User access level</span></span>
                    </p>}
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    user: state.auth.currentUser
});

const mapDispatchToProps = ({
    landing,
    clearAuth,
    underlineOption
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderBar));