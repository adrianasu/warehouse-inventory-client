import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';

import LoggedInBar from './logged-in-bar';
import LoggedOutBar from './logged-out-bar';
import { underlineOption } from '../actions/underline-option';


export class HeaderOptions extends React.Component{

    closeOrUnderline(option) {
        // If click comes from side drawer, close it.
        if (this.props.fromSideDrawer) {
            this.props.closeSideDrawer();
            // If click comes from header-bar, underline
            // selected option.
        } else {
            this.props.underlineOption(option);
        }
    }

    handleClick(e) { 

        this.closeOrUnderline(e.target.value);         
        this.props.history.push(`/${e.target.value}`)
    }

    goHome(){
        this.closeOrUnderline('home');
        this.props.history.push(`/home`)
    }

     goToSearch() {
         this.closeOrUnderline('search');
         this.props.history.push(`/search`)
     }

    render(){
     
        return(
            <ul>
                <li className="tooltip">
                    <button 
                        className={this.props.activeOption === "home" ? "show-active" : null}
                        onClick={this.goHome.bind(this) }>
                    <span className="tooltiptext">Home</span>
                        <FontAwesomeIcon 
                            icon='home'
                            className="header-icon" />
                        {
                            this.props.fromSideDrawer ? '  Home' : ''
                        }
                    </button>
                </li> 
                <li className="tooltip">
                    <button 
                        className={this.props.activeOption === "search" ? "show-active" : null}
                        onClick={this.goToSearch.bind(this) }>
                        <span className="tooltiptext">Search</span>
                        <FontAwesomeIcon 
                            icon='search'
                            className="header-icon" />
                            { this.props.fromSideDrawer ? '  Search' : ''}
                    </button>
                </li>
                <li>
                    <button 
                        value="advanced-search" 
                        className={this.props.activeOption === "advanced-search" ? "show-active" : null}
                        onClick={this.handleClick.bind(this) }>
                        Advanced Search
                    </button>
                </li>
                { this.props.loggedIn ? <LoggedInBar fromSideDrawer={ this.props.fromSideDrawer } closeSideDrawer={this.props.closeSideDrawer}/> 
                        : <LoggedOutBar fromSideDrawer={ this.props.fromSideDrawer } closeSideDrawer={this.props.closeSideDrawer}/> }
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    activeOption: state.underline.activeOption
});

const mapDispatchToProps =({
    underlineOption
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderOptions));