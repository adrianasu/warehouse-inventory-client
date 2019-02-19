import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import { addSpace } from '../utils/utils';
import { fetchData } from '../actions/fetch-data';
import FilterForm from './filter-form';
import infoIcon from '../images/info.png';
import Loader from './loader';
import Results from './results';
import '../css/search-results.css';

export class SearchResults extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentlyDisplayed: this.props.data,
            searchTerm: ''
        }
    }

    componentDidUpdate(prevProps){
        if( this.props.data !== prevProps.data){
            this.setState({
                currentlyDisplayed: this.props.data,
                searchTerm: ''
            })
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
            return <span className="space">{ data.message }</span>;
        } else if (this.props.isLoading ) {
            return <Loader/>;
        } else if (filteredData && filteredData.length > 0) {
            return <span className="space">{filteredData.length } results found.</span>;
        } else if (filteredData && filteredData.length === 0) {
            return <span className="space">No results found.</span>;
        }
        return null;
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
           searchTerm
        })
   }

    render(){
        let currData = this.state.currentlyDisplayed;
        let option = this.props.match.params.option;
        let title = !option ? null
                        : option.indexOf("-") === -1 ? 
                            addSpace(option) 
                            : option.replace("-", " ")
        return(
            <div className="search-results">
                    <FilterForm value={this.state.searchTerm} onChange={this.handleChange.bind(this)}/>
                        <div className="results-header">
                            <h1>{ title } Results</h1>
                            <div> 
                                <img src={ infoIcon } alt="Information icon" className="icon"/>                        
                                { this.message() }
                            </div>
                        </div>
                <Results currData={currData}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.search.data,
        isLoading: state.search.loading === true,
        query: state.query.values,
        wasDeleted: state.search.data.deleted,
        wasUpdated: state.search.data.updated,
    }
}

const mapDispatchToProps = ({
    fetchData,
})


export default withRouter(connect( mapStateToProps, mapDispatchToProps )( SearchResults ));