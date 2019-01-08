import React from 'react';
import { connect } from 'react-redux';

import { showModal } from '../actions/modal';
import ResultsTable from './results-table';


class SearchResults extends React.Component{
    displayError(){
        let modalProps = this.props.hasErrored.message;
        let modalType = 'ERROR_MODAL';
        this.props.showModal(modalType, modalProps);
    }

    // Get either the number of items or the message 
    // sent by the server.
    message(){
        let result = this.props.data;
        if( result && result.message ){
            return this.props.data.message;
        } else if( result && result.length > 0){
            return `${this.props.data.length } items found.`;
        }
        return "";
    }

    render(){
 
        return(
            <div>
                <p> { this.props.isLoading ? "Loading..." : ""} </p>
                <p> { this.message() } </p> 
                { this.props.hasErrored ? this.displayError() : <span></span> }
                
                <ResultsTable />

            </div>
        )
    }
}

const mapStateToProps = state => {
   //console.log("DATA search-results ", state.search);
    return {
        data: state.search.data,
        hasErrored: state.search.error,
        isLoading: state.search.loading,
        item: state.item,
        query: state.query.values
    }
}

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) =>
        dispatch(showModal(modalType, modalProps)),
});

export default connect( mapStateToProps, mapDispatchToProps )( SearchResults );