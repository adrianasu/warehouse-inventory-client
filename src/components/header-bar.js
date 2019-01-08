import React from 'react';
import {connect} from 'react-redux';
import { Redirect, withRouter, Link } from 'react-router-dom';

import LoggedInBar from './logged-in-bar';
import LoggedOutBar from './logged-out-bar';
import { fetchData } from '../actions/fetch-data';


class HeaderBar extends React.Component { 
    constructor(props){
        super(props);
        this.showAll = this.showAll.bind(this);
    }

    showAll(){
        return this.props.fetchData(null, 'searchAll')
        .then(this.props.history.push('/results'))
    }
    render() { 
        return (
            <div className="header-bar">
                <h1>Warehouse App</h1>
                <button onClick={ this.showAll }>All Items</button>
                <Link to='/search'>Basic Search</Link>
                <Link to='/advancedSearch'>Advanced Search</Link>
                { this.props.loggedIn ? <LoggedInBar /> 
                                : <LoggedOutBar /> }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

const mapDispatchToProps =  ({
    fetchData: fetchData
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderBar));