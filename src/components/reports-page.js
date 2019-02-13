import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetch-data';
import { showModal } from '../actions/modal';
import '../css/reports-page.css';
import banIcon from '../images/ban.png';
import warehouseIcon from '../images/warehouse.png';
import lowBatteryIcon from '../images/low-battery.png';
import heartIcon from '../images/heart.png';


export class ReportsPage extends React.Component{
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

    onClick(option){
        let selectedOption = option;
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
            'checked out': {icon: banIcon },
            'on shelf': { icon: warehouseIcon },
            'low stock': {icon: lowBatteryIcon },
            'useful life': {icon: heartIcon }
        };
// heartIcon by Webalys https://www.kameleon.pics/
    

        return Object.keys(options).map( (option, key) => 
            
            <li key={key}
                className="background-lightbrown"> 
                <button 
                    onClick={ () => this.onClick(option) } 
                    key={option}>
                    <img src={ options[option].icon }
                        className="report-icon"
                        alt="icon" />
                    {option}
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
    fetchData,
    showModal,
})

export default connect(mapStateToProps, mapDispatchToProps) ( ReportsPage );