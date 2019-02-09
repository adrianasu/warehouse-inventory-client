import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';

import { fetchData } from '../actions/fetch-data';
import { showModal } from '../actions/modal';
import { underlineOption } from '../actions/underline-option';
import { landing } from '../actions/landing';

export class LoggedOutBar extends React.Component{

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

    help() {
        this.closeOrUnderline("Start");
        this.props.history.push('/start');
        this.props.landing(true);
    }
    
    logIn() {
        this.closeOrUnderline(null);
        this.props.showModal('LOG_IN_MODAL');
    }
    
    showAll() {
        this.closeOrUnderline("all-items");
        return this.props.fetchData({
                method: 'GET',
                searchType: 'searchAll',
                searchTerm: 'item'
        })
        .then(() => {
            if (this.props.data.length > 0) {
                this.props.history.push('/results/all-items')
            }
        })
    }
    
    showAvailableItems() {
        this.closeOrUnderline("available-items");
        return this.props.fetchData({
            method: 'GET',
            searchType: 'on-shelf'
        })
        .then(() => {
            if( this.props.data.length > 0){
                this.props.history.push('/results/available-items')
            }
        })
    }
    
    signUp() {
        this.closeOrUnderline(null);
        this.props.showModal('SIGN_UP_MODAL');
    }

    render() {
         return(
            <React.Fragment>
                <li><button 
                    className={this.props.activeOption === "items" ? "show-active" : null}
                    onClick={ this.showAll.bind(this) }
                    >   Items
                </button></li>
                <li><button 
                    className={this.props.activeOption === "available-items" ? "show-active" : null}
                    onClick={ this.showAvailableItems.bind(this) }
                    >Available Items
                </button></li>
                <li className="tooltip">
                    <button 
                    onClick={ this.logIn.bind(this) }>
                    <span className="tooltiptext">Log In</span>
                    <FontAwesomeIcon 
                            icon='sign-in-alt'
                            className="header-icon" />
                    {
                        this.props.fromSideDrawer ? '  Log In' : ''
                    }
                </button></li>
                <li className="tooltip">
                    <button 
                    onClick={ this.signUp.bind(this) }>
                     <span className="tooltiptext">Sign Up</span>
                    <FontAwesomeIcon 
                            icon='user-plus'
                            className="header-icon" />
                    {
                        this.props.fromSideDrawer ? '  Sign Up' : ''
                    }
                </button></li>
                <li className="tooltip">
                    <button 
                        onClick={ this.help.bind(this) }>
                    <span className="tooltiptext">Info Page</span>
                    <FontAwesomeIcon 
                            icon='info-circle'
                            className="header-icon" />   
                </button></li>
            </React.Fragment>
         )
    }
}

const mapDispatchToProps = ({
    fetchData,
    showModal,
    underlineOption,
    landing,
})

const mapStateToProps = state => ({
    activeOption: state.underline.activeOption,
    data: state.search.data,
})

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( LoggedOutBar ));