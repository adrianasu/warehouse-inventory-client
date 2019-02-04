import React from 'react';
import { connect } from 'react-redux';

import { showModal } from '../actions/modal';

class CheckInOrOutResults extends React.Component{

    constructor(props){
        super(props);
        this.displayError = this.displayError.bind(this);
    }

    displayError(){
        let modalProps = this.props.hasErrored.message;
        let modalType = 'ERROR_CHECK_MODAL';
        this.props.showModal( modalType, modalProps );
    }

    componentDidUpdate(prevProps){
        if (this.props.hasErrored &&
            !prevProps.hasErrored) {
            this.displayError()
        }
    }

    displayCheck(){
        let modalProps = { 
            data: this.props.data,
            checkType: this.props.checkType
        };
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
        return(
            <div>
                <p> { this.props.isLoading ? "Loading..." : ""} </p>
                <p> { this.message() } </p> 
                
                { this.props.data ? this.displayCheck() : null }

            </div>
        )
    }
}

const mapStateToProps = state => {
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