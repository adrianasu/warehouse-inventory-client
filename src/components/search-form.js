import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { fetchData } from '../actions/fetch-data';
import Input from './input';
import { connect } from 'react-redux';

class SearchItem extends React.Component{

    onSubmit( value ){
        let searchTerm = value.searchTerm;
        let searchType = "searchTerm";
        return this.props.fetchData( searchTerm, searchType )
            .then(this.props.history.push('/results'))
    }

    render(){
        const label = 'What are you looking for?';
        return(
            <div>
                <form
                    className='search-item'
                    onSubmit={ this.props.handleSubmit( value => this.onSubmit( value ))}>
                   
                    <Field component={ Input } label={label} type="text" name="searchTerm" id="searchTerm" />
                    <button type ="submit" >
                        Search
                    </button>
                </form>          
            </div>

        );
    }
}

const mapDispatchToProps = ({
    fetchData: fetchData
})

SearchItem = withRouter(connect(null, mapDispatchToProps) (SearchItem));

export default reduxForm({
    form: 'search',
    onSubmitFail: ( errors, dispatch ) =>
        dispatch( focus( 'search', Object.keys(errors)[0]))
})(SearchItem);