import React from 'react';
import '../css/filter-form.css';

export class FilterForm extends React.Component{
   
    handleChange(e){
        if( e.target.value !== undefined ){
            this.props.onChange(e.target.value);
        }
    }

    render(){
        return(
            <div className="filter-form form">
                <label htmlFor="filter">Enter keyword(s) to filter results.</label>
                <input 
                    value={ this.props.value }
                    type="text" 
                    id="filter"
                    onChange={this.handleChange.bind(this)}/>
            </div>
        )

    }
}

export default FilterForm;
