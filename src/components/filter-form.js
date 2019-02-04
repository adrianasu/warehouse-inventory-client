import React from 'react';

class FilterForm extends React.Component{
   
    handleChange(e){
        console.log(e.target.value);
        if( e.target.value !== undefined ){
            this.props.onChange(e.target.value);
        }
    }

    render(){
        return(
            <div>
                <label htmlFor="filter">Filter </label>
                <input 
                    type="text" 
                    id="filter" 
                    onChange={this.handleChange.bind(this)}/>
            </div>
        )

    }
}

export default FilterForm;
