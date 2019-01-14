import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';

import LoggedInBar from './logged-in-bar';
import LoggedOutBar from './logged-out-bar';
import { fetchData } from '../actions/fetch-data';

class HeaderBar extends React.Component { 
    
    render() { 
        return (
            <div className="header-bar">
                <h1>Warehouse App</h1>
                <nav>
                    <React.Fragment>
                        <NavLink to='/search'>Basic Search</NavLink>
                        <NavLink to='/advancedSearch'>Advanced Search</NavLink>
                        
                    </React.Fragment>                
                { this.props.loggedIn ? <LoggedInBar /> 
                                : <LoggedOutBar /> }
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    isWelcome: state.welcome.isWelcome
});

const mapDispatchToProps =  ({
    fetchData: fetchData
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);