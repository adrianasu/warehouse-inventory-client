import React from 'react';
import { connect } from 'react-redux';

import { fetchData } from '../actions/fetch-data';
import { saveQueryValues } from '../actions/query-values';
import { showModal } from '../actions/modal';

class ManagePage extends React.Component{
    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
    }

 displayError() {
     let modalProps = this.props.error.message;
     let modalType = 'ERROR_MODAL';
     this.props.showModal(modalType, modalProps);
 }

 componentDidUpdate(prevProps) {
     if (this.props.hasErrored &&
         !prevProps.hasErrored) {
         this.displayError()
     }
 }

    onClick(e){
        let selectedOption = e.target.name;
        let query = {
            method: 'GET',
            searchType: 'searchAll',
            searchTerm: selectedOption,
        };
        return this.props.fetchData(query)
        .then( () => {
            if( this.props.data && this.props.data.length > 0 ){
                this.props.saveQueryValues(query);
                this.props.history.push(`/list/${selectedOption}`)
            }
        })
    }

    makeItSingular(noun){
        return noun.slice(-3) === 'ies' ? noun.substring(0, noun.length-3)+'y' : noun.substring(0, noun.length-1);
    }

    generateButtons(){
        const options = ['items','products', 'categories', 'manufacturers', 'departments', 'employees', 'users'];
    
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
    fetchData,
    saveQueryValues,
    showModal,
})

const mapStateToProps = state => ({
    data: state.search.data,
    hasErrored: state.search.error !== null,
    error: state.search.error,
})

export default connect(mapStateToProps, mapDispatchToProps) ( ManagePage );