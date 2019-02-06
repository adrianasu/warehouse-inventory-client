import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SearchForm from './search-form';
import { showModal } from '../actions/modal';
import { fetchOptions } from '../actions/fetch-options';
import { capitalize, firstWord } from '../utils/utils';
import '../css/search-page.css';

export class SearchPage extends React.Component {
   
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
    
    componentDidMount() {
        // Fetch options to display examples in demo.
        if (!this.props.options) {
            return this.props.fetchOptions()   
        }
    }

    getExample(field) {
        // Get examples from options data. Model
        // is inside the product object and
        // barcode inside the checkedIn object.
        let fieldArr = field === 'model' ? 
                this.props.options.product
                : field === 'barcode' ?
                    this.props.options.checkedIn
                    : this.props.options[field];
        // Pick a random element from array
        let ranElem = Math.floor(Math.random() * fieldArr.length);
        if( fieldArr.length === 0 ){
            return '';
        }
        if (field === 'model' || field === 'barcode') {
            return `${capitalize(field)}: ${fieldArr[ranElem][field]}`;
        } else {
            return `${capitalize(field)}: ${firstWord(fieldArr[ranElem].name)}`;
        }
    }

    examples(){
        let fields = ['manufacturer', 'product', 'category', 'model', 'barcode'];
        return <ul>e.g. { fields.map( field => <li key={field}>{this.getExample(field)}</li>) }</ul>
    }

    render(){
        return(
            <div className="search-page">
                {/* Show examples in demo. */}
                <h1 className="tooltip">Search Items
                    <span className="tooltiptext">{ this.props.options ? this.examples() : null }</span>
                    <FontAwesomeIcon icon="lightbulb" className="space orange"/>
                </h1>
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
        options: state.options.options,
    }
}

const mapDispatchToProps = ({
    fetchOptions,
    showModal,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
