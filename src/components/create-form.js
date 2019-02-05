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
import { getCreateFields, isInput, isSelect, isCheck, whatType } from '../utils/form-content';
import { getId, addSpace } from '../utils/utils';
import { required, checkType, isText, isNumber } from '../utils/validators';

export class CreateForm extends React.Component{


    showResultMessage( dataType ){
        // If item was created, show confirmation message
        if (this.props.wasCreated) {
            this.props.showModal('CONFIRM_MODAL', {
                message: `${ dataType } was created.`
            })
        // If an error occurred, let the user know
        } else if (this.props.hasErrored) {
            let modalProps = this.props.error.message;
            this.props.showModal('ERROR_MODAL', modalProps);
        }
        this.props.history.push(`/list/${dataType}`)
    }

    getIdsAndValues(dataType, val){
        let objId = ['product', 'manufacturer', 'category', 'department'];
        let values = {};
        Object.keys(val).forEach( key => {
            // Capitalize category, department, manufacturer and product names.
            key === 'name' ? val[key].charAt(0).toUppperCase() :
                values[key] = objId.includes(key) ? 
                    getId({
                        data: this.props.options[key],
                        value: val[key],
                        key: 'name'
                    })
                    : val[key];
        })
        return values;
    }

    getFetchValues(dataType, val){
        let requiresId = ['item', 'product', 'employee'];
        if( requiresId.includes( dataType ) ){
            return this.getIdsAndValues(dataType, val);
        } 
        return val;
    }

    onSubmit( formValues ){
        let dataType = this.props.dataType;

        let values = this.getFetchValues(dataType, formValues)
        console.log(values)
        let itemId = values.id;
        values.id = itemId;
        if( dataType === 'employee' ){
            itemId = values.employeeId;
            values.employeeId = itemId;
        } 
        return this.props.fetchData({
             method: 'POST', 
             dataType,
             itemId,
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
       
        return isInput(field) ?
                <Field component={ Input } 
                    type={ valType} 
                    name={field} 
                    key={ field } 
                    label={addSpace(field)}
                    validate={ [required] }
                    />
                : isSelect(field) ?
                    <Field component={ Select } 
                        type={ valType } 
                        name={field} 
                        key={ field } 
                        label={addSpace(field)}/>
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
            <div>
                <form
                    className='create-item'
                    onSubmit={ this.props.handleSubmit(values => 
                        this.onSubmit(values))}>
                    
                    { this.props.isLoading ? <p>...Loading</p>
                        : this.displayFields() }

                    <button 
                        type ="submit" 
                        disabled = {
                            this.props.pristine || this.props.submitting
                        } >
                        Create
                    </button>
                    <button onClick={ this.handleCancel.bind(this)}>Cancel</button>
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
