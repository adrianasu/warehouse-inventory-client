import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchData } from '../actions/fetch-data';
import { showModal } from '../actions/modal';
import { welcome } from '../actions/welcome';

class LoggedOutBar extends React.Component{

    constructor() {
        super();
        this.goHome = this.goHome.bind(this);
        this.logIn = this.logIn.bind(this);
        this.showAll = this.showAll.bind(this);
        this.showAvailableItems = this.showAvailableItems.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    
    goHome(){
        this.props.history.push('/welcome');
        this.props.welcome(true);
    }
    
    logIn() {
        this.props.showModal('LOG_IN_MODAL');
    }
    
    showAll() {
        return this.props.fetchData('item', 'searchAll')
        .then(() => {
            if (this.props.data.length > 0) {
                this.props.history.push('/results/all-items')
            }
        })
    }
    
    showAvailableItems() {
        return this.props.fetchData('true', 'on-shelf')
        .then(() => {
            if( this.props.data.length > 0){
                this.props.history.push('/results/available-items')
            }
        })
    }
    
    signUp() {
        this.props.showModal('SIGN_UP_MODAL');
    }

    render() {
         return(
            <React.Fragment>
                <button onClick={ this.showAll }>All Items</button>
                <button onClick={ this.showAvailableItems }>Available Items</button>
                <button onClick={() => this.goHome()}>Home</button>
                <button onClick={() => this.logIn()}>Log In</button>
                <button onClick={() => this.signUp()}>Sign Up</button>
            </React.Fragment>
         )
    }
}

const mapDispatchToProps = ({
    fetchData: fetchData,
    showModal: showModal,
    welcome: welcome,
})

const mapStateToProps = state => ({
    data: state.search.data,
})

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( LoggedOutBar ));