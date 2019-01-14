import React from 'react';
import { connect } from 'react-redux';

import AdvancedSearch from './advanced-search';
import { showModal } from '../actions/modal';

class AdvancedSearchPage extends React.Component{

    displayError(){
        let modalProps = this.props.hasErrored.message;
        let modalType = 'ERROR_MODAL';
        this.props.showModal(modalType, modalProps);
    }

    componentDidUpdate(prevProps){
        if( this.props.hasErrored && 
            !prevProps.hasErrored ){
            this.displayError()
        }
    }

    render(){
        return(
            <div>
                <p>Enter or select one or more values to narrow your search.</p>
                <AdvancedSearch />
                <p> { this.props.isLoading ? "Loading..." : ""} </p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        hasErrored: state.search.error,
        isLoading: state.search.loading,
    }
}

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) =>
        dispatch(showModal(modalType, modalProps)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchPage);




