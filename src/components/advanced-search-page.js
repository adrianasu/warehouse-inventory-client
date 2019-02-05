import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvancedSearch from './advanced-search';
import { showModal } from '../actions/modal';
import '../css/advanced-search-page.css';

export class AdvancedSearchPage extends React.Component{

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
                    <FontAwesomeIcon icon="question-circle" className="space orange"/>
                </h1>
                <AdvancedSearch />
                <p className='loader'>{ this.props.isLoading ? "...Loading" : ""}</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
        hasErrored: state.search.error,
        isLoading: state.search.loading,
})

const mapDispatchToProps = ({
    showModal
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchPage);




