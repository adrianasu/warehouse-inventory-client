import React from 'react';
import { connect } from 'react-redux';
import { fetchOptions } from '../actions/fetch-options';

export class Select extends React.Component{
    
    render(){
        let options = [];
        let searchableFields = this.props.searchableFields;
        let field = this.props.input.name;
      
        if( searchableFields !== null && 
            field === "warehouse" ) {
            options  = searchableFields[field].map(
                ( option, key ) => <option key={ key }>{ option }</option> 
            )   
        } else if( searchableFields !== null && 
            field === "minimumRequiredUnits" ) {
            options  = searchableFields['units'].map(
                ( option, key ) => <option key={ key }>{ option }</option> 
            )   
        }else if (searchableFields !== null && 
            (field === "accessLevel" || field === "condition")) {
            options  = Object.keys(searchableFields[field]).map(
                ( option, key ) => <option key={ key } >{ searchableFields[field][option] }</option> 
            )   
            // Optionss for category, manufacturer and product
        } else if( searchableFields !== null ){
            options = searchableFields[field].map(
                option =>
                   <option key={ option.id } data-id={ option.id }>{ option.name }</option> 
            )
        }   
        options.unshift(<option key={ "null" }>Select one</option>);

       
         return(
             <div className="form-select">
                <label>{ this.props.label }
                    <select
                        id={ this.props.input.name }
                        { ...this.props.input
                        } // this.props.input are passed by the redux form
                        >
                        { options }
                    </select>
                </label>
             </div>
         )
    }
}

const mapStateToProps = state => ({
    searchableFields: state.options.options
});

const mapDispatchToProps = ({
    fetchOptions: fetchOptions
})

export default connect( mapStateToProps, mapDispatchToProps )( Select );