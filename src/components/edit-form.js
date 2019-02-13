import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, reset } from 'redux-form';

import { fetchOptions, deleteOptions } from '../actions/fetch-options';
import { fetchData } from '../actions/fetch-data'
import { hideForm } from '../actions/show-form';
import { hideModal, showModal } from '../actions/modal';
import { load } from '../actions/load';
import Input from './input';
import RadioInput from './radio-input';
import Select from './select';
import { getEditFields, isInput, isSelect, isCheck, whatType } from '../utils/form-content';
import { getId, addSpace, capitalize } from '../utils/utils';
import '../css/edit-delete-button.css';
import '../css/edit-form.css';
import '../css/form.css';

export class EditForm extends React.Component{

     componentWillUnmount() {
         // When an item has been updated
         // the user will be sent back to the 
         // list, so we need to fetch our updated data.
         if (this.props.wasUpdated ||
             this.props.hasErrored) {
            // Use last search query values
            let query = this.props.query;
            return this.props.fetchData(query)
            .then( () => 
                 this.props.hideForm()
            )
         }
     }

    getDepartmentId(values){
        // Set value for department as an id
        let options = this.props.options;
        return getId({
            data: options.department,
            value: values.department,
            key: 'name'
        });
    }

    // Compare initial and final form values and send
    // only the ones that changed.
    getUpdatedValues(values){
        let updated = {};
        Object.keys(values).forEach(key => {
            if( values[key] !== this.props.initialValues[key] ){
                if (key === 'department') {
                    // Set value for department as an id
                    updated.department = this.getDepartmentId(values);
                } else {
                updated[key] = values[key];
                }
            }
        })
        return updated;        
    }

    showResultMessage( dataType){

        // If item was updated, show confirmation message
        if (this.props.wasUpdated) {
            this.props.deleteOptions();
            this.props.showModal('CONFIRM_MODAL', {
                message: `${ capitalize(dataType) } was edited.`
            })

        // If an error occurred, let the user know
        } else if (this.props.hasErrored) {
            let modalProps = this.props.error.message;
            this.props.showModal('ERROR_MODAL', modalProps);
        }
    }

     onSubmit( values ){
        let dataType = this.props.dataType;
        // 'values' includes the ones that weren't updated
        // and we want to send only the updated ones.
        let updatedValues = this.getUpdatedValues(values);
        let itemId = values.id;
        updatedValues.id = itemId;
        if( dataType === 'employee' ){
            itemId = values.employeeId;
            updatedValues.employeeId = itemId;
        } 
        return this.props.fetchData({
             method: 'PUT', 
             dataType,
             itemId,
             values: updatedValues
        })
        .then( () => {
            // this.props.hideModal();
            // this.props.hideForm();
            this.showResultMessage(dataType);
        })
    }

    componentDidMount() {
        // Make sure the options are available in
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
                    label={addSpace(field)}
                    />
                : isSelect(field) ?
                    <Field component={ Select } 
                        type={ whatType(field) } 
                        name={field} 
                        key={ field } 
                        label={addSpace(field)}/>
                    : isCheck(field) ?
                        <Field 
                            className="radio-fields"
                            component={ RadioInput } 
                            name={field} key={ field }
                             label={field} 
                             options={ { false: "false", true: "true"}} />
                        : null;
    }

    displayFields(){
        // Get name of the fields to generate form
        let editFields = getEditFields(this.props.dataType);
        let fields = [];
        if( editFields ){
            editFields.forEach( field => {
                fields.push(this.generateFields(field))
            })
        }
      
        return fields;
    }

    render(){

        return(
            <div className="edit-form">
                <form
                    className="form"
                    onSubmit={ this.props.handleSubmit(values => 
                        this.onSubmit(values))}>
                    
                    { this.props.isLoading ? <p>...Loading</p>
                        : this.displayFields() }

                    <button 
                        className="main-button"
                        type="submit"
                        disabled={
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
    dataType: state.modal.modalProps.dataType,
    error: state.search.error,
    isLoading: state.options.loading === true,
    itemData: state.showForm.formProps.itemData,
    itemId: state.modal.modalProps.itemId,
    options: state.options.options,
    query: state.query.values,
    wasUpdated: state.search.data.updated,
    hasErrored: state.search.error !== null,
})

const mapDispatchToProps = ({
    deleteOptions,
    fetchData,
    fetchOptions,
    hideForm,
    hideModal,
    load,
    showModal,
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
