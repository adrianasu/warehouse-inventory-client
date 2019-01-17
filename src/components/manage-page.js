import React from 'react';
import {fetchData} from '../actions/fetch-data';
import { connect } from 'react-redux';

class ManagePage extends React.Component{
    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick(e){
        let selectedOption = e.target.name;
        return this.props.fetchData( selectedOption, "searchAll")
        .then( () => 
            this.props.history.push(`/list/${selectedOption}`)
        )
    }

    makeItSingular(noun){
        return noun.slice(-3) === 'ies' ? noun.substring(0, noun.length-3)+'y' : noun.substring(0, noun.length-1);
    }

    generateButtons(){
        const options = ['items','products', 'categories', 'manufacturers','employees', 'users'];
    
        return options.map( (option, key) => 
            <li key={key}>
                <button 
                    className='list' 
                    name={ this.makeItSingular(option) } 
                    onClick={ this.onClick } 
                    key={ option }>
                        { option }
                </button>
            </li> 
        )
    }

    render(){
        let buttons = this.generateButtons();
        return(
            <div>
                <h1>Manage your Warehouse</h1>
                <ul>
                    { buttons }
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = ({
    fetchData: fetchData
})

export default connect(null, mapDispatchToProps) ( ManagePage );