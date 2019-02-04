import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { login } from '../actions/auth';
import { welcome } from '../actions/welcome';

class LandingPage extends React.Component{
    // Set welcome state to hide header-bar
    componentDidMount(){
        this.props.welcome(true)
    }

    doNotLogIn(){
        this.props.history.push("/search")
         // Change state to display header-bar
        return this.props.welcome(false)
    }

    doLogIn( email, password){
         return this.props.login(email, password)
             .then(() => {
                 this.props.history.push("/search")
                 // Change state to display header-bar
                 return this.props.welcome(false)
             })
    }
    // User will be automatically signed in 
    // when clicking on an access level option,
    // except when "basic" level is selected
    handleClick(e){
        let email = e.target.value;
        let password = `${email}123`;
        email === "null" ? this.doNotLogIn()
                        : this.doLogIn( email, password);       
    }

    render(){
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

                Youll find lightbulbs with info to do testing
                <FontAwesomeIcon icon="lightbulb" className="space orange"/>
            </p>
            <p>Try our app</p>
            <button onClick={this.handleClick.bind(this)} value="null">Basic</button>
            <button onClick={this.handleClick.bind(this)} value="overview@m.com">Overview</button>
            <button onClick={this.handleClick.bind(this)} value="public@m.com">Public</button>
            <button onClick={this.handleClick.bind(this)} value="admin@m.com">Admin</button>            
        </div>
    )
    }
}

const mapDispatchToProps = ({
    login: login,
    welcome: welcome,
})

export default connect(null, mapDispatchToProps)(LandingPage);