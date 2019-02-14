import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchData, resetData } from '../actions/fetch-data';
import { showModal } from '../actions/modal';
import { fetchOptions } from '../actions/fetch-options';
import { underlineOption } from '../actions/underline-option';
import { landing } from '../actions/landing';
import signInIcon from '../images/sign-in.png';
import signUpIcon from '../images/sign-up.png';
import infoIcon from '../images/info.png';

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

    infoPage() {
        this.closeOrUnderline("Start");
        this.props.resetData();
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
        // Fetch option to display id examples
        return this.props.fetchOptions()
        .then(() =>
            this.props.showModal('SIGN_UP_MODAL')
        );
    }

    render() {
        let isTooltip = this.props.fromSideDrawer ? '' : 'tooltip';

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
                <li className={ isTooltip }>
                    <button 
                    onClick={ this.logIn.bind(this) }>
                     {
                         this.props.fromSideDrawer ? null
                         : <span className="tooltiptext">Log In</span>
                     }
                    <img src={ signInIcon } alt="sign in icon" className="header-icon"/>
                    
                    {
                        this.props.fromSideDrawer ? '  Log In' : ''
                    }
                </button></li>
                <li className={ isTooltip }>
                    <button 
                    onClick={ this.signUp.bind(this) }>
                    {
                        this.props.fromSideDrawer ? null
                     : <span className="tooltiptext">Sign Up</span>
                    }
                    <img src={ signUpIcon } alt="sign up icon" className="header-icon"/>
                    
                    {
                        this.props.fromSideDrawer ? '  Sign Up' : ''
                    }
                </button></li>
                <li className={ isTooltip }>
                    <button 
                        onClick={ this.infoPage.bind(this) }>
                    {
                        this.props.fromSideDrawer ? null
                        : <span className="tooltiptext">Info Page</span>
                    }
                    <img src={ infoIcon } alt="info icon" className="header-icon"/>
                </button></li>
            </React.Fragment>
         )
    }
}

const mapDispatchToProps = ({
    fetchData,
    fetchOptions,
    landing,
    resetData,
    showModal,
    underlineOption,
})

const mapStateToProps = state => ({
    activeOption: state.underline.activeOption,
    data: state.search.data,
})

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( LoggedOutBar ));