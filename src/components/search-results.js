import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { fetchData } from '../actions/fetch-data';
import FilterForm from './filter-form';
import ResultsTable from './results-table';

class SearchResults extends React.Component{

    constructor(props){
        super(props);
        //console.log("CONS",this.props.data)
        this.state ={
            searchTerm: '',
            currentlyDisplayed: []
        }
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount(){
        if( this.props.wasDeleted || this.props.wasUpdated ){
            let query = this.props.query;
            return this.props.fetchData( query )
            .then(() =>
                this.setState({
                    currentlyDisplayed: this.props.data
                })
            )
        } else {
            return this.setState({
                currentlyDisplayed: this.props.data
            })
        }
    }
  
    

    filterData() {
        let searchTerm = this.state.searchTerm;
        // let re = new RegExp(searchTerm)
        // console.log("TERM ", re)
        console.log("DATA ", this.props.data)
        let fields = ['product', 'category', 'manufacturer'];
        if (this.props.data &&
            this.props.data.length !== 0 &&
            searchTerm !== '') {
// return this.props.data
                let currentlyDisplayed = [];
                searchTerm.toLowerCase();
            this.props.data.forEach(item =>
                Object.keys(item).forEach(key => {
                    if (fields.includes(key) && 
                        item[key].name.toLowerCase().includes(searchTerm) ){
                            currentlyDisplayed.push(item);
                    } else if (key === 'location' &&
                        item[key].warehouse.toLowerCase().includes(searchTerm)) {
                            currentlyDisplayed.push(item);
                        }
                    }
                )
            )
            console.log("CURR")
            return this.setState({
                currentlyDisplayed
            });
        }
            
        // } else if(this.props.data &&
        //         this.props.data.length > 0 ) {
        //     console.log("ALL")
        //     return this.setState({
        //         currentlyDisplayed: this.props.data
        //     });

        // }
        
        //return this.state.currentlyDisplayed;

    }


    // Get either the number of items or the message 
    // sent by the server.
    message(){
        let result = this.props.data;
        if( result && result.message ){
            return this.props.data.message;
        } else if( result && result.length > 0){
            return `${this.props.data.length } items found.`;
        }
        return "";
    }

    onChange(value) {
        console.log(value);
        this.setState(value);
        this.filterData();
    }

    render(){
        let data = this.state.currentlyDisplayed
         console.log(data);
        return(
            <div>
                <h1>{ this.props.match.params.option.replace("-", " ") } </h1>
                <FilterForm onChange={this.onChange}/>
                <p> { this.message() } </p> 
                <ResultsTable currData={this.state.currentlyDisplayed}/>
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