import React from 'react';
import { connect } from 'react-redux';
import { fetchOptions } from '../actions/fetch-options';

export class Select extends React.Component{
    
    render(){
        let options = [];
        let searchableFields = this.props.searchableFields;
        let field = this.props.input.name;
      
        if( searchableFields !== null && 
            (field === "warehouse" || field === "units" )) {
            options  = searchableFields[field].map(
                ( option, key ) => <option key={ key }>{ option }</option> 
            )   
        } else if (searchableFields !== null && field === "accessLevel") {
            options  = Object.keys(searchableFields[field]).map(
                ( option, key ) => <option key={ key }>{ option }</option> 
            )   
        } else if( searchableFields !== null ){
            options = searchableFields[field].map(
                option =>
                   <option key={ option.id } value={ option.id }>{ option.name }</option> 
            )
        }   
        options.unshift(<option key={ "null" }>Select one</option>);

       
         return(
             <div className="form-select">
                <label>{ field }
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