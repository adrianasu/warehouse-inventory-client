import React from 'react';
import { connect } from 'react-redux';

export class Select extends React.Component{
    
    render(){
        let options = [];
        let searchableFields = this.props.searchableFields;
        let field = this.props.input.name;
      
        if( searchableFields && field !== "warehouse" ){
            options = searchableFields[field].map(
                option =>
                   <option key={ option.id } value={ option.id }>{ option.name }</option> 
            )   
        } else if( searchableFields && field === "warehouse") {
            options  = searchableFields[field].map(
                ( option, key ) => <option key={ key }>{ option }</option> 
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
})

export default connect( mapStateToProps )( Select );