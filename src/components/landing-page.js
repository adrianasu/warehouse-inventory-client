import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

import { Redirect } from 'react-router-dom';
//import SearchItem from './search-item';

function LandingPage(props){

    function handleClick(e){
        let user = e.target.value;
        let password = `${user}123`;
        return props.dispatch(login(user, password))
        .then(() => {
            console.log("hey", props.history);
            return <Redirect to="/search"/>;
        })
    }
   
    return (
        <div className="home">
            <h2>Welcome!</h2>
            <p>This app will make it easy to track all assets
                in your warehouse(s). Our system provides information
                about the location inside your warehouse.....
                It also allows you to check in and check out
                tools, equipment and consumables to
                employees.
                MORE...
            </p>
            <p>Try our app</p>
            <button onClick={handleClick} value="basic">Basic</button>
            <button onClick={handleClick} value="overview">Overview</button>
            <button onClick={handleClick} value="public">Public</button>
            <button onClick={handleClick} value="admin">Admin</button>            
        </div>
    )
}

export default connect()(LandingPage);