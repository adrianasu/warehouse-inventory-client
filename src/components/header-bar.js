import React from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withRouter } from 'react-router-dom';

import Hamburguer from './hamburguer';
import HeaderOptions from './header-options';
import { accessLevelToString } from '../utils/utils';
import '../css/header-bar.css';


export class HeaderBar extends React.Component { 
    
    render() { 
        let user = this.props.user;

        return (
            <header>
                <nav className="nav-container">
                    <div className="nav-toggle-button">
                        <Hamburguer click={this.props.drawerOpenClickHandler} />
                    </div>
                    <div className="logo">
                        <h1>Warehouse</h1>
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

export default withRouter(connect(mapStateToProps)(HeaderBar));