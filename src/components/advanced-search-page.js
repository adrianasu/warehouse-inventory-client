import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvancedSearch from './advanced-search';
import { showModal } from '../actions/modal';
import '../css/advanced-search-page.css';

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
            <div className="advanced-search">
                <h1 className="tooltip">Advanced Search  
                    <span className="tooltiptext">Enter or select one or more values to narrow your item's search. </span>
                    <FontAwesomeIcon icon="lightbulb" className="space orange"/>
                </h1>
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




