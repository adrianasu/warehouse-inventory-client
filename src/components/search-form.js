import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { fetchData } from '../actions/fetch-data';
import Input from './input';
import { required, nonEmpty, noSpecialChars } from '../utils/validators';
import { saveQueryValues } from '../actions/query-values';
import '../css/search-form.css';
import questionIcon from '../images/question.png';

export class SearchForm extends React.Component{

    onSubmit( value ){
        let query = {
            method: 'GET',
            searchTerm: value.searchTerm,
            searchType: 'searchTerm'
        }
        return this.props.fetchData( query )
        .then(()=>{
            if( this.props.data.length > 0){
                this.props.saveQueryValues(query);
                this.props.history.push(`/results/${value.searchTerm}`)
            }
        })
    }
    
    render(){

        const label = 'Enter a barcode, serial number or a keyword.';
        return(
            <div className='form search-form'>
                <form
                    className='search-item'
                    onSubmit={ this.props.handleSubmit( value => this.onSubmit( value ))}>
                    <label htmlFor="searchTerm" className="tooltip">{ label }
                        <span className="tooltiptext">Keyword: a word or few letters contained in the name of a product, model, warehouse, category or manufacturer.</span>
                        <img src={questionIcon} alt="question icon" className="icon"/>
                    </label>
                    <Field 
                        component={ Input } 
                        id="searchTerm"
                        name="searchTerm"
                        type="text"
                        validate={[required, nonEmpty, noSpecialChars]} 
                        />
                    <button 
                        disabled={this.props.pristine || this.props.submitting}
                        type ="submit" >
                        Search Items
                    </button>
                </form>          
            </div>

        );
    }
}

const mapDispatchToProps = ({
    fetchData,
    saveQueryValues
})

const mapStateToProps = state => ({
    data: state.search.data,
    options: state.options.options,
})

SearchForm = withRouter(connect(mapStateToProps, mapDispatchToProps) (SearchForm));

export default reduxForm({
    form: 'search',
    onSubmitFail: ( errors, dispatch ) =>
        dispatch( focus( 'search', Object.keys(errors)[0]))
})(SearchForm);