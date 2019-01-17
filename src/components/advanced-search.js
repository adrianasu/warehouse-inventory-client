import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, focus, reset } from 'redux-form';
import { fetchData } from '../actions/fetch-data';
import { fetchOptions } from '../actions/fetch-options';
import { saveQueryValues } from '../actions/query-values';
import Input from './input';
import RadioInput from './radio-input';
import Select from './select';


class AdvancedSearch extends React.Component{
 
    onSubmit( values ){
        this.props.saveQueryValues( values );
        return this.props.fetchData(values, "advancedSearch")  
        .then(() => {
            // Display results, if were found.
            if( this.props.data && this.props.data.length > 0 ){
                this.props.history.push('/results/advancedSearch');
            }
        })    
    }

    componentDidMount() {
        if (this.props.options.length === 0) {
            return this.props.fetchOptions()      
        }
    }

    render(){

        return(
            <div>
                <form
                    className='search-item'
                    onSubmit={ this.props.handleSubmit(values => 
                        this.onSubmit(values))}>
                    
                    <Field component={ Input } type="text" name="product" label="Product"/>
                    <Field component={ Input } type="text" name="model" label="Model"/>
                        
                    { this.props.options.length === 0 ? null :     
                        <React.Fragment>
                            <Field component={ Select } type="text" name="category" label="Category"/>
                            <Field component={ Select } type="text" name="manufacturer" label="Manufacturer"/>
                            <Field component={ Select } type="text" name="warehouse" label="Warehouse"/>
                        </React.Fragment>
                    }
               
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


                    <button type ="submit" >
                        Search
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
    fetchOptions: fetchOptions,
    fetchData: fetchData,
    saveQueryValues: saveQueryValues,
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

 
