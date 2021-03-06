import React from 'react';
import { connect } from 'react-redux';

import { fetchData } from '../actions/fetch-data';
import { saveQueryValues } from '../actions/query-values';
import { showModal } from '../actions/modal';
import '../css/manage-page.css';
import gearIcon from '../images/department.png';
import boxIcon from '../images/box.png';
import employeeIcon from '../images/employee.png';
import Loader from './loader';
import manufacturerIcon from '../images/manufacturer.png';
import toolboxIcon from '../images/toolbox.png';
import usersIcon from '../images/users.png';
import wrenchIcon from '../images/wrench.png';

export class ManagePage extends React.Component{
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
 
    makeItSingular(noun){
        return noun.slice(-3) === 'ies' ? noun.substring(0, noun.length-3)+'y' : noun.substring(0, noun.length-1);
    }

    onClick(option){
        let selectedOption = this.makeItSingular(option);
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

    generateButtons(){
        const options = {
            'items': {icon: toolboxIcon },
            'products': { icon: wrenchIcon },
            'categories': {icon: boxIcon }, 
            'manufacturers': {icon:  manufacturerIcon },
            'departments': { icon: gearIcon },
            'employees': {icon: employeeIcon }, 
            'users': {icon: usersIcon }
        };
    
        return Object.keys(options).map( (option, key) => 
            <li key={key}
                className="background-lightbrown">
                <button 
                    onClick={ () => this.onClick(option) } 
                    key={ option }>
                    <img
                        src={ options[option].icon }
                        alt="icon"
                        className="manage-icon" />
                    { option }
                </button>
            </li> 
        )
    }

    render(){
        let buttons = this.generateButtons();
        return(
            <div className="manage-page">
                <h1>My Warehouse</h1>
                {
                    this.props.isLoading ? <Loader/> :
                    <ul>
                        { buttons }
                    </ul>
                }
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
    error: state.search.error,
    hasErrored: state.search.error !== null,
    isLoading: state.search.loading === true,
})

export default connect(mapStateToProps, mapDispatchToProps) ( ManagePage );