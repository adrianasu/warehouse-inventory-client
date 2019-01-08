import React from 'react';
import { connect } from 'react-redux';

import { showModal } from '../actions/modal';

class CheckInOrOutResults extends React.Component{
    displayError(){
        let modalProps = this.props.hasErrored.message;
        let modalType = 'ERROR_MODAL';
        this.props.showModal( modalType, modalProps );
    }

    displayCheck(){
        let modalProps = this.props.data;
        let modalType = 'CHECK_MODAL';
        this.props.showModal( modalType, modalProps );
    }

    // Get either the number of items or the message 
    // sent by the server.
    message(){
        let result = this.props.data;
        if( result && result.message ){
            return this.props.data.message;
        } 
        return "";
    }

    render(){
 console.log(this.props.data)
        return(
            <div>
                <p> { this.props.isLoading ? "Loading..." : ""} </p>
                <p> { this.message() } </p> 
                
                { this.props.hasErrored ? this.displayError() : <span></span> }
                
                { this.props.data ? this.displayCheck() : <span></span>}

            </div>
        )
    }
}

const mapStateToProps = state => {
   console.log("DATA  ", state.check);
    return {
        data: state.check.data,
        hasErrored: state.check.error,
        isLoading: state.check.loading,
    }
}

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) =>
        dispatch(showModal(modalType, modalProps)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckInOrOutResults);