import React from 'react';
import { connect } from 'react-redux';
import AdvancedSearch from './advanced-search';
import { showModal } from '../actions/modal';
import '../css/advanced-search-page.css';
import question from '../images/question.png';

export class AdvancedSearchPage extends React.Component{

    displayError(){
        let modalProps = this.props.hasErrored.message;
        let modalType = 'ERROR_MODAL';
        this.props.showModal(modalType, modalProps);
    }

    componentDidUpdate(prevProps){
        if( this.props.hasErrored && 
            !prevProps.hasErrored ){
            this.displayError()
        }
    }
    
    render(){
        return(
            <div className="advanced-search">
                <h1 className="tooltip">Advanced Search  
                    <span className="tooltiptext">Enter or select one or more values to narrow your item's search. </span>
                    <img src={ question } alt="Question mark" className="icon"/>
                </h1>
                <AdvancedSearch />
            </div>
        )
    }
}

const mapStateToProps = state => ({
        hasErrored: state.search.error,
})

const mapDispatchToProps = ({
    showModal
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchPage);




