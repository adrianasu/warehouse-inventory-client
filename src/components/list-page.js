import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchData } from '../actions/fetch-data';
import FilterForm from './filter-form';
import ListTable from './list-table';

import '../css/list-page.css';

export class ListPage extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            currentlyDisplayed: this.props.data,
            searchTerm: '',
        }
    }
    
    componentDidMount(){
        // When an item has been deleted, updated
        // or created, the user will be sent back to the 
        // list, so we need to fetch our updated data.
        if( this.props.wasDeleted 
            || this.props.wasUpdated
            || this.props.hasErrored
            || this.props.wasCreated ){
            // Use last search query values
            let query = this.props.query;
            return this.props.fetchData(query)
            .then(() => this.setState({
                currentlyDisplayed: this.props.data,
                searchTerm: '',
            }))
            }
            else {
                this.setState({
                    currentlyDisplayed: this.props.data,
                    searchTerm: '',
                })
            }
    }

    searchInItem(item, term) {
        let reportType = this.props.match.params.type;      
        let keys = Object.keys(item);
        let testItem = item;
        // If the report displayed is low-stock,
        // look inside its 'product' embedded object.
        if( reportType === 'low-stock'){
            testItem = item.product;
            keys = Object.keys(testItem);
        }
        // Loop through the keys of an item
        for (let x = 0; x < keys.length; x += 1) {
            // Return the item , if the term was
            // found inside the item.
            if( term.test(testItem[keys[x]]) ){
                return item;
            // Check in the shortfall object,
            // if it's a low-stock report.
            }else if( reportType === 'low-stock'
                && term.test(item.shortfall) ){
                return item;
            }
        }
        // If the term was not found, return null
        return null;
    }

    filterData(results, term) {
        let filtered = [];
        // Loop through our data to look for the search
        // term inside each item object.
        for (let x = 0; x < results.length; x += 1) {
            let item = this.searchInItem(results[x], term)
            // If the term was found inside our
            // item add it to the filtered array.
            if (item !== null) {
                filtered.push(item)
            }
        }
        return filtered;
    }
    
   handleChange(searchTerm) {
       let results = this.props.data;
       let re = new RegExp(searchTerm, 'i')

       if (results &&
           results.length !== 0 &&
           searchTerm !== '') {
           results = this.filterData(results, re)
       }
       // Set the currently displayed data to show
       // only the filtered items.
       this.setState({
           currentlyDisplayed: results,
           searchTerm
       })
   }

   

    // Get either the number of items or the message 
    // sent by the server.
    message(){
        let filteredData = this.state.currentlyDisplayed;
        let data = this.props.data;
        if( data && data.message ){
            return data.message;
        } else if( filteredData && filteredData.length > 0){
            return `${filteredData.length } results found.`;
        } else if (filteredData && filteredData.length === 0) {
            return `No results found.`;
        }
        return "";
    }

    handleClick(){
        // send to create form
        let dataType = this.props.match.params.type;
        this.props.history.push(`/create/${dataType}`);
    }


    render(){
        let noCreateButton = ['checked-out', 'on-shelf', 'useful-life', 'low-stock', 'user'];
        let currData = this.state.currentlyDisplayed
        let reportType = this.props.match.params.type;
        return(
            <div className="list-page">
                <FilterForm value={this.state.searchTerm} onChange={this.handleChange.bind(this)}/>
                <h1>{ reportType.replace("-", " ") } </h1>
                { 
                    noCreateButton.includes(reportType) ? null
                    : <button 
                        onClick={ this.handleClick.bind(this) }
                        className="tooltip">
                        <span className="tooltiptext">Create new one.</span>
                        <FontAwesomeIcon 
                            icon={ ['far', 'file-plus'] }
                             />
                    </button>
                }
                <p> { this.message(reportType) } </p> 
                <ListTable 
                    currData={ currData } 
                    reportType={ reportType }/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.search.data,
        formProps: state.showForm.formProps,
        hasErrored: state.search.error !== null,
        query: state.query.values,
        wasCreated: state.search.data.created,
        wasDeleted: state.search.data.deleted,
        wasUpdated: state.search.data.updated,

    }
}

const mapDispatchToProps = ({
    fetchData
})

export default connect( mapStateToProps, mapDispatchToProps )( ListPage );