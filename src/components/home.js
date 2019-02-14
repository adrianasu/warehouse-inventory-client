import React from 'react';
import { connect } from 'react-redux';

import { accessLevelToString } from '../utils/utils';
import { getUserPermissions } from '../utils/permissions-list';
import { landing } from '../actions/landing';
import '../css/home.css';
import checkIcon from '../images/check.png';

export class Home extends React.Component{

    displayPermissions( accessLevel ){
        let permissions = getUserPermissions(accessLevel);
        return permissions.map( 
            (perm, key) => 
                <li key={ key }>
                    <img src={ checkIcon } alt="check icon" className="home-icon"/>
                    { perm }
                </li>)
    }

    levelMessage(){
        let accessLevel = this.props.isloggedIn ?
            accessLevelToString(this.props.user.accessLevel)
            : 'Basic';
   
        return(
            <React.Fragment>
                <h2>
                    Your access level is { accessLevel }
                </h2>
                <div className="permissions">
                    <p> 
                        You'll be able to:
                    </p>
                    <ul>
                        { this.displayPermissions(accessLevel) }
                    </ul>
                </div>
            </React.Fragment>
        )
    }
    
    componentDidMount(){
        this.props.landing(false);
    }

    render(){
        return(
            <div className="home">
                <h1>Welcome{ this.props.isloggedIn ?
                    ` ${this.props.user.employee.firstName}!` : "!"    
                }</h1>
                { this.levelMessage() }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isloggedIn: state.auth.currentUser !== null,
    user: state.auth.currentUser
});

const mapDispatchToProps = ({
    landing,
})

export default connect( mapStateToProps, mapDispatchToProps )( Home );