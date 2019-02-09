import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { login } from '../actions/auth';
import { landing } from '../actions/landing';
import { underlineOption } from '../actions/underline-option';
import '../css/landing-page.css';
import scanner from '../images/scanner.jpg';
import tools from '../images/tools.jpg';
import girl from '../images/girl-scanning.jpg';
import lab from '../images/lab-equipment.jpg';
import logo from '../images/logo.png';

export class LandingPage extends React.Component{
    // Set landing state to hide header-bar
    componentDidMount(){
        this.props.landing(true)
    }

    goToHome(){
        this.props.history.push("/home");
        this.props.underlineOption("home");
         // Change state to display header-bar
        return this.props.landing(false)
    }

    doLogIn( email, password){
         return this.props.login(email, password)
             .then(() => {
                 return this.goToHome();
             })
    }
    // User will be automatically signed in 
    // when clicking on an access level option,
    // except when "basic" level is selected
    handleClick(e){
        let email = e.target.value;
        let password = `${email}123`;
        email === "null" ? this.goToHome()
                        : this.doLogIn( email, password);       
    }

    render(){
    return (
    <div className="landing-page">
        <div className="logo-bar">
                <img src={logo} alt="Hammer and screwdriver and warehouse word" className="logo" />
        </div>
        <div  className="landing-grid">
            <div className="intro land-container">
                <h3>Track & Manage</h3>
                <div className="grid-container">
                    <p>
                        If you have items, tools or equipment of any kind
                        and need to track and manage them, our app will
                        help you do that in an easy way.
                    </p>
                    <img src={ scanner } alt="Scanner and boxes cartoon" className="scanner"/>
                </div>
            </div>
            <div className="locate land-container">
                <h3>Locate</h3>
                <img src={ tools } alt="Four hands holding tools cartoon" className="tools"/>
                <p>
                    Our app will provide you information about the location
                    of your assets inside your warehouse or about the person 
                    who currently has it. 
                </p>
            </div>
            <div className="reorder land-container">
                <h3>Reorder</h3>
                <img src={ lab } alt="Laboratory eqquipment cartoon" className="lab"/>
                <p>In the case of consummables, you can set minimum required 
                    quantities for each item so you will be able to know when is
                    time to reorder.
                </p>  
            </div>
            <div className="benefits land-container">            
                <h3>Benefits</h3>
                <div className="grid-container">                
                    <ul>
                        <li>
                            Decrease tool and equipment loss.
                        </li>
                        <li>
                            Increase productivity by ensuring people have what they need.
                        </li>
                        <li>
                            Increase efficiency by having all the information at your fingertips.
                        </li>
                    </ul>
                    <div className="frame">
                        <img src={ girl } alt="Lady scanning barcode on a box cartoon" className="girl"/>
                    </div>
                </div>
            </div>
            <div className="try land-container">
                <h3>Try our app</h3>
                <FontAwesomeIcon icon="lightbulb" className="icon orange"/>
                <p>
                    You'll find lightbulbs along our demo. Click on them to get
                    examples that can be entered to get information from
                    our demo database.
                </p>
                <h4>Select a user level</h4>
                <div className="levels-container">
                    <button onClick={this.handleClick.bind(this)} value="admin@m.com">Admin</button>            
                    <button onClick={this.handleClick.bind(this)} value="public@m.com">Public</button>
                    <button onClick={this.handleClick.bind(this)} value="overview@m.com">Overview</button>
                    <button onClick={this.handleClick.bind(this)} value="null">Basic</button>
                </div>
            </div>
        </div>
        </div>
    )
    }
}

const mapDispatchToProps = ({
    landing,
    login,
    underlineOption
})

export default connect(null, mapDispatchToProps)(LandingPage);