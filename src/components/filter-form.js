import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Input from './input';
import { setFilter } from '../actions/filter';

class FilterForm extends React.Component{
   
    // onChange(value){
    //     console.log(value);
    //     if( value.searchTerm !== undefined){
    //         this.props.setFilter(value.searchTerm);
    //     }
    // }


    render(){
        return(
                <form onChange={
                    this.props.handleSubmit(value => this.props.onChange(value))
                    // this.props.handleSubmit(value => this.onChange(value))
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

const mapDispatchToProps = ({
    setFilter: setFilter
})

FilterForm = connect(
    null, mapDispatchToProps
)(FilterForm);

export default reduxForm({
    form: 'filter'
})( FilterForm );