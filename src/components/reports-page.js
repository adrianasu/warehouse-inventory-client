import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetch-data';
import { showModal } from '../actions/modal';

class ReportsPage extends React.Component{
    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick(e){
        let selectedOption = e.target.name;
        let searchType = selectedOption.replace(" ", "-");
        return this.props.fetchData( null, searchType)
        .then( () => {
            if( this.props.data ){
                this.props.history.push(`/results/${searchType}`)
            }
        })
    }

    generateButtons(){
        const options = ['checked out','on shelf', 'low stock', 'useful life'];
        return options.map( (option, key) => 
            <li key={key}><button className='reports' name={option} onClick={this.onClick} key={option}>{option}</button></li> 
        )
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

    render(){
        let buttons = this.generateButtons();
        return(
            <div>
                <h1>Reports</h1>
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