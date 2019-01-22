import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { fetchData } from '../actions/fetch-data';
import { saveQueryValues } from '../actions/query-values';
import Input from './input';
import { connect } from 'react-redux';
import { required, nonEmpty, noSpecialChars } from '../utils/validators';

class SearchForm extends React.Component{

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
        const label = 'What are you looking for?';
        return(
            <div>
                <form
                    className='search-item'
                    onSubmit={ this.props.handleSubmit( value => this.onSubmit( value ))}>
                    <label htmlFor="searchTerm">{ label }</label>
                    <Field 
                        component={ Input } 
                        id="searchTerm"
                        name="searchTerm"
                        type="text"
                        validate={[required, nonEmpty, noSpecialChars]} />
                    <button 
                        disabled={this.props.pristine || this.props.submitting}
                        type ="submit" >
                        Search
                    </button>
                </form>          
            </div>

        );
    }
}

const mapDispatchToProps = ({
    fetchData: fetchData,
    saveQueryValues: saveQueryValues
})

const mapStateToProps = state => ({
    data: state.search.data,
})

SearchForm = withRouter(connect(mapStateToProps, mapDispatchToProps) (SearchForm));

export default reduxForm({
    form: 'search',
    onSubmitFail: ( errors, dispatch ) =>
        dispatch( focus( 'search', Object.keys(errors)[0]))
})(SearchForm);