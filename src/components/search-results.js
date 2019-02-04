import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { fetchData } from '../actions/fetch-data';
import FilterForm from './filter-form';
import Results from './results';
import '../css/search-results.css';

class SearchResults extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentlyDisplayed: this.props.data,
        }
    }

    componentDidMount(){
        // If an item was deleted or updated,
        // fetch data to display new data.
        if( this.props.wasDeleted || this.props.wasUpdated ){
            let query = this.props.query;
            return this.props.fetchData( query )
        }
    }

    // Get either the number of items or the message 
    // sent by the server.
    message(){
        let filteredData = this.state.currentlyDisplayed;
        let data = this.props.data;
        if (data && data.message) {
            return data.message;
        } else if (filteredData && filteredData.length > 0) {
            return `${filteredData.length } results found.`;
        } else if (filteredData && filteredData.length === 0) {
            return `No results found.`;
        }
        return "";
    }

    searchInItem(item, term ){
        let keys = Object.keys(item);
        // Loop through the keys of an item
        for( let x=0; x<keys.length; x+=1 ){
            // If the term is found, return the item
            if( term.test(item[keys[x]]) ){
                return item;
            }
        }
        // If the term was not found in an item,
        // return null
        return null;
    }

    
   filterData( results, term ){
       let filtered = [];
       // Loop through our data to look for the search
       // term inside each item object.
       for( let x=0; x<results.length; x+=1 ){
          let item = this.searchInItem(results[x], term)
          // If the term was found inside our
          // item add it to the filtered array.
          if( item !== null ){
              filtered.push(item)
          }
       }
       return filtered;
}

   handleChange(searchTerm){
       let results = this.props.data;
       let re = new RegExp(searchTerm, 'i')

       if( results &&
           results.length !== 0 &&
           searchTerm !== '' ) {
           results = this.filterData(results, re)
        }
        // Set the currently displayed data to show
        // only the filtered items.
        this.setState ({
           currentlyDisplayed: results,
        
        })
   }

    render(){
        let currData = this.state.currentlyDisplayed;
        return(
            <div className="search-results">
                <FilterForm onChange={this.handleChange.bind(this)}/>
                <div className="background">
                    <h1>Results: { this.props.match.params.option.replace("-", " ") } </h1>
                    <p> { this.message() } </p> 
                    <Results currData={currData}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.search.data,
        query: state.query.values,
        wasDeleted: state.search.data.deleted,
        wasUpdated: state.search.data.updated,
    }
}

const mapDispatchToProps = ({
    fetchData: fetchData
})


export default withRouter(connect( mapStateToProps, mapDispatchToProps )( SearchResults ));