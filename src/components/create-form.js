import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, reset } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { fetchOptions } from '../actions/fetch-options';
import { fetchData } from '../actions/fetch-data'
import { hideForm } from '../actions/show-form';
import { hideModal, showModal } from '../actions/modal';
import { load } from '../actions/load';
import Input from './input';
import RadioInput from './radio-input';
import Select from './select';
import { getCreateFields, isInput, isSelect, isCheck, whatType, validateThis } from '../utils/form-content';
import { getId, addSpace, capitalize } from '../utils/utils';
import { requiredSelect } from '../utils/validators';

import '../css/create-form.css';

export class CreateForm extends React.Component{

    showResultMessage( dataType ){
        // If item was created, show confirmation message
        if (this.props.wasCreated) {
            this.props.showModal('CONFIRM_MODAL', {
                message: `${ dataType } was created.`
            })
        // If an error occurred, let user know
        } else if (this.props.hasErrored) {
            let modalProps = this.props.error.message;
            this.props.showModal('ERROR_MODAL', modalProps);
        }
        // Go back to list.
        this.props.history.push(`/list/${dataType}`);
    }

    getIdsAndValues(val){
        let fromSelect = ['product', 'manufacturer', 'category', 'department'];
        let values = {};
        // Check keys and find the ones coming from a Select
        // input and get their ids.
        Object.keys(val).forEach( key => {
            // Capitalize category, department, manufacturer and 
            // product coming from an Input.
            values[key] = key === 'name' ? 
                capitalize(val[key])
                : fromSelect.includes(key) && val[key] !== 'Select one' ?
                    getId({
                        data: this.props.options[key],
                        value: val[key],
                        key: 'name'
                    })
                    : val[key];
        });
        return values;
    }

    getFetchValues(dataType, val){
        let requiresId = ['item', 'product', 'employee'];
        if( requiresId.includes( dataType ) ){
            return this.getIdsAndValues(val);
        } 
        return val;
    }

    onSubmit( values ){
        let dataType = this.props.dataType;
        values = this.getFetchValues(dataType, values)
        
        return this.props.fetchData({
             method: 'POST', 
             dataType,
             values
        })
        .then( () => {
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
        let valType = whatType(field);
        let validateField = validateThis(field)
        return isInput(field) ?
                <Field component={ Input } 
                    type={ valType} 
                    name={field} 
                    key={ field } 
                    label={addSpace(field)}
                    validate={ validateField }
                    />
                : isSelect(field) ?
                    <Field component={ Select } 
                        type={ valType } 
                        name={field} 
                        key={ field } 
                        label={addSpace(field)}
                        validate={ [requiredSelect] }
                        />
                    : isCheck(field) ?
                        <Field 
                            component={ RadioInput } 
                            name={field} key={ field }
                            label={field} 
                            options={ { false: "false", true: "true"}} />
                        : null;
    }

    displayFields(){
        // dataType is sent by CreatePage as props
        let dataType = this.props.dataType;
        let createFields = getCreateFields(dataType);
        let fields = [];
        if( createFields ){
            createFields.forEach( field => {
                fields.push(this.generateFields(field))
            })
        }
        return fields;
    }

    handleCancel(e){
        e.preventDefault();
        let dataType = this.props.dataType;
        return this.props.history.push(`/list/${dataType}`);
    }

    render(){

        return(
            <div className="create-form">
                <form
                    className="form"
                    onSubmit={ this.props.handleSubmit(values => 
                        this.onSubmit(values))}>
                    
                    { this.props.isLoading ? <p>...Loading</p>
                        : this.displayFields() }
                  
                    <button 
                        className="create-button"
                        type ="submit" 
                        disabled = {
                            this.props.pristine || this.props.submitting
                        } >
                        Create
                    </button>
                    <button 
                        className="cancel-button"
                        onClick={ this.handleCancel.bind(this)}>
                        Cancel
                    </button>
                </form>          
            </div>

        );
    }
}

const mapStateToProps = state => ({
    error: state.search.error,
    isLoading: state.options.loading === true,
    options: state.options.options,
    wasCreated: state.search.data.created,
    hasErrored: state.search.error !== null,
})

const mapDispatchToProps = ({
    fetchData,
    fetchOptions,
    hideForm,
    hideModal,
    load,
    showModal,
})

CreateForm = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateForm));

export default reduxForm({
    form: 'create',
    onSubmitSuccess: (result, dispatch) =>
        dispatch( reset('create')),
    onSubmitFail: ( errors, dispatch ) =>
        dispatch( focus( 'create', Object.keys(errors)[0]))
}) ( CreateForm );
