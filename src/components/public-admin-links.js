import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter }  from 'react-router-dom';

function PublicAdminLinks(){
    return(
        <React.Fragment>
            <NavLink to='/check-in'>Check In</NavLink>
            <NavLink to='/check-out'>Check Out</NavLink>
            <NavLink to='/reports'>Reports</NavLink>
            <NavLink to='/accounts'>Accounts</NavLink>
            <NavLink to='/manage'>Manage</NavLink>
        </React.Fragment>
    )
}

export default withRouter(connect()(PublicAdminLinks));