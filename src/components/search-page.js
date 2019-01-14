import React from 'react';
import { connect } from 'react-redux';

import SearchForm from './search-form';
import { showModal } from '../actions/modal';

class SearchPage extends React.Component {
   
    displayError() {
        let modalProps = this.props.hasErrored.message;
        let modalType = 'ERROR_MODAL';
        this.props.showModal(modalType, modalProps);
    }

    componentDidUpdate(prevProps) {
        if (this.props.hasErrored &&
            !prevProps.hasErrored) {
            this.displayError()
        }
    }

    render(){
        return(
            <div>
                <SearchForm /> 
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
