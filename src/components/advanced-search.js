import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, focus, reset } from 'redux-form';
import { fetchData } from '../actions/fetch-data';
import { fetchOptions } from '../actions/fetch-options';
import { saveQueryValues } from '../actions/query-values';
import { getId, capitalize } from '../utils/utils';
import Input from './input';
import RadioInput from './radio-input';
import Select from './select';
import '../css/advanced-search.css';


class AdvancedSearch extends React.Component{
    getIdsAndValues(val){
        let fromSelect = ['manufacturer', 'category'];
        let values = {};
        Object.keys(val).forEach( key => {
            // Capitalize category, department, manufacturer and 
            // product coming from an Input.
            values[key] = key === 'name' ? 
            capitalize(val[key])
            // Check keys and find the ones coming from a Select
            // input with a value and get their ids.
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

    onSubmit( values ){
        values = this.getIdsAndValues(values);

        let query = {
            method: 'GET',
            searchTerm: values,
            searchType: "advancedSearch"
        };
        return this.props.fetchData(query)  
        .then(() => {
            // Display results, if were found.
            if( this.props.data && this.props.data.length > 0 ){
                this.props.saveQueryValues( query );
                this.props.history.push('/results/advancedSearch');
            }
        })    
    }

    componentDidMount() {
        if (!this.props.options) {
            return this.props.fetchOptions()      
        }
    }

    render(){

        return(
            <div className="form advanced-search-form">
                <form
                    className='search-item'
                    onSubmit={ this.props.handleSubmit(values => 
                        this.onSubmit(values))}>
                    
                    <Field component={ Input } type="text" name="product" label="Product"/>
                    <Field component={ Input } type="text" name="model" label="Model"/>
                        
                    { !this.props.options ? null :     
                        <React.Fragment>
                            <Field component={ Select } type="text" name="category" label="Category"/>
                            <Field component={ Select } type="text" name="manufacturer" label="Manufacturer"/>
                            <Field component={ Select } type="text" name="warehouse" label="Warehouse"/>
                        </React.Fragment>
                    }
                <div className="radio-fields">
                    <Field component={ RadioInput } 
                        name="consummable" 
                        label="Consummable"
                        options={
                            { false: "false",
                            true: "true"}
                        }
                      />
                    <Field component={ RadioInput } 
                        name="onShelf" 
                        label="On Shelf"
                        options={
                            { false: "false",
                            true: "true"}
                        }
                      />
                </div>

                    <button type ="submit" >
                        Search Items
                    </button>
                </form>          
            </div>

        );
    }
}

const mapStateToProps = state => ({
    options: state.options.options,
    data: state.search.data,
})

const mapDispatchToProps = ({
    fetchOptions,
    fetchData,
    saveQueryValues,
})

AdvancedSearch = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AdvancedSearch));

export default reduxForm({
    form: 'advancedSearch',
    onSubmitSuccess: (result, dispatch) =>
        dispatch( reset('advancedSearch')),
    onSubmitFail: ( errors, dispatch ) =>
        dispatch( focus( 'advancedSearch', Object.keys(errors)[0]))
}) (AdvancedSearch);

 
