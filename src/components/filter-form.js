import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, reset } from 'redux-form';
import Input from './input';

export class FilterForm extends React.Component{
   
    render(){
        return(
                <form onChange={
                    this.props.handleSubmit(value => this.props.onChange(value))
                } >
                    <Field 
                        component={ Input } 
                        type="text"
                        name="searchTerm"
                        label="Refine your search"
                    />
                </form>
        )
    }
}


export default reduxForm({
    form: 'filter'
})( FilterForm );