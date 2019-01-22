import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, reset } from 'redux-form';

import { fetchOptions } from '../actions/fetch-options';
import { fetchData } from '../actions/fetch-data'
import { hideForm } from '../actions/show-form';
import Input from './input';
import RadioInput from './radio-input';
import Select from './select';
import { getEditFields, isInput, isSelect, isCheck, whatType } from '../utils/form-content';
import { puts } from 'util';

class EditForm extends React.Component{



     onSubmit( values ){
        //this.props.saveQueryValues( values );
        console.log(values);
        // return this.props.fetchData({
        //      method: 'PUT', 
        //      dataType: "dataType", ///////FALTA
        //      itemId: "ITEMID",////FALTA//
        //      values
        // })  
        // show success message  
    }

    componentDidMount() {
        // Make sure we have the options available in
        // the store for the Select component.
        if (this.props.options === null) {
            return this.props.fetchOptions()      
        }
    }


    generateFields( field ){
        return isInput(field) ?
                <Field component={ Input } 
                    type={ whatType(field)} 
                    name={field} 
                    key={ field } 
                    label={field}/>
                : isSelect(field) ?
                    <Field component={ Select } 
                        type={ whatType(field) } 
                        name={field} 
                        key={ field } 
                        label={field}/>
                    : isCheck(field) ?
                        <Field 
                            component={ RadioInput } 
                            name={field} key={ field }
                             label={field} 
                             options={ { false: "false", true: "true"}} />
                        : null;
    }

    displayFields(){
        // Return an object with two objects containing the
        // name of the form fields to update depending on 
        // the data categorized in primitive and object type.
        let editFields = getEditFields(this.props.dataType);
        let fields = [];
        if( editFields.primType ){
            editFields.primType.forEach( field => {
                fields.push(this.generateFields(field))
            })
        }
        if( editFields.objType ){
            Object.keys(editFields.objType).forEach(key => {
                fields.push(<label key= {key}>{ key }</label>);
                editFields.objType[key].forEach(field => {
                    fields.push(this.generateFields(field))
                })
            })
        }
        return fields;
    }

    render(){

        return(
            <div>
                <form
                    className='edit-item'
                    onSubmit={ this.props.handleSubmit(values => 
                        this.onSubmit(values))}>
                    
                    { this.props.isLoading ? <p>...Loading</p>
                        : this.displayFields() }

                    <button 
                        type ="submit" 
                        disabled = {
                            this.props.pristine || this.props.submitting
                        } >
                        Edit
                    </button>
                </form>          
            </div>

        );
    }
}

const mapStateToProps = state => ({
    data: state.search.data,
    dataType: state.modal.modalProps.dataType,
    isLoading: state.options.loading === true,
    options: state.options.options,
})

const mapDispatchToProps = ({
    fetchOptions: fetchOptions,
    hideForm: hideForm,
    fetchData: fetchData,
})

EditForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditForm);

export default reduxForm({
    form: 'edit',
    onSubmitSuccess: (result, dispatch) =>
        dispatch( reset('edit')),
    onSubmitFail: ( errors, dispatch ) =>
        dispatch( focus( 'edit', Object.keys(errors)[0]))
}) ( EditForm );
