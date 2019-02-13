import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, focus, reset } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { fetchOptions } from '../actions/fetch-options';
import { fetchData } from '../actions/fetch-data'
import { hideForm } from '../actions/show-form';
import { hideModal, showModal } from '../actions/modal';
import { load } from '../actions/load';
import { getCreateFields } from '../utils/form-content';
import { getId, capitalize } from '../utils/utils';

import '../css/create-form.css';

export class CreateForm extends React.Component{

     componentWillUnmount() {
         // When an item has been created, the user 
         // will be sent back to the 
         // list, so we need to fetch our updated data.
         if (this.props.hasErrored ||
             this.props.wasCreated) {
             // Use last search query values
             let query = this.props.query;
             return this.props.fetchData(query)
            
         } 
     }

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

    formatValuesAndFetch(values, dataType){
        values = this.getFetchValues(dataType, values)
        
        return this.props.fetchData({
            method: 'POST',
            dataType,
            values
        })
        .then(() => {
            this.setState({
                numberOfFields: 0,
                nameOfFields: null
            })
            this.showResultMessage(dataType);
        })
    }
    
    missingValuesMessage(values, dataType){
        let missing = [];
        let fields = getCreateFields(dataType);
        let filledFields = Object.keys(values);
        fields.forEach( field => {
            if( !filledFields.includes(field) ){
                missing.push(field);
            }
        })
        this.props.showModal('CONFIRM_MODAL', {
            message: capitalize(`${ missing.join(", ") } ${missing.length > 1 ? 'are' : 'is'} missing.`)
        })
    }
    
    onSubmit( values ){
        console.log(values)
        let dataType = this.props.dataType;
        let numberOfFields = this.props.fields.length;
        let numberOfValues = Object.keys(values).length;
        // If all fields were filled, continue with fetch
        if( numberOfFields === numberOfValues){
            this.formatValuesAndFetch(values, dataType);
        // If some fields were not filled, send message
        } else {
            this.missingValuesMessage(values, dataType);
        }
    }

    componentDidMount() {
        // Make sure the options are available in
        // the store for the Select component.
        if (this.props.options === null) {
            return this.props.fetchOptions()
        }
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
                        : this.props.fields }
                  
                    <button 
                        className="create-button"
                        type ="submit" 
                        disabled = {
                            this.props.pristine || this.props.submitting || this.props.invalid
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
    query: state.query.values,
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
