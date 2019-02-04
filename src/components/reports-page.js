import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetch-data';
import { showModal } from '../actions/modal';
import '../css/reports-page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ReportsPage extends React.Component{
    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
    }

     displayError() {
         let modalProps = this.props.error.message;
         let modalType = 'ERROR_CHECK_MODAL';
         this.props.showModal(modalType, modalProps);
     }
     componentDidUpdate(prevProps) {
         // show modal when fetch returns an error
         if (this.props.hasErrored &&
             !prevProps.hasErrored) {
             this.displayError()
         }
     }

    onClick(e){
        let selectedOption = e.target.name;
        let searchType = selectedOption.replace(" ", "-");
        return this.props.fetchData({
            method: 'GET',
            searchType
        })
        .then( () => {
            if( this.props.data && this.props.data.length >0 ){
                this.props.history.push(`/list/${searchType}`)
            }
        })
    }

    generateButtons(){
        const options = {
            'checked out': {icon: 'ban', color: 'blue'},
            'on shelf': { icon:'inventory', color: 'blue'},
            'low stock': {icon: ['far', 'tachometer-slowest'], color: 'blue'}, // PRO icon
            'useful life': {icon: ['far', 'heartbeat'], color: 'blue'}
        };

    

        return Object.keys(options).map( (option, key) => 
            
            <li key={key}
                className={ `background-${options[option].color}` }>
                <FontAwesomeIcon 
                    icon={ options[option].icon }
                    className="report-icon" />
                <button 
                    name={option} 
                    onClick={this.onClick} 
                    key={option}>{option}
                </button>
            </li> 
        )
    }

    render(){
        let buttons = this.generateButtons();
        return(
            <div className="reports-page">
                <h1>Items' Reports</h1>
                <ul>
                    { buttons }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.search.data,
    hasErrored: state.search.error !== null,
    error: state.search.error    
})

const mapDispatchToProps = ({
    fetchData: fetchData,
    showModal: showModal,
})

export default connect(mapStateToProps, mapDispatchToProps) ( ReportsPage );